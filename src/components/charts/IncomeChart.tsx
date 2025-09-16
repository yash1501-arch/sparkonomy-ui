import React, { useEffect, useRef, useMemo } from 'react'
import * as echarts from 'echarts'
import { tooltipFormatter } from '@/lib/utils'

export interface ChartData {
    months: string[]
    incomeData: number[]
    growthData: (number | null)[]
}

interface IncomeGrowthChartProps {
    data: ChartData
    height: number
    isClient: boolean
}

const IncomeGrowthChart: React.FC<IncomeGrowthChartProps> = ({
    data,
    height = 400,
    isClient = true,
}) => {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartInstance = useRef<echarts.ECharts | null>(null)

    const incomeAxisConfig = useMemo(() => {
        if (data.incomeData.length === 0) {
            return { max: 8000, min: 0, interval: 2000 }
        }

        const maxIncome = Math.max(...data.incomeData)
        const minIncome = Math.min(...data.incomeData)

        // Calculate range and determine appropriate scaling
        const range = maxIncome - minIncome
        const padding = Math.max(range * 0.1, 10)

        const paddedMin = Math.max(0, minIncome - padding)
        const paddedMax = maxIncome + padding

        const min = Math.floor(paddedMin / 10) * 10
        const max = Math.ceil(paddedMax / 10) * 10

        // Calculate appropriate interval
        const adjustedRange = max - min
        let interval

        if (adjustedRange <= 50) {
            interval = 10
        } else if (adjustedRange <= 100) {
            interval = 20
        } else if (adjustedRange <= 200) {
            interval = 25
        } else if (adjustedRange <= 500) {
            interval = 50
        } else if (adjustedRange <= 1000) {
            interval = 100
        } else {
            interval = Math.ceil(adjustedRange / 5 / 100) * 100
        }
        return { max, min, interval }
    }, [data.incomeData])

    useEffect(() => {
        if (!chartRef.current) return

        // Initialize chart
        chartInstance.current = echarts.init(chartRef.current)

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999',
                    },
                },
                formatter: tooltipFormatter,
            },
            legend: {
                data: ['income', 'momGrowth'],
                bottom: 10,
                itemStyle: {
                    borderWidth: 0,
                },
            },
            xAxis: [
                {
                    type: 'category',
                    data: data.months,
                    axisPointer: {
                        type: 'shadow',
                    },
                    axisLabel: {
                        color: '#666',
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#e0e0e0',
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Income',
                    position: 'left',
                    axisLabel: {
                        formatter: '${value}k',
                        color: '#666',
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#8b5cf6',
                        },
                    },
                    axisTick: {
                        show: true,
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#f0f0f0',
                        },
                    },
                    max: incomeAxisConfig.max,
                    min: incomeAxisConfig.min,
                    interval: incomeAxisConfig.interval,
                },
                {
                    type: 'value',
                    name: 'Growth %',
                    position: 'right',
                    axisLabel: {
                        formatter: '{value}%',
                        color: '#666',
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#dc2626',
                        },
                    },
                    axisTick: {
                        show: true,
                    },
                    splitLine: {
                        show: false,
                    },
                    max: 100,
                    min: -100,
                    interval: 50,
                },
            ],
            series: [
                {
                    name: 'income',
                    type: 'bar',
                    data: data.incomeData,
                    itemStyle: {
                        color: '#8b5cf6',
                        borderRadius: [4, 4, 0, 0],
                    },
                    barWidth: '40%',
                },
                {
                    name: 'momGrowth',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    data: data.growthData,
                    lineStyle: {
                        color: '#dc2626',
                        width: 3,
                    },
                    itemStyle: {
                        color: '#dc2626',
                        borderWidth: 2,
                        borderColor: '#ffffff',
                    },
                    symbol: 'circle',
                    symbolSize: 8,
                    connectNulls: false,
                },
            ],
            grid: {
                left: '10%',
                right: '10%',
                top: '15%',
                bottom: '15%',
            },
        }

        chartInstance.current.setOption(option)

        // Handle window resize
        const handleResize = () => {
            chartInstance.current?.resize()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chartInstance.current?.dispose()
        }
    }, [data, incomeAxisConfig])

    return (
        <div
            ref={chartRef}
            style={{
                width: '100%',
                height,
                visibility: isClient ? 'visible' : 'hidden',
            }}
        />
    )
}

export default IncomeGrowthChart
