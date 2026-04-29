import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Manifesto from "./sections/Manifesto";
import Pillars from "./sections/Pillars";
import Heraldry from "./sections/Heraldry";
import Stats from "./sections/Stats";
import Members from "./sections/Members";
import ArticlesPreview from "./sections/ArticlesPreview";
import Contact from "./sections/Contact";
import type { Article } from "../lib/cms";

type Props = { articles?: Article[] };

export default function Landing({ articles = [] }: Props) {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <ArticlesPreview articles={articles} />
        <Manifesto />
        <Pillars />
        <Heraldry />
        <Stats />
        <Members />
        <Contact />
      </main>
    </div>
  );
}
