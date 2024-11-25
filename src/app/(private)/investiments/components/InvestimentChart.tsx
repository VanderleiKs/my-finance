/* import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

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

interface InvestmentChartsProps {
  investments: Investment[]
  returns: Return[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFA07A']

export default function InvestmentCharts({ investments, returns }: InvestmentChartsProps) {
  const investmentData = useMemo(() => {
    return investments.map(inv => ({
      name: inv.name,
      amount: inv.amount,
      type: inv.type,
      returns: returns
        .filter(ret => ret.investmentId === inv.id)
        .reduce((sum, ret) => sum + ret.amount, 0)
    }))
  }, [investments, returns])

  const totalInvestment = investmentData.reduce((sum, inv) => sum + inv.amount, 0)
  const totalReturns = investmentData.reduce((sum, inv) => sum + inv.returns, 0)

  const pieData = [
    { name: 'Total Investment', value: totalInvestment },
    { name: 'Total Returns', value: totalReturns }
  ]

  const investmentsByType = useMemo(() => {
    const typeMap = new Map<string, number>()
    investments.forEach(inv => {
      typeMap.set(inv.type, (typeMap.get(inv.type) || 0) + inv.amount)
    })
    return Array.from(typeMap, ([type, amount]) => ({ type, amount }))
  }, [investments])

  return (
    <div className="space-y-8">
      <div className="h-[400px]">
        <h3 className="text-lg font-semibold mb-4">Investments and Returns Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={investmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" name="Investment Amount" />
            <Bar dataKey="returns" fill="#82ca9d" name="Returns" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-[400px]">
        <h3 className="text-lg font-semibold mb-4">Total Investment vs Total Returns</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="h-[400px]">
        <h3 className="text-lg font-semibold mb-4">Investments by Type</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={investmentsByType}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="amount"
            >
              {investmentsByType.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
 */
