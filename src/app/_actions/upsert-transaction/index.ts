'use server'
import { db } from '@/app/_lib/prisma'
import {
    TransactionCategory,
    TransactionPaymentMethod,
    TransactionType,
} from '@prisma/client'
import { addTransactionSchema } from './schema'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export type Transaction = {
    id?: string
    name: string
    amount: number
    type: TransactionType
    category: TransactionCategory
    paymentMethod: TransactionPaymentMethod
    date: Date
}

export async function upsertTransaction(transaction: Transaction) {
    const { userId } = await auth()
    addTransactionSchema.parse(transaction)

    if (!userId) {
        throw Error('Unauthorized')
    }

    await db.transaction.upsert({
        update: { ...transaction, userId },
        create: { ...transaction, userId },
        where: {
            id: transaction?.id ?? '',
        },
    })
    revalidatePath('/transactions')
}
