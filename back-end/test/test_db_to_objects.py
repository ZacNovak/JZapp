import unittest
from db_to_objects import Client
import db_to_objects

class TestDBObjects(unittest.TestCase):

    def test_create_client(self):
        test_client = Client((1,'Joe'))
        self.assertEqual(1, test_client.idnum)
        self.assertEqual("Joe",test_client.name)

    def test_get_all_clients(self):
        self.assertEqual(1, db_to_objects.get_all_clients()[0]['idnum'])
        self.assertEqual("Lynn", db_to_objects.get_all_clients()[0]['name'])