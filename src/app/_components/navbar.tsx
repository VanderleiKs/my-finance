'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from './ui/Button-sair'

export default function Navbar() {
    const pathname = usePathname()
    return (
        <nav className="flex justify-between border-b border-solid px-8 py-4">
            <div className="flex items-center gap-10">
                <Image
                    src="/logo.svg"
                    width={173}
                    height={39}
                    alt="My finance"
                />
                <Link
                    href="/"
                    className={
                        pathname === '/'
                            ? 'font-bold text-primary'
                            : 'text-muted-foreground'
                    }>
                    Dashboard
                </Link>
                <Link
                    href="/transactions"
                    className={
                        pathname === '/transactions'
                            ? 'font-bold text-primary'
                            : 'text-muted-foreground'
                    }>
                    Transactions
                </Link>
                <Link
                    href="/subscription"
                    className={
                        pathname === '/subscription'
                            ? 'font-bold text-primary'
                            : 'text-muted-foreground'
                    }>
                    Subscription
                </Link>
                <Link
                    href="/investiments"
                    className={
                        pathname === '/investiments'
                            ? 'font-bold text-primary'
                            : 'text-muted-foreground'
                    }>
                    investiments
                </Link>
            </div>
            <LogoutButton />
        </nav>
    )
}
