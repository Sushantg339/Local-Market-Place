export const mailtemplate = (otp: string) => {
    return `<div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #333;">Servora OTP Verification</h2>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) is:</p>

            <h1 style="letter-spacing: 5px; color: #2c7be5;">
                ${otp}
            </h1>

            <p>This OTP is valid for <strong>5 minutes</strong>.</p>
            <p>Please do not share this OTP with anyone.</p>

            <hr />
            <p style="font-size: 12px; color: gray;">
                If you did not request this, you can safely ignore this email.
            </p>

            <p>Thanks,<br/>Team Servora</p>
        </div>`
}