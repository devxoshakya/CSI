import React from 'react'
import { Twitter, Linkedin, Instagram, Github, Youtube, Facebook } from 'lucide-react'

interface SocialLink {
  name: string
  href: string
  icon: React.ElementType
}

const socialLinks: SocialLink[] = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
]

const SocialFooter: React.FC = () => {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Connect With Us</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform duration-300 hover:scale-110"
                aria-label={link.name}
              >
                <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <link.icon className="w-6 h-6 text-gray-800" />
                </div>
              </a>
            ))}
          </div>
          <p className="text-white text-sm mt-6">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SocialFooter

