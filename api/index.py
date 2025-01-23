from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/update-score', methods=['POST'])
def update_score():
    data = request.get_json()
    
    if not data or 'username' not in data or 'points' not in data:
        return jsonify({"error": "البيانات غير مكتملة"}), 400

    username = data['username']
    points = data['points']
    
    print(f"📌 تم استقبال البيانات: المستخدم {username} لديه {points} نقاط.")

    return jsonify({"message": "تم تحديث النقاط بنجاح!"}), 200

# هذا مطلوب لتشغيل Flask في Vercel
def handler(event, context):
    return app(event, context)
