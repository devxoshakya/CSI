

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedModalDemo } from './shared/login'

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="w-full ">
      <div className="max-w-7xl mx-auto px-4 border-b-2 border-gray-200">
        <div className="flex items-center justify-between h-16">
            <div className=' relative h-12 w-12'>
              <Link href="/">
               
                  <Image
                    src="/logo.png"
                    alt="CSI Logo"
                    fill
                    className="object-contain h-12 w-12"
                    sizes="(max-width: 768px) 48px, 48px"
                    priority
                  />
              </Link>
                
             
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Events', 'Tree', 'Team'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-600 hover:scale-110 px-3 py-2 text-sm font-medium transition-colors relative group"
              >
                {item}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-200 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
              </Link>
            ))}
           <AnimatedModalDemo/>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          {['Events', 'Tree', 'Team'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              {item}
            </Link>
          ))}
          <button  className="w-full text-left px-3 py-2 text-base font-medium text-white bg-[#000080] hover:bg-[#000060] rounded-md transition-colors">
            Login
          </button>
        </div>
      </motion.div>
    </nav>
  )
}

