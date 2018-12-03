from flask import Flask, request, jsonify
import db_to_objects
from db_to_objects import Client, Invoices, Items
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/all_clients")
def all_clients():
    clients = db_to_objects.get_all_clients()
    return jsonify(clients)

@app.route("/clients", methods=['GET', 'POST'])
def get_invoices():
    content = request.get_json()
    id = content.get('id')
    invoices = db_to_objects.get_client_invoices(id)
    return jsonify(invoices)

@app.route("/invoices", methods=['GET', 'POST'])
def get_items():
    content = request.get_json()
    id = content.get('id')
    items = db_to_objects.get_invoice_items(id)
    return jsonify(items)

@app.route("/newClient", methods=['GET', 'POST'])
def add_new_client():
    content = request.get_json()
    name = content.get('name')
    idnum = content.get('idnum')
    newClient = db_to_objects.Client((idnum,name))
    db_to_objects.add_client(newClient)
    newClientList = db_to_objects.get_all_clients()
    return jsonify(newClientList)

@app.route("/rmClient", methods=['GET', 'POST'])
def remove_client():
    content = request.get_json()
    id = content.get('id')
    db_to_objects.remove_client(id)
    newClientList = db_to_objects.get_all_clients()
    return jsonify(newClientList)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

