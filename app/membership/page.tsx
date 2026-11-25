import { CalendarCheck, Dumbbell, Footprints } from "lucide-react";
import { InquiryForm } from "@/components/inquiry";
import { AskButton, Button, PageIntro } from "@/components/primitives";
import { pageMetadata } from "@/lib/metadata";
import { assets, business } from "@/lib/site";

const description = "Ask about FERA Fitness membership, program access and your first session.";
export const metadata = pageMetadata("Membership | FERA FITNESS", description, "/membership/", assets.strength);

export default function Membership() {
  return <>
    <PageIntro label="Membership" title="YOUR NEXT LEVEL" accent="STARTS HERE." description="Tell us what you want to work on. We’ll help you find a starting point and explain the membership options." image={assets.strength} />
    <div className="container section inquiry-layout">
      <section className="section-copy membership-info">
        <p className="eyebrow">Membership options</p>
        <h2 className="display section-title">FIND THE <span>RIGHT FIT.</span></h2>
        {business.membership.length ? <ul className="membership-options">{business.membership.map((option) => <li key={option}>{option}</li>)}</ul> : <p className="membership-prompt">Contact us for membership options</p>}
        <ul className="benefits">
          <li><Dumbbell aria-hidden="true" /><div><h3>Program access</h3><p>Ask which plans cover MMA, strength and conditioning, or fitness foundations.</p></div></li>
          <li><Footprints aria-hidden="true" /><div><h3>Beginner onboarding</h3><p>Share your experience and get guidance on where to start and what to bring.</p></div></li>
          <li><CalendarCheck aria-hidden="true" /><div><h3>First session</h3><p>Ask about trial availability and find a session that works for you.</p></div></li>
        </ul>
        <div className="actions"><Button href="/training/" kind="text">Explore training</Button>
          <AskButton message="Hi FERA FITNESS! Could you share your current membership options?">Ask about membership</AskButton></div>
      </section>
      <section className="form-panel" id="inquiry">
        <h2 className="display">REQUEST YOUR <span>FIRST SESSION.</span></h2>
        <p>Share a few details so we can help you get started.</p>
        <InquiryForm defaultInterest="Trial Session" />
      </section>
    </div>
  </>;
}
