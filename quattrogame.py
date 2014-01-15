#!/usr/bin/env python

import os
import webapp2
import jinja2

from google.appengine.ext import ndb
from google.appengine.api import users

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.out.write(template.render())

app = webapp2.WSGIApplication([('/', MainPage)], debug=True)
