import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@primecontainers.org'
    // You can change this default password
    const password = 'adm1nprimecontainers'
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

    // Rental Plans Seeding
    const rentalPlans = [
        {
            type: "Used 20-Foot Standard",
            category: 'RENT_TO_OWN' as const,
            prices: [
                { term: "1-Year Term", price: "$300/Month" },
                { term: "2-Year Term", price: "$250/Month" },
                { term: "3-Year Term", price: "$200/Month" },
            ],
        },
        {
            type: "Used 40-Foot Standard",
            category: 'RENT_TO_OWN' as const,
            prices: [
                { term: "1-Year Term", price: "$450/Month" },
                { term: "2-Year Term", price: "$350/Month" },
                { term: "3-Year Term", price: "$250/Month" },
            ],
        },
        {
            type: "Used 40-Foot High Cube",
            category: 'RENT_TO_OWN' as const,
            prices: [
                { term: "1-Year Term", price: "$500/Month" },
                { term: "2-Year Term", price: "$450/Month" },
                { term: "3-Year Term", price: "$350/Month" },
            ],
        },
        {
            type: "Used 20-Foot Standard",
            category: 'SHORT_TERM' as const,
            prices: [
                { term: "1-3 Month", price: "$190/Month" },
                { term: "6-Month", price: "$170/Month" },
                { term: "12-Month", price: "$140/Month" },
                { term: "18-Month", price: "$120/Month" },
                { term: "24-Month", price: "$100/Month" },
            ],
        },
        {
            type: "Used 40-Foot Standard",
            category: 'SHORT_TERM' as const,
            prices: [
                { term: "1-3 Month", price: "$260/Month" },
                { term: "6-Month", price: "$230/Month" },
                { term: "12-Month", price: "$210/Month" },
                { term: "18-Month", price: "$180/Month" },
                { term: "24-Month", price: "$160/Month" },
            ],
        },
        {
            type: "Used 40-Foot High Cube",
            category: 'SHORT_TERM' as const,
            prices: [
                { term: "1-3 Month", price: "$260/Month" },
                { term: "6-Month", price: "$230/Month" },
                { term: "12-Month", price: "$210/Month" },
                { term: "18-Month", price: "$180/Month" },
                { term: "24-Month", price: "$160/Month" },
            ],
        },
    ];

    for (const plan of rentalPlans) {
        await prisma.rentalPlan.create({
            data: {
                type: plan.type,
                category: plan.category,
                prices: {
                    create: plan.prices
                }
            }
        });
    }

    console.log('Rental plans seeded successfully');
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
