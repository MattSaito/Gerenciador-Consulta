import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="h-full w-full bg-white">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
