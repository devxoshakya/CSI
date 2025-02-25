import { Instagram, Linkedin, Twitter, PhoneIcon as WhatsApp } from "lucide-react"
import { FeedbackDialog } from "./FeedbackDialog"

const socialIcons = [
  { Icon: Instagram, href: "#" },
  { Icon: WhatsApp, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Linkedin, href: "#" },
]

export default function FeedBack() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Thank You for Attending!</h1>
        <p className="text-xl mb-6">
          We hope to see you at our next event. To get updates, please connect with us on our social media channels.
        </p>
        <div className="flex justify-center space-x-4">
          {socialIcons.map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
      <FeedbackDialog />
    </main>
  )
}

