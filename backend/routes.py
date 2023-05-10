import json
import os
from typing import Any

import flask
from fastdtw import fastdtw
from flask import jsonify, Response

import dtw
import encoder
import graphic_features

# global Variable for the event_id and index
event_id_value = 0
index_value = 0

# 比赛名称
game_name = '0021500001'

# method:
# we have the ball_status, and the status can show the fine-grained data frame
# the status of the ball contains many possible state
# The states relative to the passing of the ball are as follows: give pass -> passing -> get pass
# But we are not sure what will happen if the ball is stopped by the other team while flying
# So, we just search for "get pass", and then search backwards to find the "give pass"
# to ensure the passing is completed
def matrix_generate(current_round, Team):
    # this mapping is used to map the sequence number used in the system to the number of the player on the court
    # that is, the mapping is from playerid to seq_num, seq_num to jersey
    player_mapping = {}  # playerid to seq_num
    construct_mapping = {}  # seq_num to jersey

    immediate_return_flag = False
    # we need to adjust the current round to the proper round which matches the team argument
    with open(os.path.join(game_name, str(current_round), "metadata.json"), "r") as f_test:
        metadata = json.load(f_test)
        offensive_team = metadata["offensive_team"]
        while offensive_team != Team and current_round != 0:
            with open(os.path.join(game_name, str(current_round), "metadata.json"), "r") as f_inner_test:
                metadata = json.load(f_inner_test)
                offensive_team = metadata["offensive_team"]
                current_round = current_round - 1
        if offensive_team != Team and current_round == 0: # no data need to return
            immediate_return_flag = True

    # do the actual job of searching
    with open(os.path.join(game_name, str(current_round), "metadata.json"), "r") as f:
        metadata = json.load(f)
        home_team = metadata["home"]  # dict type
        visitor_team = metadata["visitor"]  # dict type
        i = 0
        while i < 13:
            if Team == 'home':
                player_mapping[home_team["players"][i]["playerid"]] = i + 1
                construct_mapping['player' + str(i + 1)] = home_team["players"][i]["jersey"]
            elif Team == 'visitor':
                player_mapping[visitor_team["players"][i]["playerid"]] = i + 1
                construct_mapping['player' + str(i + 1)] = visitor_team["players"][i]["jersey"]
            i = i + 1

    # initialization of the pass matrix
    rst = {'player1': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player2': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player3': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player4': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player5': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player6': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player7': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player8': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player9': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player10': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player11': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player12': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
           'player13': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}

    if immediate_return_flag:
        return rst

    # fill the diagonal element -> the number of the player.
    inner_idx = 0
    for key, value in rst.items():
        value[inner_idx] = int(construct_mapping[key])
        inner_idx = inner_idx + 1

    # do the passing statistics working
    # first in order to make the pass matrix's value bigger, we use the passing data from 10 rounds before to current round
    start_round = 0
    if current_round >= 30:
        start_round = current_round - 30
    walk_round = start_round
    # then walk all rounds and refresh the matrix
    while walk_round <= current_round:
        with open(os.path.join(game_name, str(walk_round), "metadata.json"), "r") as f:
            metadata = json.load(f)
            if metadata["offensive_team"] == Team:
                with open(os.path.join(game_name, str(walk_round), "movement_refined_shot_clock.json"), "r") as f:
                    movement_data = json.load(f)
                    src = []  # the player who give the pass
                    tgt = []  # the player who get the pass
                    for frame in movement_data:
                        if frame["ball_status"] == "get pass":
                            tgt.append(player_mapping[frame["event_player"]] - 1)
                            # do backwards searching for give pass
                            frame_idx = movement_data.index(frame)
                            index_backwards = frame_idx - 1
                            while index_backwards >= 0 and movement_data[index_backwards]["ball_status"] != "give pass":
                                index_backwards = index_backwards - 1
                            # print("index backwards: " + str(index_backwards))
                            src.append('player' + str(player_mapping[movement_data[index_backwards]["event_player"]]))
                    # refresh the matrix according to the data retreived
                    index_match = 0
                    for player in src:
                        rst[player][tgt[index_match]] = rst[player][tgt[index_match]] + 1
                        index_match = index_match + 1
        walk_round = walk_round + 1
    return rst

