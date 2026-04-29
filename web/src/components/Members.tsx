import Nav from "./sections/Nav";
import MembersHero from "./sections/MembersHero";
import MembersDirectory from "./sections/MembersDirectory";
import Contact from "./sections/Contact";

export default function Members() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <MembersHero />
        <MembersDirectory />
        <Contact />
      </main>
    </div>
  );
}
