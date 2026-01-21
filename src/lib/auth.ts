import { jwtVerify } from 'jose'

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
}

export const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET)

export async function verifySession(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        return null
    }
}

export type SessionPayload = {
    userId: number
    role: 'ADMIN' | 'STAFF'
    iat: number
    exp: number
    tokenVersion: number
}