def trajectory_template(search_method, front_data, intended_rst_num, stride, single_search):
    # 1 处理从前端获取的轨迹信息，将其存储在scatch_track中
    scatch_track = front_data['MoveTrack']
    print(scatch_track)
    scatch1 = json.loads(scatch_track[0])
    scatch = []
    for i in scatch1:
        index = 0
        x = 0
        y = 0
        for j in i.values():
            if index == 0:
                x = j
                index = index + 1
            elif index == 1:
                y = j
                index = index + 1
                scatch.append([x, y])

    # 2 从后端数据中进行匹配
    game = os.listdir(game_name)  # info of one game
    data_rst = []
    threshold = 1

    while len(data_rst) < intended_rst_num:
        data_rst = []
        dis_list = []
        for index in game:  # index: an index represents a round in the game
            candidate_start = []
            candidate_end = []
            # load metadata
            with open(os.path.join(game_name, index, 'metadata.json'), 'r') as meta_f:
                metadata = json.load(meta_f)  # metadata of current round

            with open(os.path.join(game_name, index, 'movement_refined_shot_clock.json'), 'r') as f:
                mvment = json.load(f)  # mvment is filled with the refined data of current round

                cnt = metadata['possession_start_index']
                # frame: frame of round
                for frame in mvment:
                    positions = frame["player_position"]
                    for player in positions:
                        if dtw.dist(player[2], player[3], scatch[0][0], scatch[0][1]) < threshold:
                            candidate_start.append([cnt, player])
                        if dtw.dist(player[2], player[3], scatch[len(scatch) - 1][0],
                                    scatch[len(scatch) - 1][1]) < threshold:
                            candidate_end.append([cnt, player])
                    cnt = cnt + 1  # cnt = frame_id
                    if cnt > metadata['possession_end_index']:
                        break

                # now the candidate_start and candidate_end are filled with all the frames in this round
                if len(candidate_start) == 0 or len(candidate_end) == 0:
                    # print("No match for round", index)
                    # raise Exception
                    continue

                candidate = []
                flag = False
                for starters in candidate_start:
                    for enders in candidate_end:
                        if starters[1][0] == enders[1][0] and starters[1][1] == enders[1][1]:  # 0->team_id; 1->player_id
                            candidate.append([starters, enders])
                            # print("  player pos1: ", starters[1][2], starters[1][3])
                            # print("  player pos2: ", enders[1][2], enders[1][3])
                            flag = True
                        if flag:
                            break
                    if flag:
                        break

                # now candidate is filled with candidates' start point and end point.
                for idx_candidate in range(len(candidate)):
                    member = candidate[idx_candidate]
                    list_trace = []
                    i = member[0][0]
                    while i <= member[1][0]:
                        list_trace.append(mvment[i])
                        i = i + 1
                    # now list_trace is filled with the frame track of the points.
                    if len(list_trace) <= 1:
                        continue
                    list_cmp = []
                    for dict_form_cmp in list_trace:
                        list_pos = dict_form_cmp["player_position"]
                        for list_player in list_pos:
                            if list_player[0] == member[0][1][0] and list_player[1] == member[0][1][1]:
                                list_cmp.append([member[0][1][2], member[0][1][3]])

                    # here is actual method selection.
                    if search_method == 0: # dtw
                        distance, route = fastdtw(list_cmp, scatch)
                        # here route is actually not used.
                    elif search_method == 1: # encoder
                        distance = encoder.cal_encoder_dist(list_cmp, scatch)
                    elif search_method == 2: # graphic_features based
                        distance = 1 - graphic_features.trajectory_similarity(list_cmp, scatch)
                    else:
                        print(search_method + ": This method is not implemented yet!")
                        distance, route = fastdtw(list_cmp, scatch)
                    dis_list.append([distance, index, member])

        dis_list.sort(key=lambda x: x[0])
        # now the idx_min labels the best matching.
        print('dis_list legnth is: ' + str(len(dis_list)))
        print('threshold is: ' + str(threshold))
        i = 0
        if single_search:
            while i < 5 and i < len(dis_list):
                dict_cur = dis_list[i][2]
                # dict_cur -> an element of candidate
                # dict_cur[0] -> starter, an element of candidate_start -> [cnt, player]
                # dict_cur[0][0] -> cnt
                data_rst.append([dis_list[i][1], dict_cur[0][0], dict_cur[1][0]])
                i = i + 1
        else :
            while i < len(dis_list):
                dict_cur = dis_list[i][2]
                # dict_cur -> an element of candidate
                # dict_cur[0] -> starter, an element of candidate_start -> [cnt, player]
                # dict_cur[0][0] -> cnt
                data_rst.append([dis_list[i][1], dict_cur[0][0], dict_cur[1][0]])
                i = i + 1
        threshold = threshold + stride

    print(data_rst)
    print(threshold)

    return data_rst

