from typing import Dict, Any, List

import flask
import os
import json
import numpy as np
from fastdtw import fastdtw
from flask import Flask, request, render_template, jsonify, Response
import dtw
import encoder

# global Variable for the event_id and index
event_id_value = 0
index_value = 0

# 比赛名称
game_name = '0021500001'


def dtw_policy():
    """
    dtw_policy: matching by dtw algorithm
    :return: matched results to frontend
    """

    # 1 处理从前端获取的轨迹信息，将其存储在scatch_track中
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

    # 2 从后端数据中进行匹配
    game = os.listdir(game_name)  # info of one game
    data_rst = []
    threshold = 3
    dis_list = []  # final answer trace list

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
                distance, route = fastdtw(list_cmp, scatch)
                dis_list.append([distance, index, member])

    dis_list.sort(key=lambda x: x[0])
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

    return data_rst
def encoder_policy():
    """
    encoder_policy: matching by encoder algorithm
    :return: matched results to frontend
    """

    # 1 处理从前端获取的轨迹信息，将其存储在scatch_track中
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

    # 2 从后端数据中进行匹配
    game = os.listdir(game_name)  # info of one game
    data_rst = []
    threshold = 3
    dis_list = []  # final answer trace list

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
                distance = encoder.cal_encoder_dist(list_cmp, scatch)
                dis_list.append([distance, index, member])

    dis_list.sort(key=lambda x: x[0])
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

    return data_rst


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
            print(flask.request.json)
            alg = flask.request.json.get("ChoosingAlgorithm")
            print(alg)
            if alg == "\"dtw\"":
                print("Choose dtw")
                data_rst = dtw_policy()
            elif alg == "\"encoder\"":
                print("Choose encoder")
                data_rst = encoder_policy()
            else:
                print("default")
                data_rst = dtw_policy()

            return json.dumps({'status': 'success', 'data': data_rst})
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
