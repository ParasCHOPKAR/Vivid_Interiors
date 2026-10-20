"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, BookOpen, Clock, X, Check, Mail, Sparkles } from "lucide-react";
import { PageHero, Reveal, ParallaxImg, MarqueeTicker, ForgeButton, LetterRoll } from "@/components/SharedUI";

interface Article {
  id: string;
  title: string;
  category: "Living Spaces" | "Materiality" | "Lighting & Mood" | "Kitchen Architecture" | "Minimalist Living";
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  img: string;
  excerpt: string;
  content: string[];
  takeaways: string[];
}

const articles: Article[] = [
  {
    id: "poetry-of-light",
    title: "The Poetry of Light: How Circadian Lighting Shapes Modern Luxury",
    category: "Lighting & Mood",
    readTime: "5 min read",
    date: "October 2026",
    author: "Sarah Al-Mansoor",
    authorRole: "Head of Lighting & Materials",
    img: "/images/service_bedroom.jpg",
    excerpt: "Light is not merely a utility to illuminate darkness; it is an emotional sculptress that defines how you feel inside a room at sunset.",
    content: [
      "In luxury interior architecture, the single greatest determinant of atmosphere is how light interacts with texture. Glaring 6000K overhead downlights strip surfaces of depth, flattening marble veining and creating visual fatigue.",
      "At Vivid Interiors, we design layered illumination around circadian human biology. As dusk approaches, our lighting automation gradually transitions Kelvin temperatures from an invigorating 3500K daytime glow down to a warm, candlelit 2400K-2700K amber hue.",
      "By concealing light sources within fluted timber reveals, coffer ceilings, and joinery kickboards, light emanates indirectly — allowing shadow to provide mystery and intimacy.",
    ],
    takeaways: [
      "Avoid direct center-ceiling downlights in master bedrooms and lounges.",
      "Utilize warm dimming fixtures that drop to 2200K at low intensity.",
      "Highlight tactile walls (fluted wood, plaster, stone) with grazing wash lights.",
    ],
  },
  {
    id: "noble-stones-guide",
    title: "Noble Stones: Choosing Between Calacatta Viola, Travertine, and Dark Quartzite",
    category: "Materiality",
    readTime: "6 min read",
    date: "September 2026",
    author: "Ananya Mehta",
    authorRole: "Principal Architect",
    img: "/images/project_villa.jpg",
    excerpt: "A guide to selecting statement natural stones that age with dignity rather than fading into passing trends.",
    content: [
      "Natural stone is the geological soul of an interior. Each slab was formed over millions of years under tectonic pressure, making it an irreplaceable original piece of art.",
      "When specifying marble for luxury villas, we gravitate toward character stones like Calacatta Viola with its rich cabernet veining against ivory, or honed Roman Travertine with its tactile micropores.",
      "For culinary worktops, we prefer dark Brazilian Quartzite or Belgian granite over marble — offering the dramatic beauty of natural veining with zero risk of lemon or wine etching.",
    ],
    takeaways: [
      "Opt for a honed or leathered finish rather than high-gloss polish for a more tactile, understated feel.",
      "Reserve high-acid zones (kitchen work surfaces) for non-porous quartzites.",
      "Always inspect full stone bundles at the stone yard to ensure bookmatching harmony.",
    ],
  },
  {
    id: "concealed-kitchen-revolution",
    title: "The Concealed Kitchen: Why Pocket Doors Are Revolutionizing Living Layouts",
    category: "Kitchen Architecture",
    readTime: "4 min read",
    date: "August 2026",
    author: "Kabir Sengupta",
    authorRole: "Director of Technical & Fit-outs",
    img: "/images/service_kitchen.jpg",
    excerpt: "How modern architectural cabinetry lets a high-performance culinary workspace disappear during dinner parties.",
    content: [
      "The kitchen has decisively merged into the primary living and entertaining zone. However, nobody wants dirty pots or coffee grinders marring the serenity of a dinner party.",
      "The architectural solution is the pocket-door pantry suite. Custom fluted oak or matte black panels slide effortlessly into concealed wall cavities during prep, and slide closed in one touch when guests arrive.",
      "Paired with a monolithic quartzite waterfall island, the room seamlessly transforms from a Michelin-grade culinary lab into a seductive cocktail salon.",
    ],
    takeaways: [
      "Incorporate German Blum or Hawa pocket-door sliding hardware for silky gliding action.",
      "Integrate automated door sensors that shut off internal appliances if doors are closed.",
      "Create a separate hidden wet-prep kitchen for heavy frying and spice cooking.",
    ],
  },
  {
    id: "japandi-philosophy",
    title: "Japandi Living: The Convergence of Scandinavian Warmth and Japanese Zen",
    category: "Minimalist Living",
    readTime: "7 min read",
    date: "July 2026",
    author: "Tanvi Deshmukh",
    authorRole: "Pune Studio Lead",
    img: "/images/design_ideas.jpg",
    excerpt: "Discover the restorative power of natural oak battens, low-profile furniture, and indoor bonsai gardens.",
    content: [
      "Japandi is not an aesthetic fad; it is a philosophy of intentional living. It marries the cozy functionality of Scandinavian 'hygge' with the Japanese appreciation for imperfect natural beauty ('wabi-sabi').",
      "Instead of busy moldings and loud colors, spaces are grounded with natural Nordic oak slats, textured linen throws, hand-thrown ceramic vessels, and low-profile seating that keeps the eye level relaxed.",
      "By framing views toward private courtyard greenery or bonsai trees, the indoors and outdoors converse in gentle harmony.",
    ],
    takeaways: [
      "Keep furniture silhouettes low to visually enlarge ceiling height.",
      "Embrace neutral palettes of oat, beige, soft charcoal, and moss green.",
      "Invest in one or two handcrafted artisan sculptures rather than cluttering shelves.",
    ],
  },
  {
    id: "double-height-volumes",
    title: "Double-Height Volumes: Mastering Acoustic Balance and Spatial Warmth",
    category: "Living Spaces",
    readTime: "6 min read",
    date: "June 2026",
    author: "Rohan Verghese",
    authorRole: "Bengaluru Studio Director",
    img: "/images/project_penthouse.jpg",
    excerpt: "Soaring 20-foot ceilings create immense drama, but without proper acoustic design, they can sound like an echo chamber.",
    content: [
      "A double-height living room is the crowning jewel of any luxury villa or penthouse. Yet many homeowners suffer from reverberation where casual conversation becomes uncomfortably loud.",
      "The secret lies in micro-perforated acoustic timber wall fluting backed by sound-absorbing rockwool, concealed behind elegant architectural slats.",
      "Floor-to-ceiling drapery in double-layer Belgian linen and dense hand-knotted wool rugs absorb sound energy, making a 20-foot room feel as cozy and intimate as a private library.",
    ],
    takeaways: [
      "Incorporate acoustic absorption into walls through fluted timber louvers.",
      "Use heavy linen drapery extending the full architectural height.",
      "Anchor expansive seating layouts with oversized plush rugs.",
    ],
  },
  {
    id: "master-suite-sanctuary",
    title: "The Sovereign Master Suite: Designing Private Dressing Rooms and Spa En-Suites",
    category: "Living Spaces",
    readTime: "5 min read",
    date: "May 2026",
    author: "Priya Kashyap",
    authorRole: "Senior Architect",
    img: "/images/service_bedroom.jpg",
    excerpt: "Crafting a hotel-presidential sanctuary with custom fluted headboards and smoked glass wardrobes.",
    content: [
      "Your master suite should be the most restorative retreat in your home — an acoustic bubble isolated from household noise.",
      "We design custom full-height headboards upholstered in sound-dampening velvet or saddle leather, framing integrated reading sconces with warm brass switches at fingertips.",
      "The walk-in dressing suite utilizes bronze-tinted smoked glass profiles with motion-activated 2700K perimeter LED runners, displaying tailored garments like a luxury boutique.",
    ],
    takeaways: [
      "Use smoked glass wardrobe fronts with internal 2700K sensor LEDs.",
      "Acoustically isolate the master suite with solid-core timber doors.",
      "Incorporate a dedicated morning coffee / beverage bar within the master suite.",
    ],
  },
];

