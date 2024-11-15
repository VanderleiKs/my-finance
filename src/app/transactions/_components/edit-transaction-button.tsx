'use client'

import { Button } from '@/app/_components/ui/button'
import { UpsertTransaction } from '@/app/_components/upsert-transaction'
import { Transaction } from '@prisma/client'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
    transaction: Transaction
}

export function EditTransactionButton({ transaction }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                variant="ghost"
                className="text-muted-foreground"
                onClick={() => setIsOpen(true)}>
                <PencilIcon />
            </Button>
            <UpsertTransaction
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                transaction={{
                    ...transaction,
                    amount: Number(transaction.amount),
                }}
                transactionId={transaction.id}
            />
        </>
    )
}
