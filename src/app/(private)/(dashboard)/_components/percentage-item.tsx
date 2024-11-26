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
            <span className="flex items-center gap-2">
                <div className="bg-white bg-opacity-[3%] rounded-lg p-2">
                    {icon}
                </div>
                {title}
            </span>
            <span>{percentage}%</span>
        </div>
    )
}
