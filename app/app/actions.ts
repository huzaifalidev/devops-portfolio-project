"use server"

// This file can be kept for other server actions if needed
// but we're not using it for the contact form anymore

export async function submitContactForm(formData: FormData) {
  // This function is no longer used
  // We're handling the form submission directly with EmailJS

  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  console.log("Form submission:", { name, email, message })

  return {
    message: "Thanks for your message! I'll get back to you soon.",
  }
}

