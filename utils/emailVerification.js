const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "8261ba19898d0dcefe6c0c411df74b587b2e54538f5f451633b71e39f957cf01";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pkripesh345@gmail.com",
        pass: "ccgh bzxq kytm tnxi",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendVerificationEmail = async (email, username, password, profilePicture, bio, res) => {
    try {
        // Create a token with user details (but don’t save to DB yet)
        const token = jwt.sign({ username, email, password, profilePicture, bio }, SECRET_KEY, { expiresIn: "1h" });

        // Email with "Confirm" button
        const mailOptions = {
            from: '"SonicSummit" <pkripesh345@gmail.com>',
            to: email,
            subject: "Confirm Your Registration",
            html: `
                <p>Click the button below to confirm your registration:</p>
                <form action="http://localhost:5000/api/auth/verify" method="POST">
                    <input type="hidden" name="token" value="${token}">
                    <button type="submit" 
                        style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer;">
                        Confirm Registration
                    </button>
                </form>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Verification email sent. Please check your inbox." });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
};
