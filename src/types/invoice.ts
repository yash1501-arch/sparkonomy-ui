import { type LucideIcon } from 'lucide-react'

export interface TimeFilter {
    label: string
    value: string
    icon: LucideIcon | null
    pro: boolean
}

export interface OverviewItem {
    title: string
    amount: number
    currency: string
}

export interface MonthlyData {
    month: string
    year: number
    totalEarnings: number
    paymentAwaited: number
    paymentOverdue: number
    growthData: number | null
}

export interface Invoice {
    title: string
    amount: number
    currency: string
    date?: Date
    dueDate: Date
    status?:
        | 'paid'
        | 'unpaid'
        | 'partially paid'
        | 'disputed'
        | 'awaited'
        | 'overdue'
        | 'draft'
    notification?: number
}
