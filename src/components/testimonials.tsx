"use client";

interface Testimonial {
  id: string;
  firstName: string;
  creator: string;
  channel: string;
  metric: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    firstName: "Julian",
    creator: "Julian V.",
    channel: "Void Gaming Studios",
    metric: "+26% AVD",
    quote:
      "Hokage fundamentally changed our channel trajectory. Our average retention surged from 48% to 74% on 30-minute videos. The sound design alone gives me goosebumps every cut.",
  },
  {
    id: "2",
    firstName: "Marcus",
    creator: "Marcus Thorne",
    channel: "Chronicle Lab",
    metric: "14.8M Views",
    quote:
      "Most editors just cut footage. Hokage directs the story in the edit. He understands narrative suspense better than anyone I've worked with in 6 years on YouTube.",
  },
  {
    id: "3",
    firstName: "Elena",
    creator: "Elena Rostova",
    channel: "Simulacra Series",
    metric: "#1 Trending",
    quote:
      "Turnaround is insane, communication via Frame.io is painless. If you want Hollywood-standard edits for your gaming content, hire him immediately.",
  },
  {
    id: "4",
    firstName: "Alex",
    creator: "Alex Chen",
    channel: "Apex Narratives",
    metric: "+42% Retention",
    quote:
      "The retention hook engineering on our cold opens doubled our 30-second hold rate. Viewers literally cannot click away once the first act begins.",
  },
  {
    id: "5",
    firstName: "David",
    creator: "David Miller",
    channel: "Pixel Forge",
    metric: "9.2M Impressions",
    quote:
      "Our CTR-to-AVD conversion went through the roof after Hokage took over pacing. His color grading and sound design give our episodes a signature AAA movie aesthetic.",
  },
  {
    id: "6",
    firstName: "Sarah",
    creator: "Sarah Vance",
    channel: "Realm Craft",
    metric: "100% On-Time",
    quote:
      "I went from stressing over 40 hours of raw streams to getting polished, high-tension cinematic cuts delivered days ahead of schedule. An absolute cheat code.",
  },
  {
    id: "7",
    firstName: "Liam",
    creator: "Liam Gallagher",
    channel: "Darkwood Films",
    metric: "+38% Watch Time",
    quote:
      "The pacing algorithms and pattern interrupts Hokage integrates keep watch time locked past the 25-minute mark. Best investment our production team made this year.",
  },
  {
    id: "8",
    firstName: "Noah",
    creator: "Noah Sterling",
    channel: "Inferno Studio",
    metric: "3.4M Views/Ep",
    quote:
      "Every cut feels deliberate. The subtle 3D camera sweeps and custom sound foley transformed our lore series into must-watch weekly cinema.",
  },
  {
    id: "9",
    firstName: "Maya",
    creator: "Maya Lin",
    channel: "Kuro Cinema",
    metric: "94% Completion",
    quote:
      "Hokage's storytelling instincts are world-class. He doesn't just trim footage; he crafts an emotional arc that turned casual viewers into hardcore subscribers.",
  },
];

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div
      data-cursor="hover"
      className="review-card-emit group relative flex flex-col justify-between p-7 sm:p-8 w-[330px] sm:w-[410px] shrink-0 cursor-pointer select-none transition-all duration-500"
      style={{
        background:   "#1A1A1C",
        border:       "1px solid rgba(212,175,106,0.15)",
        borderRadius: "18px",
        boxShadow:    "0 12px 32px rgba(0,0,0,0.55)",
      }}
    >
      <div>
        {/* Top: First Name PFP (replaces stars) + Metric badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* PFP Avatar */}
            <div
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-black text-sm text-[#0B0B0C] shadow-lg ring-2 ring-gold/40 transition-transform duration-300 group-hover:scale-110 group-hover:ring-gold"
              style={{
                background: "linear-gradient(135deg, #EDD99A 0%, #D4AF6A 50%, #B8965A 100%)",
              }}
            >
              {t.firstName[0]}
            </div>
            {/* First Name text label */}
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-wide text-sand">
                {t.firstName}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-gold/70 uppercase">
                Creator
              </span>
            </div>
          </div>

          <span
            className="rounded-full px-3 py-1 font-mono text-[11px] font-bold tracking-wider transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(212,175,106,0.35)]"
            style={{
              border: "1px solid rgba(212,175,106,0.32)",
              background: "rgba(212,175,106,0.08)",
              color: "#D4AF6A",
            }}
          >
            {t.metric}
          </span>
        </div>

        {/* Quote */}
        <p className="text-sm sm:text-base leading-relaxed italic text-sand/85 group-hover:text-sand transition-colors duration-300">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Bottom: Creator & Channel — subscribers removed */}
      <div
        className="mt-7 pt-5 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(212,175,106,0.10)" }}
      >
        <div>
          <div className="font-display text-sm font-bold text-sand group-hover:text-gold transition-colors duration-300">
            {t.creator}
          </div>
          <div className="text-xs font-mono mt-0.5 text-sand/50">
            {t.channel}
          </div>
        </div>

        <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#D4AF6A" }} />
          <span className="font-mono text-[10px] tracking-wider uppercase text-gold/80">
            Client
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 w-full px-6 py-24 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background: "#131314",
        borderTop: "1px solid rgba(212,175,106,0.10)",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between pb-8 gap-6"
          style={{ borderBottom: "1px solid rgba(212,175,106,0.10)" }}
        >
          <div>
            <div
              className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase mb-3"
              style={{ color: "#D4AF6A" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#D4AF6A" }} />
              06 // CREATOR ENDORSEMENTS
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sand">
              PROOF OF IMPACT
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base leading-relaxed" style={{ color: "#8A8680" }}>
            What creators say after working with Hokage. Hover over any review to inspect and pause.
          </p>
        </div>
      </div>

      {/* Infinite Marquee Track Moving to the Right */}
      <div className="relative w-full overflow-hidden py-10">
        {/* Cinematic edge fade gradients */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-44 z-20 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #131314 0%, transparent 100%)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-44 z-20 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #131314 0%, transparent 100%)" }}
        />

        {/* Track moving to right with 2 identical sets of 9 cards */}
        <div className="flex w-max animate-marquee-right gap-6 px-4">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={`set1-${t.id}-${idx}`} testimonial={t} />
          ))}
          {testimonials.map((t, idx) => (
            <TestimonialCard key={`set2-${t.id}-${idx}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
