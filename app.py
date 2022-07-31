
import json
import os
 # import random

from flask import Flask, request,render_template

#global Variable for the event_id and index
event_id_value=0
index_value=0

app = Flask(__name__)
 # root directory
@app.route("/")
#通过python装饰器的方法定义路由地址
def root():
     return render_template("Analysis-Match.html")


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
def movement():
     try:
         # 这里发来的请求需要加个参数 event_id = xxx，选择播放第几个回合的轨迹
         global event_id_value
         global index_value
         
         event_id = request.form.get("event_id")
         index=request.form.get("start_index")

         event_id_value=int(event_id)
         index_value=int(index)


         possession_data_path = os.path.join('0021500001', str(event_id))

         with open(os.path.join(possession_data_path, "metadata.json"), "r") as f:
             metadata = json.load(f)

         with open(os.path.join(possession_data_path, "movement_refined_shot_clock.json"), "r") as f:
             movement_data = json.load(f)

         offensive_team = metadata[metadata['offensive_team']]['teamid']
         start_index = metadata['possession_start_index'] + int(index)
         end_index = metadata['possession_end_index']
         movement = []
         for item in movement_data[start_index: end_index + 1]:
             movement.append(item)

         return {'message': 'success!', 'movement': movement, 'metadata': metadata}

     except Exception as _:
         print(_)
         return json.dumps({'message': 'failed'})
          


@app.route("/Next_Frame", methods=['POST'])
def NextFrame():
     try:
         # 这里发来的请求需要加个参数 event_id = xxx，选择播放第几个回合的轨迹
         global event_id_value
         global index_value
        
         
         index_value+=1

         #需要判断下一帧是不是最后一帧，如果是最后一帧需要进行切换下一个回合
         

         possession_data_path = os.path.join('0021500001', str(event_id_value))

         with open(os.path.join(possession_data_path, "metadata.json"), "r") as f:
             metadata = json.load(f)

         with open(os.path.join(possession_data_path, "movement_refined_shot_clock.json"), "r") as f:
             movement_data = json.load(f)

         offensive_team = metadata[metadata['offensive_team']]['teamid']
         start_index = metadata['possession_start_index'] + index_value
         end_index = metadata['possession_end_index']
         movement = []
         for item in movement_data[start_index: end_index + 1]:
             movement.append(item)

         return {'message': 'success!', 'movement': movement, 'metadata': metadata}

     except Exception as _:
         print(_)
         return json.dumps({'message': 'failed'})

if __name__ == "__main__":
     app.run(threaded=True, host="127.0.0.1", port=8081, debug=True)
