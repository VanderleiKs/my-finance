'use client'
import { Transaction } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import TransactionTypeBadge from '../_components/type-badge'
import {
    TRANSACTION_CATEGORY_LABELS,
    TRANSACTION_PAYMENT_METHOD_LABELS,
} from '../../_constants/transaction'
import { TrashIcon } from 'lucide-react'
import { Button } from '@/app/_components/ui/button'
import { EditTransactionButton } from '../_components/edit-transaction-button'

export const transactionsColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        accessorKey: 'type',
        header: 'Tipo',
        cell: ({ row: { original: transaction } }) => {
            return <TransactionTypeBadge transaction={transaction} />
        },
    },
    {
        accessorKey: 'category',
        header: 'Categoria',
        cell: ({ row: { original: transaction } }) => {
            return TRANSACTION_CATEGORY_LABELS[transaction.category]
        },
    },
    {
        accessorKey: 'paymentMethod',
        header: 'Método de pagamento',
        cell: ({ row: { original: transaction } }) => {
            return TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
        },
    },
    {
        accessorKey: 'date',
        header: 'Data',
        cell: ({ row: { original: transaction } }) => {
            return Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }).format(transaction.date)
        },
    },
    {
        accessorKey: 'amount',
        header: 'Valor',
        cell: ({ row: { original: transaction } }) => {
            return Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(Number(transaction.amount))
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row: { original: transaction } }) => {
            return (
                <div className="space-x-1 max-w-fit">
                    <EditTransactionButton transaction={transaction} />
                    <Button variant="ghost" className="text-muted-foreground">
                        <TrashIcon size="icon" />
                    </Button>
                </div>
            )
        },
    },
]
