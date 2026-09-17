import Seo from "../components/Seo";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Features from "../components/Features/Features";
import Menu from "../components/Menu/Menu";
import SignatureDishes from "../components/SignatureDishes/SignatureDishes";
import Gallery from "../components/Gallery/Gallery";
import Testimonials from "../components/Testimonials/Testimonials";
import Stats from "../components/Stats/Stats";
import Reservation from "../components/Reservation/Reservation";
import FAQ from "../components/FAQ/FAQ";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import FloatingActions from "../components/FloatingActions/FloatingActions";

function Home() {
  return (
    <>
      <Seo
        title="Zaify's Restaurant | Fine Dining in Satellite Town, Rawalpindi"
        description="Zaify's Restaurant serves Pakistani, BBQ, Chinese, Continental and steak cuisine in Satellite Town, Rawalpindi. Rated 4.3★ with 673+ reviews. Reserve your table today."
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Menu />
        <SignatureDishes />
        <Gallery />
        <Testimonials />
        <Stats />
        <Reservation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export default Home;
