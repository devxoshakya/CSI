'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"

interface CenteredAnimatedTileProps {
  imageUrl: string
  title: string
  description: string
}

const CenteredAnimatedTile: React.FC<CenteredAnimatedTileProps> = ({ imageUrl, title, description }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div 
      className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative h-80 w-full"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-3xl"
        />
      </motion.div>
      <div className="p-8">
        <h2 className="font-bold text-3xl mb-4 text-gray-800">{title}</h2>
        <AnimatePresence initial={false}>
          <motion.div
            key={expanded ? 'expanded' : 'collapsed'}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={{
              expanded: { height: 'auto' },
              collapsed: { height: '3rem' }
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className={`text-lg text-gray-600 mb-6 ${expanded ? '' : 'line-clamp-2'}`}>
              {description}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center">
          <Button
            variant="link"
            onClick={() => setExpanded(!expanded)}
            className="p-0 h-auto font-semibold text-blue-600 text-lg"
          >
            {expanded ? 'Read Less' : 'Read More'}
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
            Register Now
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default CenteredAnimatedTile

