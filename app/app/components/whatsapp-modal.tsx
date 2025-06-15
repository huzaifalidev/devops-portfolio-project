"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Phone, MessageSquare } from "lucide-react"

interface WhatsAppModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  phoneNumber: string
}

export default function WhatsAppModal({ open, onOpenChange, phoneNumber }: WhatsAppModalProps) {
  // Format phone number for display
  const formattedPhone = phoneNumber.replace(/^(\d{2})(\d{3})(\d{7})$/, "+$1 $2 $3")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </span>
            Contact via WhatsApp
          </DialogTitle>
          <DialogDescription>Send me a message directly through WhatsApp</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-500">
            <Phone className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium">{formattedPhone}</p>
          <p className="text-sm text-muted-foreground text-center">
            Click the button below to start a conversation with me on WhatsApp
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => window.open(`https://wa.me/${phoneNumber}`, "_blank")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Open WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

