import { dashboardData } from '@/app/_data/dashboard'
import SelectMonth from './_components/mouth-select'
import { SummaryCards } from './_components/summary-cards'
import { format, isMatch } from 'date-fns'

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
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between w-full items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <SelectMonth defaultValue={monthAtr} />
            </div>
            <SummaryCards
                depositTotal={data.depositTotal}
                investmentTotal={data.investmentTotal}
                expensesTotal={data.expensesTotal}
                balance={data.balance}
            />
        </div>
    )
}
