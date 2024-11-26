import type { Metadata } from 'next'
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Navbar from '@/app/_components/navbar'
import '../globals.css'

export const metadata: Metadata = {
    title: 'Minhas finanças',
}

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="pt-BR">
                <body className={`antialiased dark`}>
                    <div className="flex flex-col h-full overflow-hidden">
                        <Navbar />
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}
