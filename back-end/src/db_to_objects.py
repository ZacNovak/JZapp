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