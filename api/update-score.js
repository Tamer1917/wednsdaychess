export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, points } = req.body;

        // تأكد من أن البيانات موجودة
        if (!username || points === undefined) {
            return res.status(400).json({ error: "البيانات غير كاملة" });
        }

        console.log(`📩 تم استقبال البيانات من البوت: ${username} لديه ${points} نقاط`);

        // إرسال رد ناجح
        return res.status(200).json({ message: "✅ تم استقبال البيانات بنجاح", username, points });
    } else {
        return res.status(405).json({ error: "❌ الطريقة غير مسموحة، استخدم POST فقط" });
    }
}
