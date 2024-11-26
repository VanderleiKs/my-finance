'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/ui/select'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const months = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
]

export default function SelectMonth(props: { defaultValue: string }) {
    const router = useRouter()

    useEffect(() => {
        // Chama a navegação uma vez que o componente tenha sido montado

        router.push(`/?month=${props.defaultValue}`)
    }, []) // Só executa uma vez após a montagem do componente

    function onChangeSelect(month: string) {
        router.push(`?month=${month}`)
    }

    return (
        <Select
            onValueChange={onChangeSelect}
            defaultValue={props.defaultValue}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
                {months.map((m) => {
                    return (
                        <SelectItem key={m.value} value={m.value}>
                            {m.label}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}
