import { ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import { ContactDetails } from "@/components/footer";
import { HeroMedia, Reveal } from "@/components/motion";
import { Button, ClosingCta, Photo } from "@/components/primitives";
import { pageMetadata } from "@/lib/metadata";
import { assets, business, mapsLink, programs } from "@/lib/site";

export const metadata = pageMetadata(
  "FERA FITNESS | MMA, Combat Training & Fitness",
  "Train with purpose. Build strength, confidence, and discipline at FERA FITNESS. Discover combat sports and fitness training.", "/",
);

export default function Home() {
  const localBusiness = {
    "@context": "https://schema.org", "@type": "ExerciseGym", name: business.name,
    telephone: business.phone, hasMap: mapsLink, address: {
      "@type": "PostalAddress", streetAddress: business.address, addressCountry: "IN",
    },
    ...(business.canonicalOrigin ? { url: business.canonicalOrigin } : {}),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }} />
    <section className="hero">
      <HeroMedia video={business.heroVideo} poster={assets.hero.src}>
        <Photo id="home-hero-poster" asset={assets.hero} eager sizes="100vw" />
      </HeroMedia>
      <div className="hero-wash" />
      <div className="hero-grain" />
      <div className="hero-slashes" aria-hidden="true"><i /><i /></div>
      <div className="container hero-content">
        <p className="eyebrow hero-kicker">FERA FITNESS <span>MMA · STRENGTH · CONDITIONING</span></p>
        <h1 className="display hero-title"><span>BUILT THROUGH</span><span>DISCIPLINE.</span><span>DEFINED BY FIGHT.</span></h1>
        <p className="hero-copy">Train with purpose. Build strength, confidence, and discipline. Discover what you’re capable of.</p>
        <div className="actions"><Button href="/membership/#inquiry">Start your training</Button><Button href="#about-fera" kind="secondary">Explore FERA</Button></div>
      </div>
      <div className="hero-bottom container">
        <a className="scroll-link" href="#about-fera"><ChevronDown size={17} aria-hidden="true" /> Scroll to explore</a>
        <Link href="/contact/" className="hero-location"><MapPin size={16} aria-hidden="true" /> {business.locality}</Link>
      </div>
    </section>

    <section className="container section split" id="about-fera">
      <Reveal className="section-copy">
        <p className="eyebrow">The FERA philosophy</p>
        <h2 className="display section-title">NOT JUST TRAINING.<br /><span>A TRANSFORMATION.</span></h2>
        <p>What you build here goes beyond the gym. Every session is a chance to get stronger, practice discipline and build the confidence to take on a harder round.</p>
        <p>On the mats and in the weight room, we train with respect, share the work and make room for people at every stage.</p>
        <Button href="/about/" kind="text">About FERA</Button>
      </Reveal>
      <Reveal className="intro-visual"><div className="photo-frame"><Photo asset={assets.mace} /></div></Reveal>
    </section>

    <section className="section training-home">
      <div className="container">
        <Reveal className="section-head"><div><p className="eyebrow">Training disciplines</p><h2 className="display section-title">FIND YOUR <span>FIGHT.</span></h2></div>
          <Button href="/training/" kind="secondary">All training programs</Button></Reveal>
        <div className="program-grid">
          {programs.map((program) => <Link href={`/training/#${program.id}`} className="program-tile" key={program.id}>
            <Photo asset={program.image} sizes="(max-width: 720px) 100vw, 35vw" />
            <div className="program-tile-copy"><small>{program.level}</small><h3 className="display">{program.name}</h3><p>{program.short}</p><span>Explore program</span></div>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="mindset">
      <div className="container"><Reveal>
        <p className="eyebrow">The FERA mindset</p>
        <h2 className="display"><span>DISCIPLINE OVER MOTIVATION.</span><span>EVERY ROUND COUNTS.</span><span>NO SHORTCUTS. JUST WORK.</span></h2>
      </Reveal></div>
    </section>

    <section className="container section experience">
      <Reveal className="section-head"><div><p className="eyebrow">Life at FERA</p><h2 className="display section-title">INSIDE THE <span>GYM.</span></h2></div><Button href="/gallery/" kind="secondary">Open the gallery</Button></Reveal>
      <div className="experience-grid">
        <Link href="/gallery/" className="photo-frame"><Photo asset={assets.sparring} /></Link>
        <Link href="/gallery/" className="photo-frame"><Photo asset={assets.community} /></Link>
      </div>
      <div className="coach-preview"><div><h3 className="display">GET TO KNOW THE COACHES.</h3><p>Find out how to connect with the team before you train.</p></div><Button href="/coaches/" kind="text">Coaches</Button></div>
    </section>
    <ClosingCta />
    <section className="container section location-home">
      <div><p className="eyebrow">Find us</p><h2 className="display section-title">TRAIN IN <span>THANE.</span></h2><div className="actions"><a className="button button-primary" href={mapsLink} target="_blank" rel="noopener noreferrer">Get directions</a><Button href="/contact/" kind="secondary">Contact FERA</Button></div></div>
      <ContactDetails />
    </section>
  </>;
}
