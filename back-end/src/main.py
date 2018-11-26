from flask import Flask
import db_to_objects
from flask import jsonify

app = Flask(__name__)

@app.route("/all_clients")
def all_clients():
    clients = db_to_objects.get_all_clients()
    return jsonify(clients)
    
