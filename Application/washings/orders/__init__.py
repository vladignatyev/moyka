import json
from django.http import HttpResponse

# def json_response(response_data):
# 	return HttpResponse(json.dumps(response_data), mimetype="application/json")

from django.core import serializers

class JSONResponse(HttpResponse):
	def __init__(self, response_data):
		super(JSONResponse, self).__init__(json.dumps({"result":response_data}), mimetype="application/json")

class JSONModelResponse(HttpResponse):
    def __init__(self, response_data):
        super(JSONModelResponse, self).__init__(serializers.serialize("json", response_data), mimetype="application/json")

class JSONErrorResponse(HttpResponse):
	def __init__(self, error_code):
		super(JSONResponse, self).__init__(json.dumps({"error":error_code}), mimetype="application/json")


def jsonp_string(response_data, variable_name):
	return "var %s = %s;" % (variable_name, serializers.serialize("json", response_data))


class JSONPResponse(HttpResponse):
	def __init__(self, response_data, variable_name):
		super(JSONPResponse, self).__init__(jsonp_string(response_data, variable_name), mimetype="text/javascript")
