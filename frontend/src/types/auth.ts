export type signupPayload = {
    fullName: string,
    email: string,
    password: string,
    role: string
}

export type verifyOtpPayload = {
    fullName: string,
    email: string,
    password: string,
    role: string,
    otp: string
}

export type loginPayload = {
    email: string,
    password: string
}

export type forgotPasswordPayload = {
    email: string
}

export type verifyForgotOtpPayload = {
    email: string,
    otp: string
}

export type resetPasswordPayload = {
    password: string,
    confirmPassword: string,
    token: string
}