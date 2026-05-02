export const registerMailTemplate = (otp: string) => {
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
        </div>`;
};

export const forgotPasswordMailTemplate = (otp: string) => {
  return `<div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #333;">Servora Password Reset</h2>
            
            <p>Hello,</p>
            
            <p>We received a request to reset your password.</p>
            <p>Your password reset OTP is:</p>

            <h1 style="letter-spacing: 5px; color: #e5533d;">
                ${otp}
            </h1>

            <p>This OTP is valid for <strong>5 minutes</strong>.</p>
            
            <p>Please do not share this OTP with anyone.</p>

            <hr />

            <p style="font-size: 12px; color: gray;">
                If you did not request a password reset, you can safely ignore this email.
            </p>

            <p>Thanks,<br/>Team Servora</p>
        </div>`;
};

export const updatePasswordTemplate = (name?: string) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Password Updated Successfully ✅</h2>
        
        <p>Hello ${name || "User"},</p>
        
        <p>Your password has been successfully updated.</p>
        
        <p>If you made this change, you can safely ignore this email.</p>
        
        <p style="color: red; font-weight: bold;">
            If you did NOT make this change, please reset your password immediately and contact our support team.
        </p>
        
        <hr />
        
        <p style="font-size: 14px; color: #777;">
            For security reasons, we recommend using a strong and unique password.
        </p>

        <p>Thanks,<br/>Your Team</p>
    </div>
    `;
}