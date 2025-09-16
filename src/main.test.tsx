import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'

vi.mock('react-dom/client', () => ({
    createRoot: vi.fn().mockReturnValue({ render: vi.fn() }),
}))

vi.mock('@/App.tsx', () => ({ default: vi.fn(() => <div>Mock App</div>) }))
vi.mock('@/styles.css', () => ({}))

describe('main.tsx', () => {
    let mockGetElementById: ReturnType<typeof vi.fn>
    let mockCreateRoot: ReturnType<typeof vi.fn>

    beforeEach(() => {
        vi.clearAllMocks()

        // Mock document.getElementById
        mockGetElementById = vi
            .fn()
            .mockReturnValue(document.createElement('div'))
        document.getElementById = mockGetElementById
        mockCreateRoot = vi.mocked(createRoot)
    })

    it('renders App within StrictMode', async () => {
        await import('@/main.tsx')

        expect(mockGetElementById).toHaveBeenCalledWith('root')
        expect(mockCreateRoot).toHaveBeenCalled()

        const rootInstance = mockCreateRoot.mock.results[0].value
        const renderedContent = vi.mocked(rootInstance.render).mock.calls[0][0]

        expect(renderedContent.type).toBe(StrictMode)
        expect(renderedContent.props.children.type).toBe(App)
    })

    it('handles missing root element', async () => {
        mockGetElementById.mockReturnValue(null)
        await expect(import('@/main.tsx')).resolves.not.toThrow()
    })
})
