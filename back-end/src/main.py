from flask import Flask
import db_to_objects
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/all_clients")
def all_clients():
    clients = db_to_objects.get_all_clients()
    return jsonify(clients)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
