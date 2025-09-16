import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
    it('renders App Page heading', () => {
        render(<App />)
        const headingElement = screen.getByRole('heading', { level: 1 })
        expect(headingElement).toBeInTheDocument()
        expect(headingElement).toHaveTextContent('Sparkonomy UI')
    })
})
