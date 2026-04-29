import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not found");
}

type CustomJwtPayload = JwtPayload & {
    id: string;
    role: string;
    fullName: string;
    email: string;
};

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
                fullName: string;
                email: string;
            };
        }
    }
}

export const authMiddleware: RequestHandler = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Authorization header missing",
                data: null
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token format",
                data: null
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token missing",
                data: null
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

        req.user = {
            id: decoded.id,
            role: decoded.role,
            fullName: decoded.fullName,
            email: decoded.email
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or expired token",
            data: null
        });
    }
};