def multiple_matching(multiple_track):
    size_tracks = len(multiple_track)
    i = 0
    mapping = {}
    while i < size_tracks:
        alg = multiple_track[i][0]['ChoosingAlgorithm']
        if alg == "\"dtw\"":
            print("Choose dtw")
            data_rst = trajectory_template(0, multiple_track[i][0], 15, 2, False)
        elif alg == "\"encoder\"":
            print("Choose encoder")
            data_rst = trajectory_template(1, multiple_track[i][0], 15, 2, False)
        elif alg == "\"graphic_features\"":
            print("Choose graphic_features")
            data_rst = trajectory_template(2, multiple_track[i][0], 15, 2, False)
        else:
            print("default as dtw")
            data_rst = trajectory_template(0, multiple_track[i][0], 15, 2, False)
        # now we need to regroup the list by data_rst[i][0] -> the round number
        # the structure of the grouping is as follows:
        #   mapping:
        #   {
        #       '186' (round number): [[i(track label), start_frame_num, end_frame_num], [...(the same as before)]]
        #       '49'  (round number): [[...], [...]](the same as before)
        #   }
        for j in data_rst:
            if j[0] in mapping.keys():
                mapping.get(j[0]).append([i, j[1], j[2]])
            else :
                mapping[j[0]] = [[i, j[1], j[2]]]
        i = i + 1
    print(mapping)
    data_rst = []
    for key, value in mapping.items():
        if len(value) >= 3:
            print(str(key) + ": " + str(value))
            range = {'start': 0, 'end': 0}
            for k in value:
                if k[0] == 0: # first time enter the block, fill the initial start and end
                    range['start'] = k[1]
                    range['end'] = k[2]
                else :
                    if (k[1] < range['start']):
                        range['start'] = k[1]
                    if (k[2] > range['end']):
                        range['end'] = k[2]
            print("range: " + str(range))
            if range['start'] < range['end']:
                data_rst.append([key, range['start'], range['end']])
    print(data_rst)
    return data_rst

def visual_info(data_rst):
    res = {}
    events = []
    player_Name = []
    AgainstTeam = []
    player_mapping = {}
    with open(os.path.join(game_name, '0', 'metadata.json'), 'r') as meta_check:
        metadata_check = json.load(meta_check)  # metadata of current round
        for home_players in metadata_check["home"]["players"]:
            player_mapping[home_players["playerid"]] = home_players["firstname"] + ' ' + home_players["lastname"]
        for visit_players in metadata_check["visitor"]["players"]:
            player_mapping[visit_players["playerid"]] = visit_players["firstname"] + ' ' + visit_players["lastname"]
    # here the players involved are too many, we only get the first event player as the player showed on the card.
    for result in data_rst:
        with open(os.path.join(game_name, str(result[0]), 'metadata.json'), 'r') as meta_f:
            metadata = json.load(meta_f)  # metadata of current round
            event_player_num = metadata["terminal_player"]
            # here we notice that, when the ball is at the status of "passing", the event_player_num will be none.
            # Thus, in order to avoid this case, we have to process the none case
            print(type(event_player_num))
            print(event_player_num)
            print(player_mapping[int(event_player_num)])

            offense_team = metadata["offensive_team"]
            visitor_name = metadata["visitor"]["name"]
            home_name = metadata["home"]["name"]
            events_cur_round = metadata["event_result"]
            events_splitted_list = events_cur_round.split("&")
            events_final = events_splitted_list[0]
            if events_splitted_list[0] == "2pt shot" or events_splitted_list[0] == "3pt shot":
                if events_splitted_list[1] == "made":
                    events_final = events_final + " Y"
                elif events_splitted_list[1] == "miss":
                    events_final = events_final + " N"
            print(home_name)
            print(visitor_name)
            print(offense_team)
            if offense_team == "visitor":
                print("visitor checked")
                AgainstTeam.append(home_name)
                print(AgainstTeam)
                events.append(events_final)
                print(events)
                player_Name.append(player_mapping[int(event_player_num)])
                print(player_Name)
            else :
                print("home checked")
                AgainstTeam.append(visitor_name)
                print(AgainstTeam)
                events.append(events_splitted_list[0])
                print(events)
                player_Name.append(player_mapping[int(event_player_num)])
                print(player_Name)
    res['events'] = events
    res['player_Name'] = player_Name
    res['AgainstTeam'] = AgainstTeam
    print(res)
    return res


