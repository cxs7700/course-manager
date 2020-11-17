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
  def put(self, id):
    parser = reqparse.RequestParser()
    parser.add_argument('selected', default=False, required=False)
    args = parser.parse_args()
    trueBool = args['selected'] == 'true'
    sql = """
      UPDATE courses SET selected = %s WHERE courses.id = %s;
    """
    exec_commit(sql, [trueBool, id])
    return({ "id": id, "isSelected": trueBool })

class CourseData_selected(Resource):
  def get(self, isSelected):
    result = exec_get_all("SELECT * FROM courses WHERE courses.selected = %s;", [isSelected])
    print(result)
    return result