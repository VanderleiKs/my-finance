import { db } from '@/app/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { TransactionType } from '@prisma/client'

interface DashboardData {
    depositTotal: number
    investmentTotal: number
    expensesTotal: number
    balance: number
}

export async function dashboardData(month: string): Promise<DashboardData> {
    const { userId } = await auth()
    const year = '2024'
    const monthLt = Number(month) === 12 ? 1 : Number(month) + 1
    const where = {
        userId: userId ?? '',
        date: {
            gte: new Date(`${year}-${month}-01`),
            lt: new Date(`${year}-${monthLt}-01`),
        },
    }
    const depositTotal = Number(
        (
            await db.transaction.aggregate({
                where: { ...where, type: TransactionType.DEPOSIT },
                _sum: { amount: true },
            })
        )._sum.amount,
    )

    const investmentTotal = Number(
        (
            await db.transaction.aggregate({
                where: { ...where, type: TransactionType.INVESTMENT },
                _sum: { amount: true },
            })
        )._sum.amount,
    )

    const expensesTotal = Number(
        (
            await db.transaction.aggregate({
                where: { ...where, type: TransactionType.EXPENSE },
                _sum: { amount: true },
            })
        )._sum.amount,
    )

    const balance = depositTotal - investmentTotal - expensesTotal

    return { depositTotal, investmentTotal, expensesTotal, balance }
}
