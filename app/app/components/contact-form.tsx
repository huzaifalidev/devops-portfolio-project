"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!formRef.current) return

    setPending(true)

    try {
      const result = await emailjs.sendForm(
        "service_jrwqqtr", // Your EmailJS Service ID
        "template_rofpor3", // Your EmailJS Template ID
        formRef.current,
        "EFBxk8w0oXZyIGHdQ", // Your EmailJS Public Key
      )

      setMessage("Thanks for your message! I'll get back to you soon.")
      formRef.current.reset()
    } catch (error) {
      console.error("Error sending email:", error)
      setMessage("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="p-8 border border-muted shadow-lg">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="user_name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="user_name"
              name="user_name"
              placeholder="John Doe"
              className="h-12 border-muted focus:border-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="user_email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="user_email"
              name="user_email"
              type="email"
              placeholder="john@example.com"
              className="h-12 border-muted focus:border-primary"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            placeholder="Project Inquiry"
            className="h-12 border-muted focus:border-primary"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            className="min-h-32 border-muted focus:border-primary"
            required
          />
        </div>
        <Button type="submit" className="w-full h-12 rounded-full text-base font-medium" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && (
          <div
            className={`p-4 rounded-lg ${message.includes("Thanks") ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
          >
            <p className="text-sm text-center">{message}</p>
          </div>
        )}
      </form>
    </Card>
  )
}

