import { db } from '@/app/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import {
    Transaction,
    TransactionCategory,
    TransactionType,
} from '@prisma/client'

export interface ExpensesTotalPerCategory {
    category: TransactionCategory
    totalAmount: number
    percentageTotal: number
}

interface DashboardData {
    depositTotal: number
    investmentTotal: number
    expensesTotal: number
    balance: number
    expenseTotalPerCategory: ExpensesTotalPerCategory[]
    lastTransactions: Transaction[]
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

    const expenseTotalPerCategory: ExpensesTotalPerCategory[] = (
        await db.transaction.groupBy({
            by: 'category',
            where: {
                ...where,
                type: TransactionType.EXPENSE,
            },
            _sum: { amount: true },
        })
    ).map((cat) => ({
        category: cat.category,
        totalAmount: Number(cat._sum.amount),
        percentageTotal: Math.round(
            (Number(cat._sum.amount) / expensesTotal) * 100,
        ),
    }))

    const lastTransactions: Transaction[] = await db.transaction.findMany({
        where: {
            ...where,
        },
        orderBy: { createAt: 'desc' },
        take: 15,
    })

    const balance = depositTotal - investmentTotal - expensesTotal

    return {
        depositTotal,
        investmentTotal,
        expensesTotal,
        balance,
        expenseTotalPerCategory,
        lastTransactions,
    }
}
