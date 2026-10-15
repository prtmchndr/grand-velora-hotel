import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookingForm from "@/components/BookingForm";
import Rooms from "@/components/Rooms";
import About from "@/components/About";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <BookingForm />
        <Rooms />
        <About />
        <Facilities />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </>
  );
}