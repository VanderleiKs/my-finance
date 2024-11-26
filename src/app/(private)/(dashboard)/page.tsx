import { dashboardData } from '@/app/_data/dashboard'
import SelectMonth from './_components/mouth-select'
import { SummaryCards } from './_components/summary-cards'
import { format, isMatch } from 'date-fns'
import { TransactionPieChart } from './_components/transaction-pie-chart'
import ExpensePerCategory from './_components/expense-per-category'
import Lastransactions from './_components/last-transactions'

interface SearchParams {
    searchParams: Promise<{
        month?: string
    }>
}

export default async function Home(props: SearchParams) {
    const searchParams = await props.searchParams
    const monthAtr =
        searchParams.month && isMatch(searchParams.month, 'MM')
            ? searchParams.month
            : format(new Date(), 'MM')
    const data = await dashboardData(monthAtr)

    return (
        <div className="p-6 space-y-6 pb-6 flex h-full flex-col overflow-hidden">
            <div className="flex justify-between w-full items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <SelectMonth defaultValue={monthAtr} />
            </div>
            <div className="grid grid-cols-[2fr,1fr] gap-3 h-full overflow-hidden">
                <div className="flex flex-col space-y-6 gap-6 overflow-hidden">
                    <SummaryCards {...data} />
                    <div className="grid grid-cols-3 h-full grid-rows-1 gap-6 overflow-hidden">
                        <TransactionPieChart {...data} />
                        <ExpensePerCategory
                            expensesperCategory={data.expenseTotalPerCategory}
                        />
                    </div>
                </div>
                <Lastransactions lastTransactions={data.lastTransactions} />
            </div>
        </div>
    )
}
