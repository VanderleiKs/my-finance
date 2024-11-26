import { Button } from '@/app/_components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { TRANSACTION_PAYMENT_METHOD_ICONS } from '@/app/_constants/transaction'
import { formatCurrency } from '@/app/_utils/format-currency'
import { formatDateBr } from '@/app/_utils/format-date'
import { Transaction, TransactionType } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface LastTransactionsProps {
    lastTransactions: Transaction[]
}

export default function Lastransactions({
    lastTransactions,
}: LastTransactionsProps) {
    function getColorAmount(transactiontype: TransactionType) {
        switch (transactiontype) {
            case TransactionType.DEPOSIT:
                return 'text-primary'
            case TransactionType.EXPENSE:
                return 'text-red-500'
            default:
                return 'text-white'
        }
    }

    function getAmountPrefix(transactionType: TransactionType) {
        switch (transactionType) {
            case TransactionType.DEPOSIT:
                return '+'
            case TransactionType.EXPENSE:
                return '-'
            default:
                return ''
        }
    }

    return (
        <ScrollArea className="border rounded-lg">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-bold">Últimas transações</CardTitle>
                <Button
                    variant="outline"
                    className="rounded-full font-bold"
                    asChild>
                    <Link href="/transactions">Ver mais</Link>
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {lastTransactions.map((tr) => (
                    <div
                        key={tr.id}
                        className="flex items-center justify-between ">
                        <div className="flex items-center gap-3">
                            <span className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white">
                                <Image
                                    src={
                                        TRANSACTION_PAYMENT_METHOD_ICONS[
                                            tr.paymentMethod
                                        ]
                                    }
                                    width={20}
                                    height={20}
                                    alt="icon"
                                />
                            </span>
                            <div>
                                <p className="text-sm">{tr.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateBr(tr.createAt)}
                                </p>
                            </div>
                        </div>
                        <div className={getColorAmount(tr.type)}>
                            {getAmountPrefix(tr.type)}
                            {formatCurrency(tr.amount)}
                        </div>
                    </div>
                ))}
            </CardContent>
        </ScrollArea>
    )
}
