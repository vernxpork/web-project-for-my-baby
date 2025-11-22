export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, error: "Missing token" });
    }

    const secret = process.env.VINS_DAY;

    const verifyUrl =
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

    const googleRes = await fetch(verifyUrl, { method: "POST" });
    const data = await googleRes.json();

    return res.status(200).json(data);
}