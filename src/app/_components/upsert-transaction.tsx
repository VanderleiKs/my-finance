'use client'
import { Button } from '@/app/_components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/app/_components/ui/dialog'
import { Input } from '@/app/_components/ui/input'
import {
    TransactionCategory,
    TransactionPaymentMethod,
    TransactionType,
} from '@prisma/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import {
    OPTIONS_CATEGORY,
    OPTIONS_PAYMENT_METHOD,
    TRANSACTION_TYPE_OPTIONS,
} from '../_constants/transaction'
import { DatePicker } from './ui/date-picker'
import MoneyInput from './ui/maney-input'
import { addTransaction } from '../_actions/add-transaction'

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: 'O nome é obrigatório.',
    }),
    amount: z.number().positive({
        message: 'O valor é obrigatório.',
    }),
    type: z.nativeEnum(TransactionType, {
        required_error: 'O tipo é obrigatório.',
    }),
    category: z.nativeEnum(TransactionCategory, {
        required_error: 'A categoria é obrigatória.',
    }),
    paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
        required_error: 'O método de pagamento é obrigatório.',
    }),
    date: z.date({
        required_error: 'A data é obrigatória.',
    }),
})

type FormType = z.infer<typeof formSchema>

interface UpsertTransactionProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    transaction?: FormType
    transactionId?: string
}

export function UpsertTransaction({
    isOpen,
    setIsOpen,
    transaction,
    transactionId,
}: UpsertTransactionProps) {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: transaction ?? {
            name: '',
            amount: 0,
            category: TransactionCategory.OTHER,
            type: TransactionType.DEPOSIT,
            paymentMethod: TransactionPaymentMethod.OTHER,
            date: new Date(),
        },
    })

    function handleOnsubmit(formSubmit: FormType) {
        try {
            addTransaction({ ...formSubmit, id: transactionId })
            setIsOpen(false)
            form.reset()
        } catch {
            console.error('Erro ao enviar formulário.')
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open)
                if (!open) {
                    form.reset()
                }
            }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex justify-center text-2xl">
                        Adicionar Transação
                    </DialogTitle>
                    <DialogDescription className="flex justify-center">
                        Insira as informações abaixo
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleOnsubmit)}
                        className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        <MoneyInput
                                            placeholder="Digite o valor"
                                            value={field.value}
                                            onValueChange={({ floatValue }) =>
                                                field.onChange(floatValue)
                                            }
                                            onBlur={field.onBlur}
                                            disabled={field.disabled}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo da transação" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TRANSACTION_TYPE_OPTIONS.map(
                                                (t) => {
                                                    return (
                                                        <SelectItem
                                                            key={t.value}
                                                            value={t.value}>
                                                            {t.label}
                                                        </SelectItem>
                                                    )
                                                },
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a categoria da transação" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {OPTIONS_CATEGORY.map((c) => {
                                                return (
                                                    <SelectItem
                                                        key={c.value}
                                                        value={c.value}>
                                                        {c.label}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Metódo de pagamento</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o método da pagamento" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {OPTIONS_PAYMENT_METHOD.map((p) => {
                                                return (
                                                    <SelectItem
                                                        key={p.value}
                                                        value={p.value}>
                                                        {p.label}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
