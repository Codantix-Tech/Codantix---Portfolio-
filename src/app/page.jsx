import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
// import Footer from '@/components/Footer';
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen data-scroll-section">
      <Header />
      <main className="flex-grow pt-16 data-scroll">
         <Hero />
         <Portfolio />
         <Testimonials />
         <Footer />
          
      </main>
      {/* <Footer /> */}
    </div>
  );
}