import {
    PiggyBankIcon,
    TrendingDown,
    TrendingUp,
    WalletIcon,
} from 'lucide-react'
import { SummaryCard } from './summary-card'

export interface DashboardData {
    depositTotal: number
    investmentTotal: number
    expensesTotal: number
    balance: number
}

export function SummaryCards(data: DashboardData) {
    return (
        <div>
            <div className="grid-flow-row grid-cols-2 col-span-2 space-y-6">
                <SummaryCard
                    amount={data.balance}
                    icon={<WalletIcon />}
                    size="large"
                    title="Saldo"
                />
                <div className="grid grid-cols-3 gap-3">
                    <SummaryCard
                        amount={data.investmentTotal}
                        icon={<PiggyBankIcon />}
                        title="Investimento"
                    />
                    <SummaryCard
                        amount={data.depositTotal}
                        icon={<TrendingUp className="text-primary font-bold" />}
                        title="Receita"
                    />
                    <SummaryCard
                        amount={data.expensesTotal}
                        icon={
                            <TrendingDown className="text-red-500 font-bold" />
                        }
                        title="Despesa"
                    />
                </div>
            </div>
        </div>
    )
}
