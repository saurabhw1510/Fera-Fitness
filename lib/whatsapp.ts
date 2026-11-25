import { business, experienceLevels, interests } from "./site";

export type Inquiry = {
  name: string;
  phone: string;
  interest: string;
  experience: string;
  message: string;
};

export function whatsAppUrl(message: string) {
  return `https://wa.me/${business.ownerWhatsApp}?text=${encodeURIComponent(message)}`;
}

export const chatUrl = whatsAppUrl("Hi FERA FITNESS! I'm interested in learning more about your training programs.");

export function validateInquiry(inquiry: Inquiry) {
  const errors: Partial<Record<keyof Inquiry, string>> = {};
  if (!inquiry.name.trim()) errors.name = "Enter your full name.";
  const digits = inquiry.phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(inquiry.phone.trim()) || digits.length < 10 || digits.length > 15 || /^0+$/.test(digits)) {
    errors.phone = "Enter a valid phone number with 10–15 digits.";
  }
  if (!interests.some((item) => item === inquiry.interest)) errors.interest = "Choose a program.";
  if (!experienceLevels.some((item) => item === inquiry.experience)) errors.experience = "Choose your experience level.";
  return errors;
}

export function inquiryUrl(inquiry: Inquiry) {
  return whatsAppUrl([
    "🥊 NEW FERA FITNESS LEAD",
    "A new person is interested in training at FERA FITNESS.",
    `Name: ${inquiry.name.trim()}`,
    `Phone: ${inquiry.phone.trim()}`,
    `Interested in: ${inquiry.interest}`,
    `Experience level: ${inquiry.experience}`,
    ...(inquiry.message.trim() ? [`Message: ${inquiry.message.trim()}`] : []),
    "Source: FERA FITNESS Website",
    "Please contact this person regarding their training inquiry.",
  ].join("\n\n"));
}
