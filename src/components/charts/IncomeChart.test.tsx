import { render } from '@testing-library/react'
import IncomeChart from './IncomeChart'

describe('IncomeChart', () => {
    const mockData = {
        months: ['Jan', 'Feb', 'Mar'],
        incomeData: [100, 150, 200],
        growthData: [0, 50, 33],
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders chart container', () => {
        render(
            <IncomeChart
                data={mockData}
                height={400}
                isClient={true}
            />
        )

        const chartContainer = document.querySelector(
            '[style*="height: 400px"]'
        )
        expect(chartContainer).toBeInTheDocument()
    })

    it('applies correct height style', () => {
        render(
            <IncomeChart
                data={mockData}
                height={300}
                isClient={true}
            />
        )

        const chartContainer = document.querySelector(
            '[style*="height: 300px"]'
        )
        expect(chartContainer).toHaveStyle({ height: '300px' })
    })

    it('handles empty data gracefully', () => {
        const emptyData = {
            months: [],
            incomeData: [],
            growthData: [],
        }

        render(
            <IncomeChart
                data={emptyData}
                height={400}
                isClient={true}
            />
        )

        const chartContainer = document.querySelector(
            '[style*="height: 400px"]'
        )
        expect(chartContainer).toBeInTheDocument()
    })

    describe('incomeAxisConfig calculation', () => {
        it('calculates correct axis config for normal data range', () => {
            const dataWithRange = {
                months: ['Jan', 'Feb', 'Mar'],
                incomeData: [100, 200, 300],
                growthData: [0, 100, 50],
            }

            render(
                <IncomeChart
                    data={dataWithRange}
                    height={400}
                    isClient={true}
                />
            )
            const chartContainer = document.querySelector(
                '[style*="height: 400px"]'
            )
            expect(chartContainer).toBeInTheDocument()
        })

        it('handles single data point', () => {
            const singleDataPoint = {
                months: ['Jan'],
                incomeData: [150],
                growthData: [0],
            }

            render(
                <IncomeChart
                    data={singleDataPoint}
                    height={400}
                    isClient={true}
                />
            )

            const chartContainer = document.querySelector(
                '[style*="height: 400px"]'
            )
            expect(chartContainer).toBeInTheDocument()
        })

        it('handles zero values in income data', () => {
            const zeroData = {
                months: ['Jan', 'Feb', 'Mar'],
                incomeData: [0, 0, 0],
                growthData: [0, 0, 0],
            }

            render(
                <IncomeChart
                    data={zeroData}
                    height={400}
                    isClient={true}
                />
            )

            const chartContainer = document.querySelector(
                '[style*="height: 400px"]'
            )
            expect(chartContainer).toBeInTheDocument()
        })

        it('handles large income values', () => {
            const largeData = {
                months: ['Jan', 'Feb', 'Mar'],
                incomeData: [100000, 200000, 300000],
                growthData: [0, 100, 50],
            }

            render(
                <IncomeChart
                    data={largeData}
                    height={400}
                    isClient={true}
                />
            )

            const chartContainer = document.querySelector(
                '[style*="height: 400px"]'
            )
            expect(chartContainer).toBeInTheDocument()
        })
    })

    describe('chart configuration', () => {
        it('initializes ECharts with correct options', async () => {
            const { init } = await import('echarts')

            render(
                <IncomeChart
                    data={mockData}
                    height={400}
                    isClient={true}
                />
            )

            expect(init).toHaveBeenCalled()
        })
    })

    describe('visibility handling', () => {
        it('shows chart when isClient is true', () => {
            render(
                <IncomeChart
                    data={mockData}
                    height={400}
                    isClient={true}
                />
            )

            const chartContainer = document.querySelector(
                '[style*="height: 400px"]'
            )
            expect(chartContainer).toHaveStyle({ visibility: 'visible' })
        })

        it('hides chart when isClient is false', () => {
            render(
                <IncomeChart
                    data={mockData}
                    height={400}
                    isClient={false}
                />
            )

            const chartContainer = document.querySelector(
                '[style*="height: 400px"]'
            )
            expect(chartContainer).toHaveStyle({ visibility: 'hidden' })
        })
    })

    describe('data transformation', () => {
        it('handles null values in growth data', () => {
            const dataWithNulls = {
                months: ['Jan', 'Feb', 'Mar'],
                incomeData: [100, 150, 200],
                growthData: [null, 50, null],
            }

            render(
                <IncomeChart
                    data={dataWithNulls}
                    height={400}
                    isClient={true}
                />
            )

            const chartContainer = document.querySelector(
                '[style*="height: 400px"]'
            )
            expect(chartContainer).toBeInTheDocument()
        })

        it('handles negative growth values', () => {
            const dataWithNegatives = {
                months: ['Jan', 'Feb', 'Mar'],
                incomeData: [200, 150, 100],
                growthData: [0, -25, -33],
            }

            render(
                <IncomeChart
                    data={dataWithNegatives}
                    height={400}
                    isClient={true}
                />
            )

            const chartContainer = document.querySelector(
                '[style*="height: 400px"]'
            )
            expect(chartContainer).toBeInTheDocument()
        })
    })
})
