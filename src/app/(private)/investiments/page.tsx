'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/_components/ui/button'
import InvestmentList from './components/InvestimentList'
/* import InvestmentCharts from './components/InvestimentChart' */
import AddInvestmentModal from './components/AddInvestmentModal'
import RecordReturnModal from './components/RecordModal'

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

export default function Home() {
    const [investments, setInvestments] = useState<Investment[]>([])
    const [returns, setReturns] = useState<Return[]>([])
    const [isAddInvestmentOpen, setIsAddInvestmentOpen] = useState(false)
    const [isRecordReturnOpen, setIsRecordReturnOpen] = useState(false)

    useEffect(() => {
        const savedInvestments = localStorage.getItem('investments')
        const savedReturns = localStorage.getItem('returns')
        if (savedInvestments) setInvestments(JSON.parse(savedInvestments))
        if (savedReturns) setReturns(JSON.parse(savedReturns))
    }, [])

    useEffect(() => {
        localStorage.setItem('investments', JSON.stringify(investments))
        localStorage.setItem('returns', JSON.stringify(returns))
    }, [investments, returns])

    const addInvestment = (investment: Omit<Investment, 'id'>) => {
        const newInvestment = { ...investment, id: Date.now() }
        setInvestments([...investments, newInvestment])
        setIsAddInvestmentOpen(false)
    }

    const deleteInvestment = (id: number) => {
        setInvestments(investments.filter((inv) => inv.id !== id))
        setReturns(returns.filter((ret) => ret.investmentId !== id))
    }

    const addReturn = (returnData: Omit<Return, 'id'>) => {
        const newReturn = { ...returnData, id: Date.now() }
        setReturns([...returns, newReturn])
        setIsRecordReturnOpen(false)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Investment Manager</h1>
            <div className="flex justify-between mb-6">
                <Button onClick={() => setIsAddInvestmentOpen(true)}>
                    Add New Investment
                </Button>
                <Button onClick={() => setIsRecordReturnOpen(true)}>
                    Record Return
                </Button>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Your Investments
                </h2>
                <InvestmentList
                    investments={investments}
                    returns={returns}
                    onDelete={deleteInvestment}
                />
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4">
                    Investment Analytics
                </h2>
                {/* <InvestmentCharts investments={investments} returns={returns} /> */}
            </div>
            <AddInvestmentModal
                isOpen={isAddInvestmentOpen}
                onClose={() => setIsAddInvestmentOpen(false)}
                onSubmit={addInvestment}
            />
            <RecordReturnModal
                isOpen={isRecordReturnOpen}
                onClose={() => setIsRecordReturnOpen(false)}
                onSubmit={addReturn}
                investments={investments}
            />
        </div>
    )
}
