import { dashboardData } from '@/app/_data/dashboard'
import SelectMonth from './_components/mouth-select'
import { SummaryCards } from './_components/summary-cards'
import { format, isMatch } from 'date-fns'
import { TransactionPieChart } from './_components/transaction-pie-chart'
import ExpensePerCategory from './_components/expense-per-category'

interface SearchParams {
    searchParams: {
        month?: string
    }
}

export default async function Home({ searchParams }: SearchParams) {
    const monthAtr =
        searchParams.month && isMatch(searchParams.month, 'MM')
            ? searchParams.month
            : format(new Date(), 'MM')
    const data = await dashboardData(monthAtr)
    console.table(data.expenseTotalPerCategory)

    return (
        <div className="p-6 space-y-6 h-full">
            <div className="flex justify-between w-full items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <SelectMonth defaultValue={monthAtr} />
            </div>
            <div className="grid grid-cols-[2fr,1fr]">
                <div className="space-y-6">
                    <SummaryCards {...data} />
                    <div className="grid grid-cols-3 gap-3 h-80">
                        <TransactionPieChart {...data} />
                        <ExpensePerCategory
                            expensesperCategory={data.expenseTotalPerCategory}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
