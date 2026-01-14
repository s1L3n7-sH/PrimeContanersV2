import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@prime.com'
    // You can change this default password
    const password = 'admin'
    const hashedPassword = await bcrypt.hash(password, 10)

    const userInput = {
        email,
        password: hashedPassword,
        name: 'System Admin',
        role: 'ADMIN' as const,
    }

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: userInput,
    })

    console.log(`User created: ${user.email}`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
