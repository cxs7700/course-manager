from rest_utils import *
import unittest
import json


class TestCourseData(unittest.TestCase):
    def setUp(self):
        pass
    
    def tearDown(self):
        pass
    
    def test_api(self):
        result = get_rest_call(self, 'http://localhost:5000/example_api')
        self.assertEqual(4, result[0],"Should have returned a count of '4'")
        print("API test successfully returned a count of '4' ")

    def test_get_all_course_data(self):
        result = get_rest_call(self, 'http://localhost:5000/coursedata')
        self.assertEqual(4, len(result),"Should have returned a count of '4'")
        print("GET COURSE DATA successfully returned a count of '4' ")
        
    def test_update_course_data(self):
        id = 2
        result = put_rest_call(self, 'http://localhost:5000/coursedata/%s/update' % id)
        self.assertEqual(False, result['isSelected'], "Should have returned False")
        self.assertEqual(id, result['id'], "Should have returned ID of 2")
        print("PUT UPDATE COURSE DATA successful")
    
    def test_get_selected_course(self):
        isSelected = True

        result = get_rest_call(self, 'http://localhost:5000/coursedata/%s/selected' % isSelected)
        self.assertEqual(0, len(result), "Should have returned a count of '0' ")
        print("GET SELECTED COURSE DATA successful")
        
        
    
    