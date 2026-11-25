import { Reveal } from "@/components/motion";
import { AskButton, ClosingCta, PageIntro, Photo } from "@/components/primitives";
import { pageMetadata } from "@/lib/metadata";
import { assets, business } from "@/lib/site";

const description = "Get in touch with the FERA coaching team and ask about training at FERA Fitness.";
export const metadata = pageMetadata("Coaches | FERA FITNESS", description, "/coaches/");

export default function Coaches() {
  return <>
    <PageIntro label="Our coaches" title="LEARN FROM THE FIGHTERS." accent="TRAIN WITH THE COACHES." description="Speak with the FERA team about your goals, experience and what to expect from your first session." image={assets.sparring} />
    <section className="container section coaching">
      {business.coaches.length ? business.coaches.map((coach) => <article className="program-row" key={coach.name}>
        {coach.portrait && <Reveal className="photo-frame program-photo"><Photo asset={coach.portrait} /></Reveal>}
        <div className="program-copy">
          <p className="eyebrow">{coach.specialty}</p><h2 className="display section-title">{coach.name}</h2>
          {coach.philosophy && <p>{coach.philosophy}</p>}
          <dl>
            {coach.experience && <div><dt>Experience</dt><dd>{coach.experience}</dd></div>}
            {coach.certifications?.length ? <div><dt>Certifications</dt><dd>{coach.certifications.join(", ")}</dd></div> : null}
            {coach.achievements?.length ? <div><dt>Achievements</dt><dd>{coach.achievements.join(", ")}</dd></div> : null}
          </dl>
        </div>
      </article>) : <div className="coaching-intro">
        <h2 className="display section-title">MEET THE <span>TEAM.</span></h2>
        <div><p>Coach profiles are coming soon. In the meantime, ask the team who leads the sessions you’re interested in and how to prepare.</p>
          <AskButton message="Hi FERA FITNESS! I’d like to learn about your coaches and sessions.">Ask the coaching team</AskButton></div>
      </div>}
    </section>
    <ClosingCta />
  </>;
}
