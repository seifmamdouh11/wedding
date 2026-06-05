import Preloader from "./components/Preloader";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
      </main>
    </>
  );
}
