import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import MusicToggle from "./components/MusicToggle";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
      </main>
      <MusicToggle />
    </>
  );
}
