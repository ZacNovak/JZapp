import unittest
from db_to_objects import Client, Invoices
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
        self.assertEqual([{'id': 2, 'date':datetime.date(2018, 11, 20), 'location':'North', "client_id":2}, {'id': 6, 'date':datetime.date(2018, 11,21), 'location':'East',"client_id":2}], db_to_objects.get_client_invoices(2))
    