'use client'
import { ArrowDownUpIcon } from 'lucide-react'
import { Button } from './button'
import { useState } from 'react'
import { UpsertTransaction } from '../upsert-transaction'

export function AddTransactionButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                className="rounded-full font-bold"
                onClick={() => setIsOpen(true)}>
                Adicionar transação <ArrowDownUpIcon />
            </Button>
            <UpsertTransaction isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}
