import type { NavItem } from '@/types/general'
import type { SelectOption } from '@/components/CustomSelect'
import { CreditCard, FileText, Layout, ShoppingCart } from 'lucide-react'

export const navItems: NavItem[] = [
    { title: 'Home', icon: Layout, href: '#' },
    { title: 'Invoice', icon: FileText, href: '#' },
    { title: 'Order', icon: ShoppingCart, href: '#' },
    { title: 'Payment', icon: CreditCard, href: '#' },
]

export const statusOptions: SelectOption[] = [
    { value: 'paid', label: 'Paid', disabled: false },
    { value: 'unpaid', label: 'Unpaid', disabled: false },
    { value: 'partially paid', label: 'Partially Paid', disabled: false },
    { value: 'disputed', label: 'Disputed', disabled: false },
    { value: 'awaited', label: 'Awaited', disabled: false },
    { value: 'overdue', label: 'Overdue', disabled: false },
    { value: 'draft', label: 'Draft', disabled: false },
]
