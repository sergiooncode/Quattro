#!/usr/bin/env python

# import cgi
import os
import urllib
# import datetime
import webapp2
# from webapp2_extras import jinja2
import jinja2

from google.appengine.ext import ndb
from google.appengine.api import users

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))
# ,extensions=['jinja2.ext.autoescape'],
#     autoescape=True

class MainPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        # jinja = jinja2.get_jinja2(app=self.app)
        self.response.out.write(template.render())
        # rv = jinja.render_template("index.html")
        # self.response.write(rv)

#     def get(self):
#         guestbook_name = self.request.get('guestbook_name', DEFAULT_GUESTBOOK_NAME)
#         # greetings_query = Greeting.query(ancestor=guestbook_key(guestbook_name)).order(-Greeting.date)
#         greetings_query = Greeting.query(ancestor=guestbook_key).order(-Greeting.date)
#         greetings = greetings_query.fetch(10)
#  
#         if users.get_current_user():
#             url = users.create_logout_url(self.request.uri)
#             url_linktext = 'Logout'
#         else:
#             url = users.create_login_url(self.request.uri)
#             url_linktext = 'Login'
#  
#         template_values = {
#             'greetings': greetings,
#             'guestbook_name': urllib.quote_plus(guestbook_name),
#             'url': url,
#             'url_linktext': url_linktext,
#         }
#         template = JINJA_ENVIRONMENT.get_template('index.html')
#         self.response.write(template.render(template_values))

app = webapp2.WSGIApplication([('/', MainPage)], debug=True)
