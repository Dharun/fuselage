"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, Globe2, Menu, Play, X } from "lucide-react";
import { useState } from "react";

const divisions = [
  { id: "agri-genesis", index: "01", eyebrow: "Precision agriculture", title: "Agri-genesis", copy: "Field-proven UAV systems for spraying, crop intelligence and the next generation of resilient farming.", image: "https://fuselage.co.in/wp-content/uploads/2024/07/C2067T01-1.jpg", accent: "#b7f36b" },
  { id: "aerospace", index: "02", eyebrow: "Mission capability", title: "Aerospace", copy: "Purpose-built aerial platforms for industrial inspection, surveillance, mapping and complex operations.", image: "https://fuselage.co.in/wp-content/uploads/2024/07/DSC00951-2-1.jpg", accent: "#76c9ff" },
  { id: "flying-club", index: "03", eyebrow: "Pilot development", title: "Flying Club", copy: "A practical pathway from simulator to field operations, guided by experienced UAV instructors.", image: "https://fuselage.co.in/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-14-at-15.48.42_273de106-scaled.jpg", accent: "#ffcc70" },
];

const nav = ["About", "Divisions", "News", "Careers", "Support"];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [region, setRegion] = useState<"India" | "Canada">("India");
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Fuselage Innovations home"><span className="brand-mark"><i /><i /><i /></span><span>FUSELAGE<br/><small>INNOVATIONS</small></span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav>
        <div className="nav-actions"><button className="region" onClick={() => setRegion(region === "India" ? "Canada" : "India")}><Globe2 size={15}/><span>{region}</span><ChevronDown size={14}/></button><a className="contact-link" href="#contact">Start a mission</a><button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button></div>
      </header>
      <AnimatePresence>{menu && <motion.nav className="mobile-nav" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>{nav.map(item=><a key={item} onClick={()=>setMenu(false)} href={`#${item.toLowerCase()}`}>{item}</a>)}</motion.nav>}</AnimatePresence>

      <section id="top" className="hero">
        <video autoPlay muted loop playsInline poster="https://fuselage.co.in/wp-content/uploads/2025/03/1718437420366-2-min.jpg"><source src="https://fuselage.co.in/wp-content/uploads/2024/07/SC-Website-VIDEO-27jun24_1-1.mp4" type="video/mp4" /></video><div className="hero-shade" />
        <motion.div className="hero-copy" initial={{opacity:0,y:34}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.22,1,.36,1]}}><p className="kicker"><span/> Autonomous systems · {region}</p><h1>Intelligence,<br/><em>airborne.</em></h1><p className="hero-lede">We engineer UAV systems that turn complex terrain into clear decisions—from precision farms to critical infrastructure.</p><div className="hero-links"><a className="primary" href="#divisions">Explore our divisions <ArrowUpRight size={17}/></a><button className="watch"><span><Play size={14} fill="currentColor"/></span> See our systems in action</button></div></motion.div>
        <div className="hero-meta"><span>10°01&apos; N</span><span>76°21&apos; E</span><span className="scroll">Scroll to navigate</span></div>
      </section>

      <section id="about" className="intro section-pad"><p className="section-label">/ Built for the real world</p><div className="intro-grid"><h2>From first prototype to field-proven intelligence.</h2><div><p>Fuselage Innovations develops UAV, IoT and AI systems that help teams see more, move faster and operate with confidence. Designed in India. Deployed for impact.</p><a className="text-link" href="#story">Discover our story <ArrowUpRight size={16}/></a></div></div><div className="stats"><article><strong>50K<sup>+</sup></strong><span>hectares piloted</span></article><article><strong>10L</strong><span>certified payload</span></article><article><strong>25</strong><span>minutes flight time</span></article><article><strong>2</strong><span>global regions</span></article></div></section>

      <section id="divisions" className="division-section"><div className="section-head section-pad"><p className="section-label">/ One company. Three missions.</p><h2>Explore the ecosystem</h2></div>{divisions.map((d,i)=><Division key={d.id} {...d} i={i}/>)}</section>

      <section id="news" className="products section-pad"><div className="section-head split"><div><p className="section-label">/ Flagship systems</p><h2>Machines with a mission.</h2></div><a className="text-link light" href="#contact">Discuss a custom UAV <ArrowUpRight size={16}/></a></div><div className="product-grid"><article className="product-card large"><img src="https://fuselage.co.in/wp-content/uploads/2024/06/Drone7-min.png" alt="FIA QD10 agricultural drone"/><div><p>DGCA type certified</p><h3>FIA QD10</h3><span>Precision spraying · 10L payload</span></div></article><article className="product-card"><img src="https://fuselage.co.in/wp-content/uploads/2024/06/Drone1.png" alt="Nireeksh crop surveillance drone"/><div><p>Crop intelligence</p><h3>NIREEKSH</h3><span>Multispectral surveillance</span></div></article></div></section>

      <section id="careers" className="statement"><p>Designed for precision.</p><h2>Built for missions that<br/>matter.</h2><a href="#contact">Build the future with us <ArrowUpRight size={18}/></a></section>
      <section id="support" className="support section-pad"><div><p className="section-label">/ Services & support</p><h2>Keep every mission<br/>flight-ready.</h2></div><div className="service-list">{["Drone maintenance","Repairs & servicing","Fleet management","Pilot training","Certification support","Custom UAV development"].map((s,i)=><a href="#contact" key={s}><span>{String(i+1).padStart(2,"0")}</span>{s}<ArrowUpRight/></a>)}</div></section>

      <footer id="contact"><div className="footer-top"><p>Have a mission in mind?</p><a href="mailto:info@fuselage.co.in">Let’s make it airborne. <ArrowUpRight/></a></div><div className="footer-grid"><div><span className="footer-brand">FUSELAGE</span><p>UAV · IoT · AI systems for a changing world.</p></div><div><b>India</b><p>Maker Village, Kerala Technology Innovation Zone<br/>Kochi 683503</p></div><div><b>Canada</b><p>325 Front St W<br/>Toronto, ON M5V 2Y1</p></div><div><b>Contact</b><a href="mailto:info@fuselage.co.in">info@fuselage.co.in</a><a href="tel:+917012937807">+91 70129 37807</a></div></div><div className="footer-bottom"><span>© 2026 Fuselage Innovations</span><span>India / Canada</span></div></footer>
      <motion.div className="progress-read" style={{width:progress}} />
    </main>
  );
}

function Division({id,index,eyebrow,title,copy,image,accent,i}:{id:string,index:string,eyebrow:string,title:string,copy:string,image:string,accent:string,i:number}){
  return <motion.article id={id} className="division" initial={{opacity:.4}} whileInView={{opacity:1}} viewport={{amount:.45}} transition={{duration:.7}} style={{"--accent":accent} as React.CSSProperties}><img src={image} alt={`${title} field operations`} /><div className="division-shade"/><div className="division-number">{index}</div><div className="division-copy"><p>{eyebrow}</p><h3>{title}</h3><span>{copy}</span><a href="#contact">Explore division <ArrowUpRight size={18}/></a></div><div className="division-tag">Fuselage / {String(i+1).padStart(2,"0")}</div></motion.article>
}
