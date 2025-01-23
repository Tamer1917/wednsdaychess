from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)  # قراءة البيانات المرسلة
        data = json.loads(post_data.decode("utf-8"))  # تحويل JSON إلى Python Dict

        # استخراج البيانات
        username = data.get("username", "مجهول")
        points = data.get("points", 0)

        # رسالة تأكيد
        response = {"message": "تم تحديث النقاط بنجاح!", "username": username, "points": points}

        # إرسال استجابة HTTP
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(response).encode("utf-8"))