def alignment(multiple_track):
    # still hesitating whether implementation of this alignment can be done before deadline
    # for now, do nothing
    # try to just match enough trajectories to overlap
    return multiple_track

def add_routes(app):
    @app.route('/')
    @app.route('/<path:path>')
    # return team and score information
    @app.route("/Team_Score", methods=["POST"])
    def get_team_score() -> Response | str:
        try:
            global index_value
            print("score", index_value)
            with open(os.path.join(game_name, str(index_value), 'metadata.json'), 'r') as meta_f:
                metadata = json.load(meta_f)  # metadata of current round
                team_names_scores = {'home': metadata['home']['name'], 'visitor': metadata['visitor']['name'],
                                     'hscore': metadata['home_score'], 'vscore': metadata['visitor_score']}
                return jsonify(team_names_scores)
        except Exception as _:
            print(_)
            return json.dumps({'status': 'failed'})

    # do the track matching algorithm
    @app.route("/Match", methods=['POST'])
    def matching() -> str:
        # """
        # :param scatch: the track of the path
        # :return: a list that contains the information in format
        #         {round, start frame number, end frame number, team_id, player_id}
        # """
        try:
            track_multi = flask.request.get_json()
            print(track_multi)
            size_track = len(track_multi)
            print("size of the track is: " + str(size_track))

            # and now first, we must do the alignment of data, that is,
            # find frames that has players layout just like the trajectories showed (at the beginning and end point).

            # legacy code -> single trajectory
            data_rst = []
            if size_track == 1:
                json_data = track_multi[0][0]
                alg = json_data['ChoosingAlgorithm']
                print(alg)
                if alg == "\"dtw\"":
                    print("Choose dtw")
                    data_rst = trajectory_template(0, json_data, 2, 0.5, True)
                elif alg == "\"encoder\"":
                    print("Choose encoder")
                    data_rst = trajectory_template(1, json_data, 2, 0.5, True)
                elif alg == "\"graphic_features\"":
                    print("Choose graphic_features")
                    data_rst = trajectory_template(2, json_data, 2, 0.5, True)
                else:
                    print("default as dtw")
                    data_rst = trajectory_template(0, json_data, 2, 0.5, True)
                info = visual_info(data_rst)
                print(json.dumps({'status': 'success', 'data': data_rst, 'events': info['events'], 'player_Name': info['player_Name'], 'AgainstTeam': info['AgainstTeam']}))
                return json.dumps({'status': 'success', 'data': data_rst, 'events': info['events'], 'player_Name': info['player_Name'], 'AgainstTeam': info['AgainstTeam']})
            elif size_track == 0:
                print("watching the result of matching")
                return json.dumps({'status': 'success'})
            else :
                # now do the multiple trajectories matching
                multiple_rst = multiple_matching(track_multi)
                info = visual_info(multiple_rst)
                print(multiple_rst)
                return json.dumps({'status': 'success', 'data': multiple_rst, 'events': info['events'], 'player_Name': info['player_Name'], 'AgainstTeam': info['AgainstTeam']})

        except Exception as _:
            print(_)
            return json.dumps({'status': 'failed'})

    # return data in the table
    @app.route("/data", methods=['POST'])
    def search():
        try:
            game = os.listdir('0021500001')
            data = []

            for index in game:
                with open(os.path.join('0021500001', index, 'metadata.json'), 'r') as f:
                    metadata = json.load(f)
                data.append(metadata)

            return json.dumps({'status': 'succeed', 'data': data})

        except Exception as _:
            print(_)
            return json.dumps({'status': 'failed'})

    # animation of trajectories
    @app.route("/Analysis-Match", methods=['POST'])
    def movement() -> dict[str, str | int | list[Any] | Any] | str:
        try:
            # 这里发来的请求需要加个参数 event_id = xxx，选择播放第几个回合的轨迹
            global event_id_value
            global index_value
            global end_index_value

            event_id = flask.request.json.get("event_id")
            index = flask.request.json.get("start_index")
            Endindex = flask.request.json.get("end_index")
            # print(event_id)
            # print(index)
            # print(Endindex)

            event_id_value = int(event_id)
            index_value = int(index)
            end_index_value = int(Endindex)

            possession_data_path = os.path.join('0021500001', str(event_id))

            with open(os.path.join(possession_data_path, "metadata.json"), "r") as f:
                metadata = json.load(f)

            with open(os.path.join(possession_data_path, "movement_refined_shot_clock.json"), "r") as f:
                movement_data = json.load(f)

            # offensive_team = metadata[metadata['offensive_team']]['teamid']
            start_index = metadata['possession_start_index'] + int(index_value)
            # end_index = metadata['possession_end_index']
            mvment = []
            for item in movement_data[start_index: end_index_value + 1]:
                mvment.append(item)

            return {'message': 'success!', 'movement': mvment, 'metadata': metadata, 'size': len(mvment)}

        except Exception as _:
            print(_)
            return json.dumps({'message': 'failed'})

    @app.route("/ShotsHeatMap", methods=['POST'])
    def shot_heat_map() -> str:
        try:
            round_ = flask.request.get_json()
            current_round = int(round_["current_round"])
            print(current_round)
            if current_round >= 19:
                start_round = current_round - 19
            else:
                start_round = 0

            shot_pos = []
            index = start_round
            while index <= current_round:
                is_shoot_round = False
                with open(os.path.join('0021500001', str(index), 'metadata.json'), 'r') as f_meta:
                    metadata = json.load(f_meta)
                    event_result = str(metadata["event_result"])
                    if event_result.find("shot"):
                        is_shoot_round = True
                if is_shoot_round:
                    with open(os.path.join(game_name, str(index), 'movement_refined_shot_clock.json'), 'r') as f_data:
                        mvment = json.load(f_data)  # mvment is filled with the refined data of current round
                        cnt = metadata['possession_start_index']
                        # frame: frame of round
                        for frame in mvment:
                            if str(frame["ball_status"]) == "shot":
                                shot_pos.append([frame["ball_position"][0], frame["ball_position"][1]])
                                break
                            cnt = cnt + 1  # cnt = frame_id
                            if cnt > metadata['possession_end_index']:
                                break
                index = index + 1
            print(shot_pos)
            return json.dumps({"shot_postion": shot_pos})


        except Exception as _:
            print(_)
            return json.dumps({'message': 'failed'})
        
    @app.route("/ShotsMap", methods=['POST'])
    def shot_map() -> str:
        try:
            round_ = flask.request.get_json()
            current_round = int(round_["current_round"])
            if current_round >= 19:
                start_round = current_round - 19
            else:
                start_round = 0

            shot_2pt_made_pos = []
            shot_2pt_miss_pos = []
            shot_3pt_made_pos = []
            shot_3pt_miss_pos = []
            index = start_round
            while index <= current_round:
                is_shoot_round = False
                with open(os.path.join('0021500001', str(index), 'metadata.json'), 'r') as f_meta:
                    metadata = json.load(f_meta)
                    event_result = str(metadata["event_result"])
                    print(event_result)
                    if event_result.find("shot") != -1:
                        is_shoot_round = True
                        if event_result.find("2pt") != -1 and event_result.find("made") != -1:
                            shot_type = "2pt&made"
                        elif event_result.find("2pt") != -1 and event_result.find("miss") != -1:
                            shot_type = "2pt&miss"
                        elif event_result.find("3pt") != -1 and event_result.find("made") != -1:
                            shot_type = "3pt&made"
                        else:
                            shot_type = "3pt&miss"
                if is_shoot_round:
                    with open(os.path.join(game_name, str(index), 'movement_refined_shot_clock.json'), 'r') as f_data:
                        mvment = json.load(f_data)  # mvment is filled with the refined data of current round
                        cnt = metadata['possession_start_index']
                        # frame: frame of round
                        for frame in mvment:
                            if str(frame["ball_status"]) == "shot":
                                if shot_type == "2pt&made":
                                    shot_2pt_made_pos.append([frame["ball_position"][0], frame["ball_position"][1]])
                                elif shot_type == "2pt&miss":
                                    shot_2pt_miss_pos.append([frame["ball_position"][0], frame["ball_position"][1]])
                                elif shot_type == "3pt&made":
                                    shot_3pt_made_pos.append([frame["ball_position"][0], frame["ball_position"][1]])
                                else:
                                    shot_3pt_miss_pos.append([frame["ball_position"][0], frame["ball_position"][1]])
                                break
                            cnt = cnt + 1  # cnt = frame_id
                            if cnt > metadata['possession_end_index']:
                                break
                index = index + 1
            print({"2pt&made": shot_2pt_made_pos, "2pt&miss": shot_2pt_miss_pos, "3pt&made": shot_3pt_made_pos, "3pt&miss": shot_3pt_miss_pos})
            return json.dumps({"TwoMade": shot_2pt_made_pos, "TwoMiss": shot_2pt_miss_pos, "ThreeMade": shot_3pt_made_pos, "ThreeMiss": shot_3pt_miss_pos})


        except Exception as _:
            print(_)
            return json.dumps({'message': 'failed'})

    @app.route("/Isolate", methods=['POST'])
    def iso() -> str:
        try:
            
            round_ = flask.request.get_json()
            
            current_round = round_["current_round"]
            
            
            if current_round >= 19:
                start_round = current_round - 19
            else:
                start_round = 0

            iso_results = []
            index = current_round
          
            while index >= start_round:
                result = "miss"
                with open(os.path.join('0021500001', str(index), 'metadata.json'), 'r') as f_meta:
                    metadata = json.load(f_meta)
                    event_result = str(metadata["event_result"])
                    if event_result.find("foul") or (event_result.find("shot") and event_result.find("made")):
                        result = "made"

                is_iso_round = False
                max_start = 0
                max_end = max_start
                iso_player = ""
                with open(os.path.join(game_name, str(index), 'movement_refined_shot_clock.json'), 'r') as f_data:
                    mvment = json.load(f_data)  # mvment is filled with the refined data of current round
                    cnt = metadata['possession_start_index']
                    cur_start = 0
                    cur_end = cur_start
                    # frame: frame of round
                    for frame in mvment:
                        if frame["ball_status"] == "holding":
                            cur_end = cur_end + 1
                            if cur_end - cur_start > max_end - max_start:
                                max_strat = cur_start
                                max_end = cur_end
                                iso_player = frame["event_player"]
                        else: # 持球状态结束
                            cur_end = cur_end + 1
                            cur_start = cur_end
                        cnt = cnt + 1  # cnt = frame_id
                        if cnt > metadata['possession_end_index']:
                            break

                    # 如果持球时间超过本回合时间的1/3，我们认为单打发生了
                    if max_end - max_strat >= (metadata['possession_end_index'] - metadata['possession_start_index'])/3:
                        is_iso_round = True
                iso_trace = []
                if is_iso_round:
                    with open(os.path.join(game_name, str(index), 'movement_refined_shot_clock.json'), 'r') as f_data:
                        mvment = json.load(f_data)  # mvment is filled with the refined data of current round
                        cnt = metadata['possession_start_index']
                        for frame in mvment:
                            if cnt >= max_strat and cnt <= max_end:
                                iso_trace.append([frame["ball_position"][0], frame["ball_position"][1]])
                                cnt = cnt + 1  # cnt = frame_id
                                index=index+1
                            if cnt > metadata['possession_end_index']:
                                break
                    iso_results.append({"iso_player":iso_player, "iso_trace":iso_trace, "iso_result": result})
            index = index - 1
            print(iso_results)
            return json.dumps(iso_results)


        except Exception as _:
            print(_)
            return json.dumps({'message': 'failed'})

    @app.route("/PassMatrix", methods=['POST'])
    def pass_matrix() -> str:
        try:
            front_data = flask.request.get_json()
            print(front_data)
            current_round = front_data["current_round"]
            Team = front_data["Team"]
            rst = matrix_generate(current_round, Team)
            return json.dumps(rst)
        except Exception as _:
            print(_)
            return json.dumps({'message': 'failed'})