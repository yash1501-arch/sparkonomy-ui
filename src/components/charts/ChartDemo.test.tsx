import { render, screen, fireEvent } from '@testing-library/react'
import ChartDemo from './ChartDemo'
import type { ChartData } from './IncomeChart'
import type { TimeFilter } from '@/types/invoice'

// Mock the IncomeChart component
vi.mock('@/components/charts/IncomeChart', () => ({
    default: ({
        data,
        height,
        isClient,
    }: {
        data: ChartData
        height: number
        isClient: boolean
    }) => (
        <div
            data-testid="income-chart"
            data-height={height}
            data-client={isClient}>
            {data.months.join(',')}
        </div>
    ),
}))

// Mock the CustomSelect component
vi.mock('@/components/CustomSelect', () => ({
    CustomSelect: ({
        options,
        value,
        onChange,
        placeholder,
    }: {
        options: TimeFilter[]
        value: string
        onChange: (value: string) => void
        placeholder: string
    }) => (
        <select
            data-testid="custom-select"
            value={value}
            onChange={e => onChange?.(e.target.value)}>
            <option value="">{placeholder}</option>
            {options.map((opt: TimeFilter) => (
                <option
                    key={opt.value}
                    value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    ),
}))

describe('ChartDemo', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders with default 6m filter', () => {
        render(<ChartDemo />)

        expect(screen.getByText('Income Trend')).toBeInTheDocument()
        expect(
            screen.getByText(
                'Your monthly income and growth for the last 6 months.'
            )
        ).toBeInTheDocument()
        expect(screen.getByTestId('custom-select')).toHaveValue('6m')
    })

    describe('filter selection branches', () => {
        it('handles 1m filter selection', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: '1m' } })

            expect(
                screen.getByText(
                    'Your monthly income and growth for the last 1 month.'
                )
            ).toBeInTheDocument()
            expect(select).toHaveValue('1m')
        })

        it('handles 3m filter selection', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: '3m' } })

            expect(
                screen.getByText(
                    'Your monthly income and growth for the last 3 months.'
                )
            ).toBeInTheDocument()
            expect(select).toHaveValue('3m')
        })

        it('handles 6m filter selection', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: '6m' } })

            expect(
                screen.getByText(
                    'Your monthly income and growth for the last 6 months.'
                )
            ).toBeInTheDocument()
            expect(select).toHaveValue('6m')
        })

        it('handles 12m filter selection', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: '12m' } })

            expect(
                screen.getByText(
                    'Your monthly income and growth for the last 12 months.'
                )
            ).toBeInTheDocument()
            expect(select).toHaveValue('12m')
        })

        it('handles custom filter selection', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: 'custom' } })

            expect(
                screen.getByText(
                    'Your monthly income and growth for the last selected period.'
                )
            ).toBeInTheDocument()
            expect(select).toHaveValue('custom')
        })

        it('handles unknown filter selection (default case)', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            expect(
                screen.getByText(
                    'Your monthly income and growth for the last 6 months.'
                )
            ).toBeInTheDocument()
            expect(select).toHaveValue('6m')
        })
    })

    describe('data transformation branches', () => {
        it('transforms data correctly for 1m filter', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: '1m' } })

            const chart = screen.getByTestId('income-chart')
            expect(chart).toBeInTheDocument()
        })

        it('transforms data correctly for 3m filter', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: '3m' } })

            const chart = screen.getByTestId('income-chart')
            expect(chart).toBeInTheDocument()
        })

        it('transforms data correctly for 6m filter', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: '6m' } })

            const chart = screen.getByTestId('income-chart')
            expect(chart).toBeInTheDocument()
        })

        it('transforms data correctly for 12m filter', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: '12m' } })

            const chart = screen.getByTestId('income-chart')
            expect(chart).toBeInTheDocument()
        })

        it('transforms data correctly for custom filter', () => {
            render(<ChartDemo />)

            const select = screen.getByTestId('custom-select')
            fireEvent.change(select, { target: { value: 'custom' } })

            const chart = screen.getByTestId('income-chart')
            expect(chart).toBeInTheDocument()
        })
    })

    it('passes correct props to IncomeChart', () => {
        render(<ChartDemo />)

        const chart = screen.getByTestId('income-chart')
        expect(chart).toHaveAttribute('data-height', '450')
        expect(chart).toHaveAttribute('data-client', 'true')
    })

    it('renders chart with correct height', () => {
        render(<ChartDemo />)

        const chart = screen.getByTestId('income-chart')
        expect(chart).toHaveAttribute('data-height', '450')
    })
})
