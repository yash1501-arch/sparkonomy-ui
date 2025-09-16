import { useState } from 'react'
import IncomeGrowthChart from '@/components/charts/IncomeChart'
import { CustomSelect } from '@/components/CustomSelect'
import { filterOptions, monthlyData } from '@/constants/invoiceConstants'
import type { MonthlyData, TimeFilter } from '@/types/invoice'

const ChartDemo: React.FC = () => {
    const [selectedFilter, setSelectedFilter] =
        useState<TimeFilter['value']>('6m')

    const getFilteredData = (): MonthlyData[] => {
        switch (selectedFilter) {
            case '1m':
                return monthlyData.slice(0, 1)
            case '3m':
                return monthlyData.slice(0, 3)
            case '6m':
                return monthlyData.slice(0, 6)
            case '12m':
                return monthlyData
            case 'custom':
                return monthlyData
            default:
                return monthlyData.slice(0, 6)
        }
    }

    const transformToChartData = (data: MonthlyData[]) => {
        const months = data.map(item => item.month.substring(0, 3))
        const incomeData = data.map(item =>
            Math.round(item.totalEarnings / 1000)
        )
        const growthData = data.map(item => item.growthData)

        return {
            months,
            incomeData,
            growthData,
        }
    }

    const filteredData = getFilteredData()
    const chartData = transformToChartData(filteredData)

    const getTimePeriodDescription = () => {
        switch (selectedFilter) {
            case '1m':
                return '1 month'
            case '3m':
                return '3 months'
            case '6m':
                return '6 months'
            case '12m':
                return '12 months'
            case 'custom':
                return 'selected period'
            default:
                return '6 months'
        }
    }

    return (
        <div className="border rounded-xl p-4 space-y-4">
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
                <div className="space-y-1">
                    <h3>Income Trend</h3>
                    <p className="text-sm">
                        Your monthly income and growth for the last{' '}
                        {getTimePeriodDescription()}.
                    </p>
                </div>
                <div className="ml-auto">
                    <CustomSelect
                        options={filterOptions}
                        value={selectedFilter}
                        onChange={setSelectedFilter}
                        placeholder="Select period"
                        className="w-[140px]"
                    />
                </div>
            </div>
            <IncomeGrowthChart
                data={chartData}
                height={450}
                isClient={true}
            />
        </div>
    )
}

export default ChartDemo
