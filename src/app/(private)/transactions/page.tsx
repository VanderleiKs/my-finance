import { DataTable } from '../../_components/ui/data-table'
import { db } from '../../_lib/prisma'
import { transactionsColumns } from './_columns'
import { Transaction } from '@prisma/client'
import { AddTransactionButton } from '../../_components/ui/add-transaction-button'

export default async function TransactionPage() {
    const transactions: Transaction[] = await db.transaction.findMany({})

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between w-full items-center">
                <h1 className="text-2xl font-bold">Transações</h1>
                <AddTransactionButton />
            </div>
            <DataTable columns={transactionsColumns} data={transactions} />
        </div>
    )
}
