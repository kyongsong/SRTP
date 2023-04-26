import flask
import os
import json
import numpy as np
from fastdtw import fastdtw
from flask import Flask, request, render_template

import dtw

# global Variable for the event_id and index
event_id_value = 0
index_value = 0


# simulate the scatching plan of users


def add_routes(app):
    @app.route('/')
    @app.route('/<path:path>')
    # do the track matching algorithm
    @app.route("/Match", methods=['POST'])
    def matching() -> str:
        # """
        # :param scatch: the track of the path
        # :return: a list that contains the information in format
        #         {round, start frame number, end frame number, team_id, player_id}
        # """
        try:

            scatch_track = flask.request.json.get("MoveTrack")
            print(scatch_track)
            scatch1 = json.loads(scatch_track)
            scatch = []
            index = 0
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

            index_list = os.listdir('0021500001')  # info of one game
            data_rst = []
            threshold = 3
            dis_list = []  # final answer trace list
            # index: round of a game
            for index in index_list:
                # for each round
                candidate_start = []
                candidate_end = []
                # load metadata
                with open(os.path.join('0021500001', index, 'metadata.json'), 'r') as meta_f:
                    metadata = json.load(meta_f)
                # do the first round first, latter expand it to all rounds.
                with open(os.path.join('0021500001', index, 'movement_refined_shot_clock.json'), 'r') as f:
                    # mement: info of a round
                    mvment = json.load(f)
                    # new the movement has been loaded with a list
                    # a dictionary is a frame. cnt records the label of the frame.
                    cnt = metadata['possession_start_index']
                    # cur_dic: frame of round
                    for cur_dic in mvment:
                        # for each frame
                        positions = cur_dic["player_position"]
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
                        print("No match for round", index)
                        # raise Exception
                        continue
                    candidate = []
                    flag = 0
                    for starters in candidate_start:
                        for enders in candidate_end:
                            if starters[1][0] == enders[1][0] and starters[1][1] == enders[1][1]:  # 0->team_id; 1->player_id
                                candidate.append([starters, enders])
                                print("  player pos1: ", starters[1][2], starters[1][3])
                                print("  player pos2: ", enders[1][2], enders[1][3])
                                flag = flag + 1
                        #     if flag == 10:
                        #         break
                        # if flag == 10:
                        #     break

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
                        distance, route = fastdtw(list_cmp, scatch)
                        dis_list.append([distance, index, member])

            dis_list.sort(key=takeFirst)
            # now the idx_min labels the best matching.
            print(len(dis_list))
            i = 0
            while i < 5 and i < len(dis_list):
                dict_cur = dis_list[i][2]
                # dict_cur -> an element of candidate
                # dict_cur[0] -> starter, an element of candidate_start -> [cnt, player]
                # dict_cur[0][0] -> cnt
                data_rst.append([dis_list[i][1], dict_cur[0][0], dict_cur[1][0]])
                i = i + 1
            print(data_rst)
            return json.dumps({'status': 'success', 'data': data_rst})
        except Exception as _:
            print(_)
            return json.dumps({'status': 'failed'})

    def takeFirst(elem):
        return elem[0]

    # return data in the table
    @app.route("/data", methods=['POST'])
    def search():
        try:
            index_list = os.listdir('0021500001')
            data = []

            for index in index_list:
                with open(os.path.join('0021500001', index, 'metadata.json'), 'r') as f:
                    metadata = json.load(f)
                data.append(metadata)

            return json.dumps({'status': 'succeed', 'data': data})

        except Exception as _:
            print(_)
            return json.dumps({'status': 'failed'})

    # animation of trajectories
    @app.route("/Analysis-Match", methods=['POST'])
    def movement() -> str:
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
