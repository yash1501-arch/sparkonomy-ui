import '@testing-library/jest-dom'

// Mock ECharts to prevent DOM-related errors in tests
vi.mock('echarts', () => ({
    init: vi.fn(() => ({
        setOption: vi.fn(),
        resize: vi.fn(),
        dispose: vi.fn(),
    })),
}))

// Mock canvas methods that ECharts might use
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: vi.fn(() => ({
        clearRect: vi.fn(),
        fillRect: vi.fn(),
        strokeRect: vi.fn(),
        fillText: vi.fn(),
        measureText: vi.fn(() => ({ width: 0 })),
        setTransform: vi.fn(),
        drawImage: vi.fn(),
        save: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
        fill: vi.fn(),
    })),
})

// Mock devicePixelRatio
Object.defineProperty(window, 'devicePixelRatio', {
    value: 1,
    writable: true,
})
