import { Button } from '@/app/_components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/_components/ui/table'

interface Investment {
    id: number
    name: string
    amount: number
    date: string
    type: string
}

interface Return {
    id: number
    investmentId: number
    amount: number
    date: string
}

interface InvestmentListProps {
    investments: Investment[]
    returns: Return[]
    onDelete: (id: number) => void
}

export default function InvestmentList({
    investments,
    returns,
    onDelete,
}: InvestmentListProps) {
    const calculateTotalReturns = (investmentId: number) => {
        return returns
            .filter((ret) => ret.investmentId === investmentId)
            .reduce((total, ret) => total + ret.amount, 0)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Returns</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {investments.map((investment) => (
                    <TableRow key={investment.id}>
                        <TableCell>{investment.name}</TableCell>
                        <TableCell>{investment.type}</TableCell>
                        <TableCell>${investment.amount.toFixed(2)}</TableCell>
                        <TableCell>{investment.date}</TableCell>
                        <TableCell>
                            ${calculateTotalReturns(investment.id).toFixed(2)}
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="destructive"
                                onClick={() => onDelete(investment.id)}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
