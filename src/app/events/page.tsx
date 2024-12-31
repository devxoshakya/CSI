
"use client"
import { FollowingPointerDemo } from '@/components/shared/pointercard'
import Tiles from '@/components/shared/tiles'
import { div } from 'framer-motion/client'
import Upcoming from '@/components/shared/upcoming'

const tilesData = [
  {
    id: 1,
    imageUrl: '/g2.jpg',
    title: 'Tile 1',
    description: 'This is a description for Tile 1. It contains some information about the tile and what it represents. Click "Read More" to see the full description.',
  },
  {
    id: 2,
    imageUrl: '/g3.jpg',
    title: 'Tile 2',
    description: 'Here\'s the description for Tile 2. It provides details about the content of this tile. The description might be longer than what fits in the initial view.',
  },
  {
    id: 3,
    imageUrl: '/g5.jpg',
    title: 'Tile 3',
    description: 'Tile 3 description goes here. It gives an overview of what this tile is about. There might be more information available when expanding the description.',
  },
]

export default function events() {
  return (
    
     
    
    <main className="container mx-auto py-8">
        <Upcoming />
      <h1 className="text-3xl font-bold mb-6">Tile Gallery</h1>
       
      <Tiles tiles={tilesData} />
      </main>
      
  )
}

