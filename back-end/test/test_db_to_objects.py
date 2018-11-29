import unittest
from db_to_objects import Client, Invoices, Items
import db_to_objects
import datetime

class TestDBObjects(unittest.TestCase):

    def test_create_client(self):
        test_client = Client((1,'Joe'))
        self.assertEqual(1, test_client.idnum)
        self.assertEqual("Joe",test_client.name)

    def test_get_all_clients(self):
        self.assertEqual(1, db_to_objects.get_all_clients()[0]['idnum'])
        self.assertEqual("Zac", db_to_objects.get_all_clients()[0]['name'])

    def test_create_invoice(self):
        test_invoices = Invoices((1,"2018-11-20","West",2))
        self.assertEqual(1, test_invoices.id)
        self.assertEqual("2018-11-20", test_invoices.date)
        self.assertEqual("West", test_invoices.location)
        self.assertEqual(2, test_invoices.client_id)

    def test_get_client_invoices(self):
        firstInvoice = {'id': 2, 'date':datetime.date(2018, 11, 20), 'location':'North', "client_id":2}
        secondInvoice = {'id': 6, 'date':datetime.date(2018, 11,21), 'location':'East',"client_id":2}
        self.assertEqual([firstInvoice, secondInvoice], db_to_objects.get_client_invoices(2))

    def test_create_item(self):
        test_item = Items((1,'Chocolate',1, 2.35,0.12,2))
        self.assertEqual(1, test_item.id)
        self.assertEqual('Chocolate',test_item.name)
        self.assertEqual(1,test_item.invoice_id)
        self.assertEqual(2.35,test_item.price)
        self.assertEqual(0.12,test_item.gst)
        self.assertEqual(2,test_item.quantity)

    def test_get_invoice_items(self):
        firstItem = {'id':5,'name':'Tea','invoice_id':3,'price':2.75,'gst':0.1375,'quantity':1}
        secondItem = {'id':33,'name':'Gatorade','invoice_id':3,'price':2.5,'gst':0.125,'quantity':9}
        self.assertEqual([firstItem,secondItem], db_to_objects.get_invoice_items(3))
    