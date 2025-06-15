"use client";

import emailjs from "@emailjs/browser";

export const sendEmail = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  const templateParams = {
    user_name: name, // Ensure these match your EmailJS template variables
    user_email: email,
    subject: subject,
    message: message,
  };

  try {
    // Send email using EmailJS
    const response = await emailjs.send(
      "service_jrwqqtr", // Your EmailJS Service ID
      "template_rofpor3", // Your EmailJS Template ID
      templateParams, 
      "EFBxk8w0oXZyIGHdQ" // Your EmailJS Public Key
    );

    console.log("Email sent successfully:", response);

    return {
      success: true,
      message: "Thanks for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Email sending failed:", error);

    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
};

