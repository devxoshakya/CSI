"use client"

import { useEffect } from "react"
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa"
import Link from "next/link"

export default function SuccessPage() {
  useEffect(() => {
    // Clear the submission status from local storage after 5 minutes
    const timer = setTimeout(
      () => {
        localStorage.removeItem("formSubmitted")
      },
      5 * 60 * 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Application Submitted Successfully!</h1>
        <p className="text-lg mb-8">
          Thank you for your interest in joining CSI MIET. We'll review your application and get back to you soon.
        </p>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Follow us on social media:</h2>
          <div className="flex justify-center space-x-4">
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaFacebook size={24} />
            </Link>
          </div>
        </div>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  )
}

