import { useState } from 'react'
import { Crown } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { filterOptions, monthlyData } from '@/constants/invoiceConstants'
import type { MonthlyData, OverviewItem, TimeFilter } from '@/types/invoice'
import { cn } from '@/lib/utils'

const KeyOverview: React.FC = () => {
    const [selectedFilter, setSelectedFilter] =
        useState<TimeFilter['value']>('3m')
    const [filteredData, setFilteredData] = useState<MonthlyData[]>(
        monthlyData.slice(0, 3)
    )

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value)

        switch (value) {
            case '1m':
                setFilteredData(monthlyData.slice(0, 1))
                break
            case '3m':
                setFilteredData(monthlyData.slice(0, 3))
                break
            case '6m':
                setFilteredData(monthlyData.slice(0, 6))
                break
            case '12m':
                setFilteredData(monthlyData)
                break
            case 'custom':
                setFilteredData(monthlyData)
                break
            default:
                setFilteredData(monthlyData.slice(0, 3))
        }
    }

    const calculateTotals = () => {
        return filteredData.reduce(
            (acc, data) => ({
                totalEarnings: acc.totalEarnings + data.totalEarnings,
                paymentAwaited: acc.paymentAwaited + data.paymentAwaited,
                paymentOverdue: acc.paymentOverdue + data.paymentOverdue,
            }),
            { totalEarnings: 0, paymentAwaited: 0, paymentOverdue: 0 }
        )
    }

    const totals = calculateTotals()

    const overViews: OverviewItem[] = [
        {
            title: 'Total Earnings',
            amount: totals.totalEarnings,
            currency: 'USD',
        },
        {
            title: 'Payment Awaited',
            amount: totals.paymentAwaited,
            currency: 'USD',
        },
        {
            title: 'Payment Overdue',
            amount: totals.paymentOverdue,
            currency: 'USD',
        },
    ]

    const getDateRangeText = () => {
        if (filteredData.length === 0) return 'No data available'

        const firstMonth = filteredData[0]
        const lastMonth = filteredData[filteredData.length - 1]

        if (filteredData.length === 1) {
            return `${firstMonth.month} ${firstMonth.year}`
        }

        return `${firstMonth.month} ${firstMonth.year} - ${lastMonth.month} ${lastMonth.year}`
    }

    return (
        <>
            <div className="w-full border rounded-xl space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h3>Time Period</h3>
                    <p className="text-sm">{getDateRangeText()}</p>
                </div>
                <div className="flex justify-center">
                    <RadioGroup
                        value={selectedFilter}
                        onValueChange={handleFilterChange}
                        className="flex items-center gap-2 flex-wrap">
                        {filterOptions.map(op => (
                            <div
                                key={op.label}
                                className={cn(
                                    'flex items-center gap-3 border rounded-full px-2.5 py-1.5',
                                    op.value === selectedFilter
                                        ? 'bg-(--brand-p1)/10'
                                        : ''
                                )}>
                                <RadioGroupItem
                                    value={op.value}
                                    id={op.value}
                                    className="hidden"
                                />
                                <Label
                                    htmlFor={op.value}
                                    className={cn(
                                        'text-muted-foreground cursor-pointer',
                                        op.value === selectedFilter
                                            ? 'bg-gradient-to-b from-(--brand-p2) via-(--brand-p1) to-(--brand-p3) bg-clip-text text-transparent'
                                            : ''
                                    )}>
                                    {op.icon && (
                                        <op.icon
                                            className={cn(
                                                'size-4',
                                                op.value === selectedFilter
                                                    ? 'text-(--brand-p1)'
                                                    : ''
                                            )}
                                        />
                                    )}
                                    {op.label}
                                    {op.pro && (
                                        <Crown
                                            className={cn(
                                                'size-4',
                                                op.value === selectedFilter
                                                    ? 'text-(--brand-p1)'
                                                    : ''
                                            )}
                                        />
                                    )}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2">
                {overViews.map((ov, index) => (
                    <div
                        key={ov.title}
                        className={cn(
                            'border rounded-xl p-4 space-y-1.5',
                            index === 0 && 'col-span-2 lg:col-span-1'
                        )}>
                        <h3>{ov.title}</h3>
                        <p className="text-(--brand-p1)/80 text-xl font-bold">
                            {ov.amount.toLocaleString('en-US', {
                                style: 'currency',
                                currency: ov.currency,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default KeyOverview
