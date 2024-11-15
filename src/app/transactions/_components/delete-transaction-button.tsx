'use client'
import { Button } from '@/app/_components/ui/button'
import { TrashIcon } from 'lucide-react'
import { deleteTransaction } from '@/app/_actions/delete-transaction'

interface DeleteProps {
    transactionId: string
}

export function DeleteTransactionButton({ transactionId }: DeleteProps) {
    function onDeleteTransaction() {
        if (confirm('Confirma remoção?')) {
            deleteTransaction(transactionId)
        }
    }

    return (
        <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={onDeleteTransaction}>
            <TrashIcon />
        </Button>
    )
}
