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

interface Investment {
    id: number
    name: string
    type: string
}

interface RecordReturnModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (returnData: {
        investmentId: number
        amount: number
        date: string
    }) => void
    investments: Investment[]
}

export default function RecordReturnModal({
    isOpen,
    onClose,
    onSubmit,
    investments,
}: RecordReturnModalProps) {
    const [investmentId, setInvestmentId] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            investmentId: parseInt(investmentId),
            amount: parseFloat(amount),
            date,
        })
        setInvestmentId('')
        setAmount('')
        setDate('')
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Record Return</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="investment">Investment</Label>
                        <Select
                            value={investmentId}
                            onValueChange={setInvestmentId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an investment" />
                            </SelectTrigger>
                            <SelectContent>
                                {investments.map((investment) => (
                                    <SelectItem
                                        key={investment.id}
                                        value={investment.id.toString()}>
                                        {investment.name} ({investment.type})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="amount">Return Amount</Label>
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
                    <DialogFooter>
                        <Button type="submit">Record Return</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
