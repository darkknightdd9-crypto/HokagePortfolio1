import IntroLoader    from "@/components/intro-loader";
import Hero           from "@/components/hero";
import StatsBar       from "@/components/stats-bar";
import SelectedWork   from "@/components/selected-work";
import About          from "@/components/about";
import Services       from "@/components/services";
import Testimonials   from "@/components/testimonials";
import ContactHireMe  from "@/components/contact-hire-me";
import Footer         from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-sand" style={{ background: "#0B0B0C" }}>
      {/* 00 — CINEMATIC INTRO */}
      <IntroLoader />

      {/* 01 — HERO */}
      <Hero />

      {/* 02 — STATS BAR */}
      <StatsBar />

      {/* 03 — SELECTED WORK */}
      <SelectedWork />

      {/* 04 — ABOUT */}
      <About />

      {/* 05 — SERVICES */}
      <Services />

      {/* 06 — TESTIMONIALS */}
      <Testimonials />

      {/* 07 — CONTACT / HIRE ME */}
      <ContactHireMe />

      {/* 08 — FOOTER */}
      <Footer />
    </div>
  );
}
