import { Input } from '@/components/ui/input'
import { Search, Bell, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header: React.FC = () => {
    return (
        <div className="hidden md:flex items-center justify-between w-full px-4">
            <div className="flex items-center justify-center w-full max-w-md mx-auto">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders, invoices, payments..."
                        className="pl-10 pr-4 py-2 w-full rounded-full"
                    />
                </div>
            </div>
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full">
                    <Bell className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full">
                    <MessageSquare className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}

export default Header
