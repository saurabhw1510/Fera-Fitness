import { Reveal } from "@/components/motion";
import { Button, ClosingCta, PageIntro, Photo } from "@/components/primitives";
import { pageMetadata } from "@/lib/metadata";
import { assets, programs } from "@/lib/site";

const description = "Explore mixed martial arts, strength and conditioning, and fitness foundations at FERA Fitness.";
export const metadata = pageMetadata("Training Programs | FERA FITNESS", description, "/training/");

export default function Training() {
  return <>
    <PageIntro label="Training programs" title="FIND YOUR" accent="FIGHT." description="Get on the mats, build strength or start with the fundamentals. Find a training focus that fits where you are today." image={assets.sparring} />
    <div className="container section program-list">
      {programs.map((program) => <section key={program.id} id={program.id} className="program-row">
        <Reveal className="photo-frame program-photo"><Photo asset={program.image} /></Reveal>
        <Reveal className="program-copy">
          <p className="eyebrow">{program.level}</p><h2 className="display section-title">{program.name}</h2>
          <p>{program.short}</p>
          <dl><div><dt>Training focus</dt><dd>{program.focus}</dd></div><div><dt>What you’ll build</dt><dd>{program.benefits}</dd></div></dl>
          <Button href={`/membership/?program=${encodeURIComponent(program.interest)}#inquiry`}>Ask about this program</Button>
        </Reveal>
      </section>)}
    </div>
    <ClosingCta headline="READY TO" accent="BEGIN?" />
  </>;
}
