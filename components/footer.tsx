import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";
import { business, mapsLink, navigation, programs } from "@/lib/site";
import { chatUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, Wordmark } from "./primitives";

export function ContactDetails() {
  return <dl className="contact-details">
    <div><dt><MapPin size={18} aria-hidden="true" /> Address</dt><dd>{business.address}</dd></div>
    <div><dt><Phone size={18} aria-hidden="true" /> Phone</dt><dd><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phone}</a></dd></div>
    <div><dt><WhatsAppIcon size={18} /> WhatsApp</dt><dd><a href={chatUrl} target="_blank" rel="noopener noreferrer">Chat with FERA</a></dd></div>
    {business.instagram && <div><dt><Instagram size={18} aria-hidden="true" /> Instagram</dt><dd><a href={business.instagram} target="_blank" rel="noopener noreferrer">Follow FERA</a></dd></div>}
    {business.email && <div><dt>Email</dt><dd><a href={`mailto:${business.email}`}>{business.email}</a></dd></div>}
    <div><dt>Opening hours</dt><dd>{business.hours.length ? business.hours.map((hours) => <div key={hours}>{hours}</div>) : "Ask us for the current training schedule."}</dd></div>
  </dl>;
}

export function Footer() {
  return <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div><Wordmark /><p className="footer-tagline">Train with purpose.</p></div>
        <div><h2>Explore</h2><ul>{navigation.map(({ label, href }) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></div>
        <div><h2>Training</h2><ul>{programs.map((program) => <li key={program.id}><Link href={`/training/#${program.id}`}>{program.name}</Link></li>)}</ul></div>
        <div><h2>Visit FERA</h2><a href={mapsLink} target="_blank" rel="noopener noreferrer">{business.address}</a><p><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phone}</a></p>
          <a href={chatUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          {business.instagram && <p><a href={business.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></p>}
        </div>
      </div>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} {business.name}</small><small>MMA · STRENGTH · CONDITIONING</small></div>
    </div>
  </footer>;
}
