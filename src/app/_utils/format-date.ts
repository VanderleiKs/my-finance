export function formatDateBr(date: Date | string): string {
    const newDate = new Date(date)
    return Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(newDate)
}
