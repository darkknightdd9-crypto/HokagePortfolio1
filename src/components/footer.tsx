"use client";

import { ArrowUp, Youtube, Twitter, Disc as Discord, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative z-10 w-full px-6 py-20 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background: "#0B0B0C",
        borderTop: "1px solid rgba(212,175,106,0.10)",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Social links + back to top */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10"
          style={{ borderBottom: "1px solid rgba(212,175,106,0.10)" }}
        >
          <div className="flex flex-wrap items-center gap-6">
            {[
              { href: "https://youtube.com",  Icon: Youtube, label: "YOUTUBE" },
              { href: "https://twitter.com",  Icon: Twitter, label: "X / TWITTER" },
              { href: "https://discord.com",  Icon: Discord, label: "DISCORD" },
              { href: "mailto:contact@hokage-editorial.com", Icon: Mail, label: "EMAIL" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                data-magnetic
                className="flex items-center gap-2 text-xs font-mono tracking-wider transition-colors duration-300"
                style={{ color: "#8A8680" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#D4AF6A"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8A8680"; }}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            data-magnetic
            className="group flex items-center gap-3 rounded-full px-5 py-2.5 text-xs font-mono tracking-wider transition-all duration-300"
            style={{
              border: "1px solid rgba(212,175,106,0.18)",
              background: "#131314",
              color: "#8A8680",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,106,0.45)"; (e.currentTarget as HTMLButtonElement).style.color = "#D4AF6A"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,106,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "#8A8680"; }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Big wordmark */}
        <div className="pt-2">
          <div
            className="font-display font-black leading-none tracking-tighter select-none
                       text-5xl sm:text-7xl md:text-8xl lg:text-[10rem]"
            style={{ color: "rgba(237,234,227,0.08)" }}
          >
            HOKAGE<span style={{ color: "#D4AF6A" }}>.</span>
          </div>
        </div>

        {/* Legal */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono pt-4"
          style={{ color: "rgba(237,234,227,0.28)" }}
        >
          <div>© {new Date().getFullYear()} HOKAGE EDITORIAL STUDIO. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-3">
            <span>UTC -5 (EST)</span>
            <span>•</span>
            <span style={{ color: "#D4AF6A" }}>4K // 24FPS PRORES 422HQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
