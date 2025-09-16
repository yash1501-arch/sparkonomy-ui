import { Bell, Pencil } from 'lucide-react'
import { CustomSelect } from '@/components/CustomSelect'
import { statusOptions } from '@/constants/uiConstants'
import type { Invoice } from '@/types/invoice'
import { cn } from '@/lib/utils'

export interface InvoiceCardProps {
    data: Invoice
}

const displayStatusBadge = (status: Invoice['status']) => {
    if (!status) return null

    const statusColors: Record<string, string> = {
        paid: 'bg-green-100 text-green-800',
        unpaid: 'bg-red-100 text-red-800',
        'partially paid': 'bg-yellow-100 text-yellow-800',
        disputed: 'bg-purple-100 text-purple-800',
        awaited: 'bg-blue-100 text-blue-800',
        overdue: 'bg-orange-100 text-orange-800',
        draft: 'bg-gray-100 text-gray-800',
    }

    const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800'

    return (
        <div className="flex items-center justify-end">
            <span
                className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium capitalize',
                    colorClass
                )}>
                {status}
            </span>
        </div>
    )
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-[60%_40%] border rounded-xl p-2">
            <div className="space-y-1 pl-2">
                <h3>{data.title}</h3>
                <p className="text-sm">
                    {data.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: data.currency,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}
                    , {new Date(data.dueDate).toISOString().split('T')[0]}
                </p>
            </div>
            <div className="flex items-center">
                <div className="w-2/3">
                    {data.status ? (
                        displayStatusBadge(data.status)
                    ) : (
                        <CustomSelect
                            options={statusOptions}
                            value={data.status}
                            placeholder="Update Status"
                            className="w-full rounded-full bg-(--brand-p1) gap-0 pl-3 pr-2"
                            triggerClassName="font-medium text-xs text-white data-[placeholder]:text-white"
                            triggerIconClassName="text-white opacity-100"
                        />
                    )}
                </div>
                <div className="w-1/3 flex justify-center gap-2">
                    <Pencil
                        className={cn(
                            'size-4',
                            data.status && data.status === 'draft'
                                ? ''
                                : 'hidden'
                        )}
                    />
                    <Bell
                        className={cn(
                            'size-4',
                            data.notification ? '' : 'hidden'
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default InvoiceCard
