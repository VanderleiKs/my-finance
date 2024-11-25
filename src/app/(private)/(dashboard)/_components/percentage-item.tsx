import { ReactNode } from 'react'

interface PercentageProps {
    title: string
    icon: ReactNode
    percentage: number
}
export default function PercentageItem({
    title,
    icon,
    percentage,
}: PercentageProps) {
    return (
        <div className="w-full flex justify-between items-center text-xs">
            <span className="flex gap-1">
                {icon}
                {title}
            </span>
            <span>{percentage}%</span>
        </div>
    )
}
