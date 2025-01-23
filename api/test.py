import requests

data = {
    "username": "test_user",
    "points": 10
}

response = requests.post("https://your-project-name.vercel.app/api/update-score", json=data)
print(response.json())  # طباعة استجابة الخادم
