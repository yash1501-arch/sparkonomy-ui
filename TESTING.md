# Testing Guide

## Overview

The project uses **Vitest 3.2.4** for unit testing with **React Testing Library 16.3.0** for component testing. Tests are configured with V8 coverage reporting and strict 80% thresholds across all metrics.

## Test Stack

- **Test Runner**: Vitest with jsdom environment
- **Component Testing**: React Testing Library
- **Coverage**: V8 coverage with HTML and JSON reports
- **Mocking**: Vitest's built-in `vi` mocking capabilities
- **Environment**: JSDOM for DOM simulation

## Running Tests

```bash
# Run tests in watch mode (development)
npm run test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm run test src/App.test.tsx

# Run tests matching pattern
npm run test -- --grep "Chart"

# Run tests in specific directory
npm run test src/components/charts/
```

## Test Scripts

| Script                  | Description                    |
| ----------------------- | ------------------------------ |
| `npm run test`          | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:run`      | Run tests once (CI mode)       |

## Coverage Configuration

### Thresholds (Required)

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### Included Files

- All TypeScript files in `src/`
- React components and utilities
- Chart components and logic

### Excluded Files

- Test files (`*.test.ts`, `*.spec.ts`)
- Setup files (`setupTests.ts`)
- Type definitions (`*.d.ts`)
- Constants and interfaces (`src/**/constants/**`, `src/**/types/**`)
- Build artifacts (`coverage/`, `dist/`, `node_modules/`)

## Current Test Coverage

### ✅ Tested Components

- `App` - Main application component
- `IncomeChart` - ECharts integration with comprehensive testing
- `ChartDemo` - Chart filtering and data transformation
- `Button` - UI component with variants and interactions
- `Avatar` - UI component with fallback handling
- `main.tsx` - Application entry point

### 📂 Components Needing Tests

- `KeyOverview` - Complex filtering logic and calculations
- `CustomSelect` - Reusable select component
- `InvoiceCard` - Invoice display with status management
- `Header` - Navigation header component
- `Navbar` - Side navigation component
- `Footer` - Application footer
- `InvoiceContainer` - Invoice management container

### 📊 Current Status

- **Branch Coverage**: 17.7% (needs improvement)
- **Test Files**: 6 files covering core functionality
- **Priority**: Focus on components with complex logic

## Writing Tests

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders correctly', () => {
        render(<MyComponent title="Test" />)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('handles user interactions', () => {
        const handleClick = vi.fn()
        render(<MyComponent onClick={handleClick} />)

        fireEvent.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalledOnce()
    })
})
```

### Mocking External Dependencies

```typescript
import { vi } from 'vitest'

// Mock ECharts (already configured in setupTests.ts)
vi.mock('echarts', () => ({
    init: vi.fn(() => ({
        setOption: vi.fn(),
        resize: vi.fn(),
        dispose: vi.fn(),
    })),
}))

// Mock custom components
vi.mock('@/components/CustomSelect', () => ({
    CustomSelect: ({ options, value, onChange }: any) => (
        <select value={value} onChange={(e) => onChange?.(e.target.value)}>
            {options.map((opt: any) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    ),
}))
```

### Testing Chart Components

```typescript
// Example: Testing chart data transformation
describe('ChartDemo', () => {
    it('transforms data correctly for different filters', () => {
        render(<ChartDemo />)

        const select = screen.getByTestId('custom-select')
        fireEvent.change(select, { target: { value: '1m' } })

        expect(screen.getByText('Your monthly income and growth for the last 1 month.')).toBeInTheDocument()
    })
})
```

### Testing Utility Functions

```typescript
import { describe, it, expect } from 'vitest'
import { generateMonthlyData, tooltipFormatter } from '@/lib/utils'

describe('generateMonthlyData', () => {
    it('generates correct number of months', () => {
        const data = generateMonthlyData()
        expect(data).toHaveLength(12)
    })

    it('calculates growth data correctly', () => {
        const data = generateMonthlyData()
        expect(data[0].growthData).toBe(0) // First month should be 0
    })
})
```

## Test Structure

```bash
src/
├── components/              # Core UI and feature components
│ ├── charts/                # Chart components and their tests
│ │ ├── IncomeChart.tsx
│ │ ├── IncomeChart.test.tsx ✅
│ │ ├── ChartDemo.tsx
│ │ └── ChartDemo.test.tsx   ✅
│ ├── ui/                    # Reusable UI primitives
│ │ ├── button.tsx
│ │ ├── button.test.tsx      ✅
│ │ ├── avatar.tsx
│ │ └── avatar.test.tsx      ✅
│ ├── KeyOverview.tsx        # Financial overview section (tests pending)
│ ├── CustomSelect.tsx       # Reusable select dropdown (tests pending)
│ └── InvoiceCard.tsx        # Invoice display component (tests missing)
├── lib/                     # Utilities and helpers
│ ├── utils.ts               # Utility functions
│ └── utils.test.ts          # (needed)
├── layout/                  # Page layout components
│ ├── Header.tsx             # Top header (tests pending)
│ ├── Navbar.tsx             # Navigation bar (tests pending)
│ └── Footer.tsx             # Footer section (tests missing)
├── App.tsx                  # Root app component
├── App.test.tsx             ✅
├── main.tsx                 # Entry point
├── main.test.tsx            ✅
└── setupTests.ts            # Global test setup
```

## Best Practices

### ✅ Do

- Test **behavior**, not implementation details
- Use **semantic queries** (`getByRole`, `getByLabelText`, `getByTestId`)
- Test **user interactions** and outcomes
- Mock **external dependencies** (ECharts, APIs, etc.)
- Keep tests **focused** and **isolated**
- Test **edge cases** (empty data, null values, error states)
- Use `beforeEach` to clear mocks between tests
- Test **branch coverage** for conditional logic

### ❌ Don't

- Test implementation details or internal state
- Test third-party libraries directly
- Write overly complex tests
- Skip error cases and edge cases
- Forget to mock external dependencies
- Test multiple behaviors in one test case

## ECharts Testing Setup

The project includes comprehensive ECharts mocking in `setupTests.ts`:

```typescript
// Mock ECharts to prevent DOM-related errors
vi.mock('echarts', () => ({
    init: vi.fn(() => ({
        setOption: vi.fn(),
        resize: vi.fn(),
        dispose: vi.fn(),
    })),
}))

// Mock canvas methods
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: vi.fn(() => ({
        clearRect: vi.fn(),
        fillRect: vi.fn(),
        // ... other canvas methods
    })),
})
```

## Coverage Reports

After running `npm run test:coverage`:

```bash
# View HTML coverage report
open coverage/index.html
```

The report shows:

- **File-by-file coverage** with line-by-line highlighting
- **Coverage trends** and missing areas
- **Branch coverage** details
- **Function and statement coverage**

## Priority Testing Tasks

### High Priority

1. **KeyOverview component** - Complex filtering and calculation logic
2. **CustomSelect component** - Reusable component used throughout app
3. **Utility functions** - `generateMonthlyData`, `tooltipFormatter`, etc.

### Medium Priority

4. **InvoiceCard component** - Status management and display logic
5. **Layout components** - Header, Navbar, Footer
6. **Integration tests** - Component interactions

### Low Priority

7. **Type definitions** - Already excluded from coverage
8. **Constants** - Already excluded from coverage

## Troubleshooting

### Common Issues

**Tests not running:**

- Ensure test files end with `.test.ts` or `.spec.ts`
- Check `setupTests.ts` configuration
- Verify all dependencies are installed

**Coverage failures:**

- Review coverage thresholds in `vite.config.ts`
- Check excluded files configuration
- Add tests for uncovered code paths

**ECharts/DOM errors:**

- Ensure ECharts mocking is properly configured
- Check canvas and devicePixelRatio mocks
- Verify JSDOM environment setup

**Mock issues:**

- Set up mocks before imports
- Use `vi.clearAllMocks()` in `beforeEach`
- Check mock return values and implementations

**Type errors:**

- Verify `tsconfig.app.json` includes test types
- Check `@testing-library/jest-dom` types
- Ensure Vitest globals are configured

## Next Steps

1. **Add missing component tests** to improve branch coverage
2. **Focus on complex logic** in KeyOverview and CustomSelect
3. **Test utility functions** for complete coverage
4. **Add integration tests** for component interactions
5. **Monitor coverage trends** and maintain 80% thresholds
