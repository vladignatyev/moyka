import web
import re
import os

def validateEmail(email):
	if len(email) > 7:
		if re.match("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$", email) != None:
			return True
	return False

urls = (
    '/mails/(.*)', 'mails'
)
app = web.application(urls, globals())

class mails:        
    def GET(self, email):
        if not validateEmail(email): 
            return 'invalid_email';
        f = open('emails.txt', 'a')
        f.write("%s\r\n" % (email))
        f.close()
        return 'ok'

if __name__ == "__main__":
    app.run()
