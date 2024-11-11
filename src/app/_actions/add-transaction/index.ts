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
    name: string
    amount: number
    type: TransactionType
    category: TransactionCategory
    paymentMethod: TransactionPaymentMethod
    date: Date
}

export async function addTransaction(transaction: Transaction) {
    const { userId } = await auth()
    console.log({ ...transaction, userId })
    addTransactionSchema.parse(transaction)

    if (!userId) {
        throw Error('Unauthorized')
    }

    await db.transaction.create({
        data: { ...transaction, userId },
    })
    revalidatePath('/transactions')
}
