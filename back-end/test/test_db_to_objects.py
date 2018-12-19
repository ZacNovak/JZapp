import unittest
from db_to_objects import Client, Invoices, Items
import db_to_objects
import datetime

class TestDBObjects(unittest.TestCase):

    def test_create_client(self):
        test_client = Client((1000,'Joe'))
        self.assertEqual("Joe",test_client.name)

    def test_get_all_clients(self):
        self.assertEqual(1, db_to_objects.get_all_clients()[0]['idnum'])
        self.assertEqual("Zac", db_to_objects.get_all_clients()[0]['name'])

    def test_create_invoice(self):
        test_invoices = Invoices((2006,"2018-11-20","West",2))
        self.assertEqual("2018-11-20", test_invoices.date)
        self.assertEqual("West", test_invoices.location)
        self.assertEqual(2, test_invoices.client_id)

    def test_get_client_invoices(self):
        firstInvoice = {'id': 2, 'date':datetime.date(2018, 11, 20), 'location':'North', "client_id":2}
        secondInvoice = {'id': 6, 'date':datetime.date(2018, 11,21), 'location':'East',"client_id":2}
        self.assertEqual([firstInvoice, secondInvoice], db_to_objects.get_client_invoices(2))

    def test_create_item(self):
        test_item = Items((3006,'Chocolate',1, 2.35,0.12,2))
        self.assertEqual('Chocolate',test_item.name)
        self.assertEqual(1,test_item.invoice_id)
        self.assertEqual(2.35,test_item.price)
        self.assertEqual(0.12,test_item.gst)
        self.assertEqual(2,test_item.quantity)

    def test_get_invoice_items(self):
        firstItem = {'id':5,'name':'Tea','invoice_id':3,'price':"$2.75",'gst':"$0.14",'quantity':1}
        secondItem = {'id':33,'name':'Gatorade','invoice_id':3,'price':"$2.50",'gst':'$0.13','quantity':9}
        self.assertEqual([firstItem,secondItem], db_to_objects.get_invoice_items(3))

    def test_get_client(self):
        self.assertEqual({'idnum':1, 'name':'Zac'}, db_to_objects.get_client(1))

    def test_get_clientid_by_name(self):
        testID = db_to_objects.get_clientid_by_name('Jill')
        self.assertEqual(testID,4)

    def test_add_client_to_db(self):
         test_client = 'Margo'       
         db_to_objects.add_client(test_client)
         test_client_id = db_to_objects.get_clientid_by_name('Margo')
         self.assertEqual({'idnum':test_client_id, 'name':test_client}, db_to_objects.get_client(test_client_id))

    def test_remove_client(self):
        test_client_id = db_to_objects.get_clientid_by_name('Margo')
        db_to_objects.remove_client(test_client_id)
        self.assertEqual('Client does not exist', db_to_objects.get_client(test_client_id))

    def test_get_invoice(self):
        self.assertEqual({'id':1, 'date':datetime.date(2018, 11, 20), 'location':'West', "client_id":1}, db_to_objects.get_invoice(1), db_to_objects.get_invoice(1))

    def test_get_invoicesid_by_location(self):
        testInvoiceID = db_to_objects.get_invoiceId_by_location('West')
        self.assertEqual(testInvoiceID,1)


    def test_add_invoice_to_db(self):
        test_date = datetime.date(1990, 1, 1)
        test_location = "Test"
        test_client_id = 50
        db_to_objects.add_invoice(test_date, test_location, test_client_id)
        test_invoice_id = db_to_objects.get_invoiceId_by_location("Test")
        self.assertEqual({'id':test_invoice_id, 'date':test_date, 'location':test_location, "client_id":test_client_id}, db_to_objects.get_invoice(test_invoice_id))

    def test_remove_invoice(self):
        testInvoiceID = db_to_objects.get_invoiceId_by_location('Test')
        db_to_objects.remove_invoice(testInvoiceID)
        self.assertEqual('Invoice does not exist', db_to_objects.get_invoice(testInvoiceID))

    def test_get_client_invoices(self):
        self.assertEqual([{'id':1, 'date':datetime.date(2018, 11, 20), 'location':'West', "client_id":1}], db_to_objects.get_client_invoices(1))

    def test_update_client(self):
        testID = db_to_objects.get_clientid_by_name('Zac')
        db_to_objects.update_client(testID,'Margo')
        self.assertEqual({'idnum':1, 'name':'Margo'}, db_to_objects.get_client(1))

    def test_update_invoice(self):
        testInvoiceID = db_to_objects.get_invoiceId_by_location('Test2')
        test_date = datetime.date(1990, 1, 1)
        test_location = "Test3"
        test_client_id = 51
        db_to_objects.update_invoice(testInvoiceID,test_date, test_location, test_client_id)
        test_invoice_id = db_to_objects.get_invoiceId_by_location("Test3")
        self.assertEqual({'id':test_invoice_id, 'date':test_date, 'location':test_location, "client_id":test_client_id}, db_to_objects.get_invoice(test_invoice_id))

    def test_get_itemid_by_name(self):
        self.assertEqual(db_to_objects.get_itemid_by_name('Bagel'),9)
        self.assertEqual(db_to_objects.get_itemid_by_name('Funk'),'Item does not exist')

    def test_add_remove_item(self):
        testname = 'Junk'
        testinvoiceid = 30
        testprice = 32.45
        testgst = 1.34
        testquantity = 10
        db_to_objects.add_item(testname,testinvoiceid,testprice,testgst,testquantity)
        testid = db_to_objects.get_itemid_by_name('Junk')
        db_to_objects.remove_item(testid)
        self.assertEqual(db_to_objects.get_item(testid),'Item does not exist')
        
    def test_update_item(self):
        testItemID = db_to_objects.get_itemid_by_name('Apple')
        testname = 'Apple2'
        testinvoiceid = 35
        testprice = 10.00
        testgst = 0.50
        testquantity = 5
        db_to_objects.update_item(testItemID, testname, testinvoiceid, testprice, testgst, testquantity)
        test_item_id = db_to_objects.get_itemid_by_name("Apple2")
        self.assertEqual({'id':testItemID, 'name':testname, 'invoice_id':testinvoiceid, 'price':"$10.00", 'gst': "$0.50", 'quantity':testquantity}, db_to_objects.get_item(test_item_id))