'use client'

import { PiggyBank, TrendingDown, TrendingUp } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import { Card, CardContent, CardFooter } from '@/app/_components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/app/_components/ui/chart'
import { DashboardData } from './summary-cards'
import { TransactionType } from '@prisma/client'
import { formatCurrency } from '@/app/_utils/format-currency'
import {
    NameType,
    ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import PercentageItem from './percentage-item'

const chartConfig = {
    [TransactionType.DEPOSIT]: {
        label: 'Receitas',
        color: '#55b92e',
    },
    [TransactionType.INVESTMENT]: {
        label: 'Investimentos',
        color: '#fff',
    },
    [TransactionType.EXPENSE]: {
        label: 'Despesas',
        color: '#e30903',
    },
} satisfies ChartConfig

export function TransactionPieChart(props: DashboardData) {
    const total =
        props.depositTotal + props.expensesTotal + props.investmentTotal
    const chartData = [
        {
            type: TransactionType.EXPENSE,
            total: props.expensesTotal,
            fill: '#e30903',
        },
        {
            type: TransactionType.INVESTMENT,
            total: props.investmentTotal,
            fill: '#fff',
        },
        {
            type: TransactionType.DEPOSIT,
            total: props.depositTotal,
            fill: '#55b92e',
        },
    ]

    function formatterTooltipChart(v: ValueType, n: NameType): string {
        return `${chartConfig[n as TransactionType].label}: ${formatCurrency(Number(v))}`
    }

    return (
        <Card className="flex flex-col p-6">
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    formatter={(v, n) =>
                                        formatterTooltipChart(v, n)
                                    }
                                />
                            }
                        />
                        <Pie
                            data={chartData}
                            dataKey="total"
                            nameKey="type"
                            innerRadius={60}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
                <PercentageItem
                    icon={<TrendingUp className="text-primary" size={14} />}
                    title="Receitas"
                    percentage={Math.round((props.depositTotal / total) * 100)}
                />
                <PercentageItem
                    icon={<PiggyBank className="text-white" size={14} />}
                    title="Investimentos"
                    percentage={Math.round(
                        (props.investmentTotal / total) * 100,
                    )}
                />
                <PercentageItem
                    icon={<TrendingDown className="text-red-500" size={14} />}
                    title="Despesas"
                    percentage={Math.round((props.expensesTotal / total) * 100)}
                />
            </CardFooter>
        </Card>
    )
}
