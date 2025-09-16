import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

export interface SelectGroupOption {
    label?: string
    options: SelectOption[]
}

export interface CustomSelectProps {
    options: (SelectOption | SelectGroupOption)[]
    value?: string
    defaultValue?: string
    placeholder?: string
    className?: string
    triggerClassName?: string
    triggerIconClassName?: string
    contentClassName?: string
    onChange?: (value: string) => void
    disabled?: boolean
}

export function CustomSelect({
    options,
    value,
    defaultValue,
    placeholder = 'Select an option',
    className,
    triggerClassName,
    triggerIconClassName,
    contentClassName,
    onChange,
    disabled = false,
}: CustomSelectProps) {
    const renderOptions = () => {
        return options.map((option, index) => {
            if ('options' in option) {
                // Select Group
                return (
                    <SelectGroup key={`group-${index}`}>
                        {option.label && (
                            <SelectLabel>{option.label}</SelectLabel>
                        )}
                        {option.options.map(opt => (
                            <SelectItem
                                key={opt.value}
                                value={opt.value}
                                disabled={opt.disabled}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                )
            } else {
                // Single Select Option
                return (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}>
                        {option.label}
                    </SelectItem>
                )
            }
        })
    }

    return (
        <Select
            value={value}
            defaultValue={defaultValue}
            onValueChange={onChange}
            disabled={disabled}>
            <SelectTrigger
                className={cn('w-[180px]', triggerClassName, className)}
                iconClassName={triggerIconClassName}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={contentClassName}>
                {renderOptions()}
            </SelectContent>
        </Select>
    )
}
