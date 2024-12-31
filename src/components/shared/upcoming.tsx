'use client'

import CenteredAnimatedTile from '@/components/shared/centertile'

export default function upcoming({image, title, description}:any) {
  return (
    <main className="container mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">Featured Event</h1>
      <CenteredAnimatedTile 
        imageUrl={image}
        title={title}
        description={description}
      />
    </main>
  )
}

