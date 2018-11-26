import psycopg2



class Client:
    def __init__(self,clientTuple):
        self.idnum, self.name = clientTuple

def get_all_clients():
    conn = psycopg2.connect("dbname=postgres")
    cur = conn.cursor()

    cur.execute("SELECT * FROM storeclients;")

    clientInfoArray = cur.fetchall()
    
    clientObjArray = []
    for client in clientInfoArray:
        newClient = Client(client)
        clientObjArray.append(newClient.__dict__)

    cur.close()
    conn.close()
    
    return clientObjArray