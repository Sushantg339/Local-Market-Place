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