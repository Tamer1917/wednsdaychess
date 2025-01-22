const TelegramBot = require('node-telegram-bot-api');
const admin = require('firebase-admin');

// إعداد Firebase
admin.initializeApp({
    credential: admin.credential.cert(require('./serviceAccountKey.json')),
    databaseURL: "https://mychessgame-7811e-default-rtdb.europe-west1.firebasedatabase.app"
});

// ضع رمز التوكن الخاص بك هنا
const botToken = '7679813979:AAGWex1J2x6mIabmBgKMXGhGuILrPN2wLGo';

const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username || `user_${chatId}`;

    // مرجع المستخدم في Firebase
    const userRef = admin.database().ref('users/' + chatId);

    // التحقق مما إذا كان المستخدم موجودًا بالفعل
    userRef.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            // المستخدم جديد -> تسجيله وإعطاؤه 5 نقاط
            userRef.set({
                username: username,
                points: 5
            });

            bot.sendMessage(chatId, `مرحبًا ${username}! 🎉 لقد حصلت على **5 نقاط** كمكافأة تسجيل.`);
        } else {
            bot.sendMessage(chatId, `مرحبًا مجددًا ${username}! 😊`);
        }
    });


});
