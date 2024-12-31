'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface Tile {
  id: number
  imageUrl: string
  title: string
  description: string
}

interface TilesProps {
  tiles: Tile[]
}

const TileItem: React.FC<Tile> = ({ imageUrl, title, description }) => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className={`${expanded ? '' : 'line-clamp-3'} text-sm text-gray-600 mb-4`}>
          {description}
        </div>
        <div className="flex justify-between items-center">
          <Button
            variant="link"
            onClick={() => setExpanded(!expanded)}
            className="p-0 h-auto font-semibold text-blue-600"
          >
            {expanded ? 'Read Less' : 'Read More'}
          </Button>
          <Button>Register</Button>
        </div>
      </div>
    </div>
  )
}

const Tiles: React.FC<TilesProps> = ({ tiles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tiles.map((tile) => (
        <TileItem key={tile.id} {...tile} />
      ))}
    </div>
  )
}

export default Tiles

