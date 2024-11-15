'use server'
import { db } from '@/app/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function deleteTransaction(transactionId: string) {
    const { userId } = await auth()

    if (!userId) {
        throw Error('Unauthorized')
    }

    await db.transaction.delete({
        where: {
            id: transactionId,
        },
    })
    revalidatePath('/transactions')
}