const categories = ["All", "Living Spaces", "Materiality", "Lighting & Mood", "Kitchen Architecture", "Minimalist Living"];

export default function DesignIdeasPage() {
  const [filter, setFilter] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles =
    filter === "All" ? articles : articles.filter((a) => a.category === filter);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* ═══════════════ PAGE HERO ═══════════════ */}
      <PageHero
        tag="[ Design Ideas & Studio Journal ]"
        title={
          <>
            The Art of Spatial Living / <span style={{ fontStyle: "italic", color: "#e8651c" }}>Journal</span>
          </>
        }
        subtitle="Curated essays, materiality guides, lighting philosophies, and architectural insights written by our studio's senior architects."
        bgImage="/images/design_ideas.jpg"
        primaryCta={{ label: "EXPLORE ESSAYS", href: "#journal-feed" }}
        secondaryCta={{ label: "BOOK A CONSULTATION", href: "/contact" }}
      />

      {/* ═══════════════ TICKER ═══════════════ */}
      <MarqueeTicker text="Architectural Essays ✦ Noble Materiality Guides ✦ Circadian Lighting ✦ Bespoke Joinery Details ✦" />

      {/* ═══════════════ JOURNAL FEED ═══════════════ */}
      <section id="journal-feed" style={{ padding: "8rem 8%", background: "#faf9f6" }}>
        {/* Header and Filter Tabs */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "0.5rem" }}>
              [ Editorial Essays ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)", fontWeight: 400 }}>
              Design Journal ({filteredArticles.length})
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-pill ${filter === c ? "active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem" }}
        >
          <AnimatePresence>
            {filteredArticles.map((article, idx) => (
              <motion.article
                layout
                key={article.id}
                className="forge-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedArticle(article)}
                style={{
                  background: "#fff",
                  borderColor: "rgba(0,0,0,0.06)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                    <Image src={article.img} alt={article.title} fill style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />
                    <div style={{ position: "absolute", top: "1.2rem", left: "1.2rem", background: "#e8651c", color: "#fff", fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.35rem 0.9rem" }}>
                      {article.category}
                    </div>
                  </div>

                  <div style={{ padding: "2rem 2rem 1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#888", fontSize: "0.78rem", marginBottom: "0.8rem" }}>
                      <span>{article.date}</span>
                      <span>·</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Clock size={13} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="serif" style={{ fontSize: "1.5rem", lineHeight: 1.3, marginBottom: "1rem", fontWeight: 400, color: "#111" }}>
                      {article.title}
                    </h3>

                    <p style={{ color: "#666", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div style={{ padding: "0 2rem 2rem", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "1.2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#222", display: "block" }}>{article.author}</span>
                    <span style={{ fontSize: "0.75rem", color: "#888" }}>{article.authorRole}</span>
                  </div>
                  <span style={{ color: "#e8651c", fontSize: "0.8rem", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    READ &nbsp;→
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ═══════════════ NEWSLETTER SIGNUP ═══════════════ */}
      <section style={{ padding: "7rem 8%", background: "#111", color: "#fff" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(232,101,28,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "#e8651c" }}>
              <Mail size={22} />
            </div>
            <span style={{ fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#e8651c", display: "block", marginBottom: "1rem" }}>
              [ Atelier Gazette ]
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)", fontWeight: 400, marginBottom: "1.2rem" }}>
              Receive Our Monthly Design Digest
            </h2>
            <p style={{ color: "#aaa", fontSize: "0.98rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              A curated dispatch of architectural floor plans, new marble quarried arrivals, and private studio previews. No spam, ever.
            </p>

            {subscribed ? (
              <div style={{ background: "rgba(232,101,28,0.15)", border: "1px solid #e8651c", padding: "1.5rem", borderRadius: "4px", color: "#fff" }}>
                <Check size={20} color="#e8651c" style={{ display: "inline-block", marginRight: "0.5rem" }} />
                <span>Thank you! You are now subscribed to the Vivid Atelier Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.8rem", maxWidth: "520px", margin: "0 auto", flexWrap: "wrap" }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your private email..."
                  className="luxury-input"
                  style={{ flex: 1, minWidth: "240px" }}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="forge-shimmer-btn" style={{ padding: "1rem 2.2rem" }}>
                  <LetterRoll text="JOIN GAZETTE" />
                  <span style={{ fontSize: "0.9rem", marginLeft: "4px" }}>→</span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ ARTICLE READER MODAL ═══════════════ */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className="modal-content"
              style={{ maxWidth: "860px", maxHeight: "90vh", overflowY: "auto", background: "#0d0d0d", color: "#fff" }}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal"
                style={{ color: "#fff", background: "rgba(0,0,0,0.6)", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
                onClick={() => setSelectedArticle(null)}
              >
                <X size={20} />
              </button>

              <div style={{ position: "relative", height: "360px", width: "100%" }}>
                <Image src={selectedArticle.img} alt={selectedArticle.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0d0d0d 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "2rem", left: "2.5rem", right: "2.5rem" }}>
                  <span style={{ background: "#e8651c", color: "#fff", fontSize: "0.68rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.35rem 0.9rem", display: "inline-block", marginBottom: "0.8rem" }}>
                    {selectedArticle.category}
                  </span>
                  <h2 className="serif" style={{ fontSize: "2.2rem", fontWeight: 400, lineHeight: 1.2 }}>
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              <div style={{ padding: "2.5rem 3rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.2rem", marginBottom: "2rem", color: "#888", fontSize: "0.85rem" }}>
                  <div>
                    <strong style={{ color: "#fff" }}>{selectedArticle.author}</strong> ({selectedArticle.authorRole})
                  </div>
                  <div>{selectedArticle.readTime} · {selectedArticle.date}</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1.08rem", lineHeight: 1.85, color: "#ccc", marginBottom: "2.5rem" }}>
                  {selectedArticle.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div style={{ background: "#161616", borderLeft: "3px solid #e8651c", padding: "2rem", marginBottom: "2.5rem" }}>
                  <h4 style={{ fontSize: "0.78rem", letterSpacing: "2px", textTransform: "uppercase", color: "#e8651c", marginBottom: "1rem" }}>
                    Key Architectural Takeaways:
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {selectedArticle.takeaways.map((t, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "#ddd", fontSize: "0.95rem" }}>
                        <Check size={16} color="#e8651c" style={{ flexShrink: 0, marginTop: "4px" }} />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                  <p style={{ color: "#888", fontSize: "0.88rem" }}>Inspired by this aesthetic for your property?</p>
                  <ForgeButton href="/contact" variant="shimmer" onClick={() => setSelectedArticle(null)}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      <LetterRoll text="CONSULT OUR ARCHITECTS" />
                      <ArrowRight size={15} />
                    </span>
                  </ForgeButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
