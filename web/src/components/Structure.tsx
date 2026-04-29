import Nav from "./sections/Nav";
import StructureHero from "./sections/StructureHero";
import BoardChart from "./sections/BoardChart";
import Contact from "./sections/Contact";

export default function Structure() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <StructureHero />
        <BoardChart />
        <Contact />
      </main>
    </div>
  );
}
