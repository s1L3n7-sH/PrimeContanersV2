import { verifySession } from './auth';
import { prisma } from './prisma';
import { SessionPayload } from './auth';

/**
 * Verifies the session token also checking against the database for revocation (kill switch).
 * This MUST be used in Server Components / Actions, not Middleware (unless Node runtime).
 */
export async function verifySessionWithDb(token: string): Promise<(SessionPayload & { name: string }) | null> {
    const payload = await verifySession(token) as SessionPayload | null;

    if (!payload) {
        return null;
    }

    try {
        // Use raw query to bypass stale Prisma Client which doesn't know about tokenVersion yet
        // This avoids the "Unknown field" error until the client can be regenerated
        const users = await prisma.$queryRaw`SELECT tokenVersion, isActive, name FROM User WHERE id = ${payload.userId} LIMIT 1` as any[];
        const user = users[0];

        if (!user) {
            return null;
        }

        const userAny = user as any;

        // Validate token version
        if (userAny.tokenVersion !== payload.tokenVersion) {
            return null; // Token is revoked
        }

        // Validate active status
        // Handle MySQL raw boolean (1/0)
        const isActive = userAny.isActive === 1 || userAny.isActive === true;
        if (!isActive) {
            return null;
        }

        return { ...payload, name: userAny.name };
    } catch (error) {
        console.error("Session verification db error", error);
        return null;
    }
}
