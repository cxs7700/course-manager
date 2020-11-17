from flask import Flask
from flask_restful import Resource, Api


from api.swen_344_db_utils import *
from api.example_api import *
from api.course_data import *

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(ExampleApi,'/example_api')
api.add_resource(CourseData_all, '/coursedata')
api.add_resource(CourseData_selected, '/coursedata/<string:isSelected>/selected')
api.add_resource(CourseData_update, '/coursedata/<int:id>/update')

if __name__ == '__main__':
    print("Loading db")
    exec_sql_file('courses.sql')
    print("Starting flask")
    app.run(debug=True), #starts Flask
