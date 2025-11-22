export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ success: false, message: "No token provided" });
    }

    const secretKey = "YOUR_SECRET_KEY_HERE";

    const googleVerifyURL =
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
        const googleResponse = await fetch(googleVerifyURL, { method: "POST" });
        const data = await googleResponse.json();

        if (!data.success) {
            return res.status(400).json({ success: false, message: "Invalid captcha" });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}