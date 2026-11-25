import { Reveal } from "@/components/motion";
import { ClosingCta, PageIntro, Photo } from "@/components/primitives";
import { pageMetadata } from "@/lib/metadata";
import { assets, business } from "@/lib/site";

const description = "Discover the FERA Fitness philosophy of discipline, respect, strength and community.";
export const metadata = pageMetadata("About FERA | FERA FITNESS", description, "/about/", assets.mace);

const values = [
  ["Discipline", "Progress begins with showing up. Focus on the practice you can repeat, one session at a time."],
  ["Respect", "Listen, look after your training partners and give people room to learn at their own pace."],
  ["Strength", "Build the physical capacity to work hard and the patience to keep working on your weak points."],
  ["Community", "A good training partner makes the room better. Bring effort, share what you learn and help someone get started."],
  ["Confidence", "Get familiar with hard things in a space where you can ask questions, make mistakes and try again."],
  ["Transformation", "Notice the small changes first. More control in a drill, more strength in a lift and more trust in yourself."],
];

export default function About() {
  return <>
    <PageIntro label="About FERA" title="MORE THAN A GYM." accent="A DIFFERENT MINDSET." description="Strength, discipline and confidence are built through practice. At FERA, you build them together." image={assets.mace} />
    <section className="container section split about-story">
      <Reveal className="photo-frame"><Photo asset={assets.community} /></Reveal>
      <Reveal className="section-copy"><p className="eyebrow">Our philosophy</p><h2 className="display section-title">TRAIN WITH <span>PURPOSE.</span></h2>
        <p>{business.story || "Training asks you to be present. You learn to move well, stay composed and keep working through the parts that feel difficult. Those habits carry beyond the gym."}</p>
        <p>Whether it’s your first session or your hundredth, there’s always something to refine. The work starts with what you can do today.</p>
      </Reveal>
    </section>
    <section className="values-section section"><div className="container">
      <h2 className="display section-title">WHAT WE <span>PRACTICE.</span></h2>
      <div className="values-grid">{values.map(([title, copy]) => <Reveal key={title}><h3 className="display">{title}</h3><p>{copy}</p></Reveal>)}</div>
    </div></section>
    <ClosingCta />
  </>;
}
