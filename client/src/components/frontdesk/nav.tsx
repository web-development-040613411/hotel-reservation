'use client';
import { LogOut, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function Frontdesk_Nav() {
    return (
        <nav className="p-3 shadow-md">
            <div className="flex justify-between items-center">
                {/* Left side */}
                <div className="flex items-center">
                    { /* Logo 
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                           
                            <Search />
                        </span>
                        <input
                            className="bg-green-100 focus:bg-green-100 rounded-full py-2 pl-10 pr-4"
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                    */ }
                    LOGO
                </div>

                {/* Right side */}
                <div className="relative flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="rounded-full w-10 h-10 focus:ring focus:ring-black"
                            >
                                <Avatar className="w-10 h-10 ">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>FD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Front Desk</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                                    <span className="text-red-600">Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
