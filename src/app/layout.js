import Navbar from '@/app/components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pathfinder',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <header>
              <Navbar />
            </header>
            {children}
        </body>
    </html>
  )
}
