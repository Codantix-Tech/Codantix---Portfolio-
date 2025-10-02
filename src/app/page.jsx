// app/page.jsx
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Header removed from here — it's now in RootLayout */}
      <main>
        <Hero />
        <Portfolio />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
