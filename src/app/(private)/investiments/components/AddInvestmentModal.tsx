import { useState } from 'react'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { Label } from '@/app/_components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/app/_components/ui/dialog'

interface AddInvestmentModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (investment: {
        name: string
        amount: number
        date: string
        type: string
    }) => void
}

const investmentTypes = [
    'Stocks',
    'Bonds',
    'Real Estate',
    'Cryptocurrency',
    'Mutual Funds',
    'ETFs',
    'Other',
]

export default function AddInvestmentModal({
    isOpen,
    onClose,
    onSubmit,
}: AddInvestmentModalProps) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ name, amount: parseFloat(amount), date, type })
        setName('')
        setAmount('')
        setDate('')
        setType('')
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Investment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Investment Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="type">Investment Type</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select investment type" />
                            </SelectTrigger>
                            <SelectContent>
                                {investmentTypes.map((invType) => (
                                    <SelectItem key={invType} value={invType}>
                                        {invType}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Investment</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
