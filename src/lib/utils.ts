/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MonthlyData } from '@/types/invoice'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const generateMonthlyData = (): MonthlyData[] => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const baseData = months.map(month => ({
        month,
        year: 2025,
        totalEarnings: Math.floor(Math.random() * 20000) + 100000,
        paymentAwaited: Math.floor(Math.random() * 5000) + 20000,
        paymentOverdue: Math.floor(Math.random() * 3000) + 10000,
        growthData: null as number | null,
    }))

    return baseData.map((current, index) => {
        if (index === 0) {
            return { ...current, growthData: 0 }
        }
        const previousEarnings = baseData[index - 1].totalEarnings
        const currentEarnings = current.totalEarnings
        const growth = Math.round(
            ((currentEarnings - previousEarnings) / previousEarnings) * 100
        )

        return { ...current, growthData: growth }
    })
}

export const tooltipFormatter = (params: any) => {
    let result = `${params[0].name}<br/>`
    params.forEach((param: any) => {
        if (param.seriesName === 'income') {
            result += `${param.marker} ${param.seriesName}: $${param.value.toLocaleString()}k<br/>`
        } else if (param.value !== null) {
            result += `${param.marker} ${param.seriesName}: ${param.value > 0 ? '+' : ''}${param.value}%<br/>`
        }
    })
    return result
}
