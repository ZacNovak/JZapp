import psycopg2

class Client:
    def __init__(self,clientTuple):
        self.idnum, self.name = clientTuple

def get_all_clients():
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute("SELECT * FROM client;")

    clientInfoArray = cur.fetchall()
    
    clientObjArray = []
    for client in clientInfoArray:
        newClient = Client(client)
        clientObjArray.append(newClient.__dict__)

    cur.close()
    conn.close()
    
    return clientObjArray

def get_client(id):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"SELECT * FROM client where id = {id};")

    client = cur.fetchall()
    if client == []:
        cur.close()
        conn.close()
        return 'Client does not exist'
    else:
        clientObj = Client(client[0])

    cur.close()
    conn.close()

    return clientObj.__dict__

def add_client(client):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()
    
    cur.execute(f"INSERT INTO Client(name) VALUES ('{client}');")
    conn.commit()

    cur.close()
    conn.close()

def remove_client(idnum):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()
    
    cur.execute(f"DELETE FROM Client WHERE id={idnum};")
    conn.commit()

    cur.close()
    conn.close()

def remove_client_by_name(name):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()
    
    cur.execute(f"DELETE FROM Client WHERE name='{name}';")
    conn.commit()

    cur.close()
    conn.close()

def get_clientid_by_name(name):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"SELECT id FROM client where name = '{name}';")

    client = cur.fetchall()
    if client == []:
        cur.close()
        conn.close()
        return 'Client does not exist'
    else:
        clientid = client[0][0]

    cur.close()
    conn.close()

    return clientid

def update_client(id, name):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"Update client Set name = '{name}' where id = {id};")
    conn.commit()

    cur.close()
    conn.close()    

class Invoices:
    def __init__(self,invoicesTuple):
        self.id, self.date, self.location, self.client_id = invoicesTuple


def get_client_invoices(id):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"SELECT * FROM invoices where client_id ={id};")

    clientInvoicesArray = cur.fetchall()
    
    clientInvoicesJSON = []
    for invoices in clientInvoicesArray:
        newInvoice = Invoices(invoices)
        clientInvoicesJSON.append(newInvoice.__dict__)

    cur.close()
    conn.close()
    
    return clientInvoicesJSON

def get_invoice(id):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"SELECT * FROM invoices where id = {id};")

    invoice = cur.fetchall()
    if invoice == []:
        cur.close()
        conn.close()
        return 'Invoice does not exist'
    else:
        invoiceObj = Invoices(invoice[0])

    cur.close()
    conn.close()

    return invoiceObj.__dict__

def get_invoiceId_by_location(location):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"SELECT id FROM invoices where location = '{location}';")

    invoice = cur.fetchall()
    if invoice == []:
        cur.close()
        conn.close()
        return 'Invoice does not exist'
    else:
        invoiceid = invoice[0][0]

    cur.close()
    conn.close()

    return invoiceid

def add_invoice(date, location, client_id):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()
    
    cur.execute(f"INSERT INTO Invoices(date, location, client_id) VALUES ('{date}','{location}','{client_id}');")
    conn.commit()

    cur.close()
    conn.close()

def remove_invoice(idnum):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()
    
    cur.execute(f"DELETE FROM Invoices WHERE id={idnum};")
    conn.commit()

    cur.close()
    conn.close()

def update_invoice(id, date, location, client_id):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"Update invoices Set date='{date}', location='{location}', client_id='{client_id}' where id = {id};")
    conn.commit()

    cur.close()
    conn.close()    


class Items:
    def __init__(self,itemTuple):
        self.id, self.name, self.invoice_id, self.price, self.gst, self.quantity = itemTuple

def get_invoice_items(id):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"SELECT * FROM items where invoice_id ={id};")

    invoiceItemsArray = cur.fetchall()
    
    invoiceItemsJSON = []
    for item in invoiceItemsArray:
        newItem = Items(item)
        invoiceItemsJSON.append(newItem.__dict__)

    cur.close()
    conn.close()
    
    return invoiceItemsJSON

def get_itemid_by_name(name):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"SELECT id FROM items where name = '{name}';")

    invoice = cur.fetchall()
    if invoice == []:
        cur.close()
        conn.close()
        return 'Item does not exist'
    else:
        invoiceid = invoice[0][0]

    cur.close()
    conn.close()

    return invoiceid

def add_item(name,invoice_id,price,gst,quantity):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()
    
    cur.execute(f"INSERT INTO items(name, invoice_id, price, gst, quantity) VALUES ('{name}','{invoice_id}','{price}','{gst}','{quantity}');")
    conn.commit()

    cur.close()
    conn.close()

def remove_item(id):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()
    
    cur.execute(f"DELETE FROM items WHERE id={id};")
    conn.commit()

    cur.close()
    conn.close()

def get_item(id):
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"SELECT * FROM items where id = {id};")

    Item = cur.fetchall()
    if Item == []:
        cur.close()
        conn.close()
        return 'Item does not exist'
    else:
        ItemObj = Items(Item[0])

    cur.close()
    conn.close()

    return ItemObj.__dict__

def update_item(id, name, invoiceid, price, gst, quantity):
    
    conn = psycopg2.connect("dbname=evolveu")
    cur = conn.cursor()

    cur.execute(f"Update items Set name='{name}', invoice_id='{invoiceid}', price='{price}', gst='{gst}', quantity='{quantity}' where id = {id};")
    conn.commit()

    cur.close()
    conn.close() 