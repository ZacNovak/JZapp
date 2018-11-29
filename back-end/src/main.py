from flask import Flask, request, jsonify
import db_to_objects
from db_to_objects import Client, Invoices
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# print(db_to_objects.get_client_invoices(2))

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

