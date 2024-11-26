import { DataTable } from '../../_components/ui/data-table'
import { db } from '../../_lib/prisma'
import { transactionsColumns } from './_columns'
import { Transaction } from '@prisma/client'
import { AddTransactionButton } from '../../_components/ui/add-transaction-button'
import { auth } from '@clerk/nextjs/server'
import { ScrollArea } from '@/app/_components/ui/scroll-area'

export default async function TransactionPage() {
    const { userId } = await auth()
    const transactions: Transaction[] = await db.transaction.findMany({
        where: { userId: userId ?? '' },
    })

    return (
        <div className="p-6 space-y-6 flex flex-col overflow-hidden">
            <div className="flex justify-between w-full items-center">
                <h1 className="text-2xl font-bold">Transações</h1>
                <AddTransactionButton />
            </div>
            <ScrollArea className="border rounded-lg">
                <DataTable columns={transactionsColumns} data={transactions} />
            </ScrollArea>
        </div>
    )
}
