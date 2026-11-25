"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { interests, experienceLevels } from "@/lib/site";
import { type Inquiry, inquiryUrl, validateInquiry } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./primitives";

const empty: Inquiry = { name: "", phone: "", interest: "", experience: "", message: "" };

export function InquiryForm({ defaultInterest = "" }: { defaultInterest?: string }) {
  const [values, setValues] = useState({ ...empty, interest: defaultInterest });
  const [errors, setErrors] = useState<ReturnType<typeof validateInquiry>>({});
  const [link, setLink] = useState("");
  const [attempted, setAttempted] = useState(false);
  const submitted = useRef(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("program");
    const matched = interests.find((item) => item === selected);
    if (matched) setValues((previous) => ({ ...previous, interest: previous.interest === defaultInterest ? matched : previous.interest }));
  }, [defaultInterest]);

  function change(field: keyof Inquiry, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (attempted) setErrors(validateInquiry(next));
    if (submitted.current) {
      submitted.current = false;
      setLink("");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted.current) return;
    setAttempted(true);
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      const input = form.current?.elements.namedItem(firstError);
      if (input instanceof HTMLElement) input.focus();
      return;
    }
    const destination = inquiryUrl(values);
    submitted.current = true;
    setLink(destination);
    window.open(destination, "_blank", "noopener,noreferrer");
  }

  function accessibility(field: keyof Inquiry) {
    return {
      id: `inquiry-${field}`, name: field,
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": errors[field] ? `error-${field}` : undefined,
    };
  }

  function error(field: keyof Inquiry) {
    return errors[field] && <span className="field-error" id={`error-${field}`}>{errors[field]}</span>;
  }

  return <form ref={form} className="inquiry-form" noValidate onSubmit={submit}>
    <div className="form-grid">
      <div className="field"><label htmlFor="inquiry-name">Full name</label>
        <input {...accessibility("name")} autoComplete="name" placeholder="Your name" required maxLength={100} value={values.name} onChange={(event) => change("name", event.target.value)} />
        {error("name")}
      </div>
      <div className="field"><label htmlFor="inquiry-phone">Phone number</label>
        <input {...accessibility("phone")} autoComplete="tel" type="tel" placeholder="+91" required maxLength={32} value={values.phone} onChange={(event) => change("phone", event.target.value)} />
        {error("phone")}
      </div>
      <div className="field"><label htmlFor="inquiry-interest">Interested in</label>
        <div className="select"><select {...accessibility("interest")} required value={values.interest} onChange={(event) => change("interest", event.target.value)}>
          <option value="">Choose a program</option>
          {interests.map((item) => <option key={item}>{item}</option>)}
        </select><ChevronDown size={16} aria-hidden="true" /></div>
        {error("interest")}
      </div>
      <div className="field"><label htmlFor="inquiry-experience">Experience level</label>
        <div className="select"><select {...accessibility("experience")} required value={values.experience} onChange={(event) => change("experience", event.target.value)}>
          <option value="">Choose your level</option>
          {experienceLevels.map((item) => <option key={item}>{item}</option>)}
        </select><ChevronDown size={16} aria-hidden="true" /></div>
        {error("experience")}
      </div>
      <div className="field field-wide"><label htmlFor="inquiry-message">Message <span>(optional)</span></label>
        <textarea {...accessibility("message")} rows={4} placeholder="Tell us what you’re working toward." maxLength={600} value={values.message} onChange={(event) => change("message", event.target.value)} />
      </div>
    </div>
    <button className="button button-primary form-submit" type="submit" disabled={Boolean(link)}><WhatsAppIcon size={19} /> Request your first session</button>
    <p className="form-note">Opens WhatsApp with your inquiry filled in.</p>
    <div aria-live="polite" aria-atomic="true">
      {link && <div className="form-feedback"><p>Your inquiry is ready. Send the WhatsApp message to complete your request.</p>
        <a className="button button-secondary" href={link} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>
      </div>}
    </div>
  </form>;
}
