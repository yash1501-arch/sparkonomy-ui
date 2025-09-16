import { generateMonthlyData } from '@/lib/utils'
import type { Invoice, MonthlyData, TimeFilter } from '@/types/invoice'
import { CalendarSearch } from 'lucide-react'

export const filterOptions: TimeFilter[] = [
    { label: '1 Month', value: '1m', icon: null, pro: false },
    { label: '3 Month', value: '3m', icon: null, pro: false },
    { label: '6 Month', value: '6m', icon: null, pro: false },
    { label: '1 Year', value: '12m', icon: null, pro: true },
    { label: 'Custom', value: 'custom', icon: CalendarSearch, pro: false },
]

export const monthlyData: MonthlyData[] = generateMonthlyData()

export const demoInvoices: Invoice[] = [
    {
        title: 'Website Design Project',
        amount: 2500,
        currency: 'USD',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notification: 1,
    },
    {
        title: 'Monthly SEO Services',
        amount: 1200,
        currency: 'USD',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'overdue',
        notification: 3,
    },
    {
        title: 'Mobile App Development',
        amount: 7500,
        currency: 'USD',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: 'unpaid',
        notification: 1,
    },
    {
        title: 'Social Media Campaign',
        amount: 1800,
        currency: 'USD',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
    {
        title: 'Consultation Services',
        amount: 950,
        currency: 'USD',
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'paid',
    },
    {
        title: 'Brand Identity Design',
        amount: 3200,
        currency: 'USD',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        status: 'partially paid',
    },
    {
        title: 'E-commerce Setup',
        amount: 4500,
        currency: 'USD',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'awaited',
        notification: 2,
    },
    {
        title: 'Content Writing Services',
        amount: 850,
        currency: 'USD',
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        status: 'draft',
    },
    {
        title: 'Logo Design Package',
        amount: 1500,
        currency: 'USD',
        dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        status: 'unpaid',
    },
    {
        title: 'Video Production',
        amount: 6800,
        currency: 'USD',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'awaited',
    },
    {
        title: 'Photography Session',
        amount: 2200,
        currency: 'USD',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'disputed',
        notification: 1,
    },
    {
        title: 'Marketing Strategy',
        amount: 2900,
        currency: 'USD',
        dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: 'overdue',
        notification: 5,
    },
]
