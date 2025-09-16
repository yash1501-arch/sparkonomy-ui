import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
    it('renders button with text', () => {
        render(<Button>Click me</Button>)
        expect(
            screen.getByRole('button', { name: 'Click me' })
        ).toBeInTheDocument()
    })

    it('applies default variant and size classes', () => {
        render(<Button data-testid="button">Test</Button>)
        const button = screen.getByTestId('button')
        expect(button).toHaveClass(
            'bg-primary',
            'text-primary-foreground',
            'h-9',
            'px-4'
        )
    })

    it('applies custom variant classes', () => {
        render(
            <Button
                variant="destructive"
                data-testid="button">
                Delete
            </Button>
        )
        const button = screen.getByTestId('button')
        expect(button).toHaveClass('bg-destructive', 'text-white')
    })

    it('applies custom size classes', () => {
        render(
            <Button
                size="sm"
                data-testid="button">
                Small
            </Button>
        )
        const button = screen.getByTestId('button')
        expect(button).toHaveClass('h-8', 'px-3')
    })

    it('handles click events', () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click me</Button>)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
