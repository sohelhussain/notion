"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (<header
        className={`sticky top-0 z-50 px-4 bg-white md:px-6 py-4 transition-all ${scrolled ? 'border-b border-gray-200 shadow-sm' : ''
            }`}
    >
        <div className="max-w-full">
            <nav className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/notion-fev-icon.png" alt="Notion logo" width={40} height={40} />
                        <span className="text-lg font-bold">Notion</span>
                    </Link>

                    {/* Main Nav */}
                    <div className="hidden md:flex md:ml-10 items-center space-x-1">
                        <NavItem text="Product" />
                        <NavItem text="Teams" />
                        <NavItem text="Individuals" />
                        <NavItem text="Download" />
                        <Link href="/pricing" className="px-3 py-2 text-sm font-medium hover:text-gray-900">
                            Pricing
                        </Link>
                    </div>
                </div>
                {/* Right Nav */}
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" className="hidden md:inline-flex font-medium">
                        Request a demo
                    </Button>
                    <Button variant="ghost" className="font-medium">
                        Log in
                    </Button>
                    <Button variant="default" className="bg-black hover:bg-gray-800 text-white font-medium">
                        Get Notion free
                    </Button>
                    <ModeToggle />
                </div>
            </nav>
        </div>
    </header>);
}


const NavItem = ({ text }: { text: string }) => {
    return (
        <div className="relative group">
            <button className="flex items-center px-3 py-2 text-sm font-medium hover:text-gray-900">
                {text}
                <ChevronDown size={16} className="ml-1" />
            </button>
            {/* You can add dropdown menu here if needed */}
        </div>
    );
};

export default Navbar;