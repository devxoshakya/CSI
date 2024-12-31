'use client'

import CenteredAnimatedTile from '@/components/shared/centertile'

export default function upcoming() {
  return (
    <main className="container mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">Featured Event</h1>
      <CenteredAnimatedTile 
        imageUrl="/placeholder.svg?height=400&width=800"
        title="Exclusive Tech Conference 2024"
        description="Join us for an extraordinary tech conference that brings together industry leaders, innovators, and tech enthusiasts from around the globe. Experience cutting-edge presentations, hands-on workshops, and unparalleled networking opportunities. Our event covers a wide range of topics including AI, blockchain, cybersecurity, and more. Whether you're a seasoned professional or just starting your tech journey, this conference offers invaluable insights and connections to propel your career forward. Don't miss this chance to be part of the future of technology!"
      />
    </main>
  )
}

