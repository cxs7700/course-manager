from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class CourseData_all(Resource):
  def get(self):
    result = exec_get_all("SELECT * FROM courses;")
    return result
  
class CourseData_update(Resource):
  def put(self):
    pass

class CourseData_selected(Resource):
  def get(self):
    result = exec_get_all("SELECT * FROM courses WHERE courses.selected = TRUE;")
    return result