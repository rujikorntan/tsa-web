import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Manifesto from "./sections/Manifesto";
import Pillars from "./sections/Pillars";
import Heraldry from "./sections/Heraldry";
import Stats from "./sections/Stats";
import Members from "./sections/Members";
import Contact from "./sections/Contact";

export default function Landing() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
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
