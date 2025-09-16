import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Rocket, Search, Bell, MessageSquare } from 'lucide-react'
import { navItems } from '@/constants/uiConstants'
import { Input } from '@/components/ui/input'

const Navbar: React.FC = () => {
    return (
        <div className="w-full p-4 bg-(--brand-p1)/20">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <a
                        href="#"
                        target="_self"
                        className="bg-(--brand-p1)/25 p-2.5 rounded-lg">
                        <Rocket
                            size={28}
                            className="text-(--brand-p3)"
                        />
                    </a>
                    {navItems.map(nItem => (
                        <div
                            key={nItem.title}
                            className="flex items-center justify-center gap-2 hover:bg-(--brand-p1)/25 transition-all duration-300 p-2 rounded-lg">
                            <nItem.icon className="text-black" />
                            <span className="font-normal text-xs text-black">
                                {nItem.title}
                            </span>
                        </div>
                    ))}
                </div>
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
                        <Bell className="h-5 w-5 text-black" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full">
                        <MessageSquare className="h-5 w-5 text-black" />
                    </Button>
                    <Avatar>
                        <AvatarImage
                            src="/avatar.jpg"
                            alt="Avatar Image"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            {/* Mobile Nav */}
            <div className="flex md:hidden items-center justify-between">
                <Button
                    variant="link"
                    className="gap-1 items-center text-black">
                    <ChevronLeft />
                    Back
                </Button>
                <h3 className="text-center font-medium text-black">
                    Dashboard
                </h3>
                <Avatar>
                    <AvatarImage
                        src="/avatar.jpg"
                        alt="Avatar Image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default Navbar
