import { Button, PageIntro } from "@/components/primitives";

export default function NotFound() {
  return <>
    <PageIntro label="Page not found" title="OUTSIDE THE" accent="RING." description="This page may have moved. Head back to FERA Fitness to keep exploring." />
    <div className="container section"><Button href="/">Back to home</Button></div>
  </>;
}
