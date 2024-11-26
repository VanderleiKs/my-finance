import { CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Progress } from '@/app/_components/ui/progress'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import { TRANSACTION_CATEGORY_LABELS } from '@/app/_constants/transaction'
import { ExpensesTotalPerCategory } from '@/app/_data/dashboard'
import { formatCurrency } from '@/app/_utils/format-currency'

interface ExpensePerCategoryProps {
    expensesperCategory: ExpensesTotalPerCategory[]
}

export default function ExpensePerCategory({
    expensesperCategory,
}: ExpensePerCategoryProps) {
    return (
        <ScrollArea className="col-span-2 border rounded-lg h-full">
            <CardHeader>
                <CardTitle>Gastos por categoria</CardTitle>
            </CardHeader>
            <CardContent>
                {expensesperCategory.map((cat) => (
                    <div key={cat.category} className="py-3 space-y-1">
                        <p className="flex justify-between text-xs">
                            {TRANSACTION_CATEGORY_LABELS[cat.category]}
                            <span>{cat.percentageTotal}%</span>
                        </p>
                        <Progress value={cat.percentageTotal} />
                        <p className="text-xs text-muted-foreground">
                            {formatCurrency(cat.totalAmount)}
                        </p>
                    </div>
                ))}
            </CardContent>
        </ScrollArea>
    )
}
