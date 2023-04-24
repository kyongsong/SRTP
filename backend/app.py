from routes import add_routes


import flask
from flask_cors import CORS



app = flask.Flask(__name__,
            template_folder="../frontend/build",
            static_folder="../frontend/build/static")

add_routes(app)
CORS(app)



if __name__ == "__main__":
    app.run(threaded=True, host="127.0.0.1", port=8081, debug=True)
