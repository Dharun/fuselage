"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ChevronDown,
  CirclePause,
  CirclePlay,
  Crosshair,
  Globe2,
  Menu,
  Play,
  Plus,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FILM =
  "https://fuselage.co.in/wp-content/uploads/2024/07/SC-Website-VIDEO-27jun24_1-1.mp4";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const ease = [0.22, 1, 0.36, 1] as const;
const missions = [
  {
    id: "agri",
    name: "Agri-genesis",
    category: "01 / AGRICULTURE",
    headline: "A better future.\nFrom the ground up.",
    description:
      "Precision spraying. Deeper crop intelligence. A new perspective on what every hectare can become.",
    image: asset("/assets/field.jpg"),
    tags: ["Precision spraying", "Crop monitoring", "Farmland mapping"],
    link: "https://fuselage.co.in/solutions/",
    action: "Explore agricultural solutions",
  },
  {
    id: "aerospace",
    name: "Aerospace",
    category: "02 / AERIAL SYSTEMS",
    headline: "Different missions.\nThe same ambition.",
    description:
      "Custom UAV engineering for industrial inspection, mapping and surveillance. Built around the demands of your mission.",
    image: asset("/assets/agriculture.jpg"),
    tags: ["Custom UAVs", "Industrial inspection", "Mapping & surveying"],
    link: "https://fuselage.co.in/products/customized-drones/",
    action: "Discuss a custom system",
  },
  {
    id: "club",
    name: "Flying Club",
    category: "03 / PILOT DEVELOPMENT",
    headline: "Your perspective.\nElevated.",
    description:
      "Take the controls. Build confidence through simulator sessions, field practice and a practical path into drone operations.",
    image: asset("/assets/training.jpg"),
    tags: ["Simulator training", "Field operations", "Pilot development"],
    link: "https://fuselage.co.in/training/",
    action: "Explore flight training",
  },
];
const aircraft = [
  {
    id: "fia",
    name: "FIA QD10",
    title: "Precision is\na powerful thing.",
    image: asset("/assets/fia-large.png"),
    type: "AGRICULTURAL UAV",
    description:
      "A purpose-built spraying system that brings precision to every pass. Developed for the realities of the field.",
    stats: [
      ["10", "litre tank"],
      ["25", "min flight time"],
      ["4–6", "m spray width"],
    ],
    features: [
      "DGCA type certified",
      "Automatic flight planning",
      "Foldable quadcopter",
    ],
    url: "https://fuselage.co.in/products/fia-qd-10/",
  },
  {
    id: "nireeksh",
    name: "NIREEKSH",
    title: "See the signals.\nBefore the symptoms.",
    image: asset("/assets/nireeksh.png"),
    type: "CROP INTELLIGENCE UAV",
    description:
      "Multispectral crop surveillance turns aerial observations into a clearer understanding of farmland and crop health.",
    stats: [
      ["UAV", "aerial platform"],
      ["Multi", "spectral sensing"],
      ["Crop", "intelligence"],
    ],
    features: [
      "Multispectral sensing",
      "Crop health monitoring",
      "Farmland diagnostics",
    ],
    url: "https://fuselage.co.in/products/nireeksh/",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [menu, setMenu] = useState(false);
  const [film, setFilm] = useState(false);
  const [spec, setSpec] = useState(false);
  const [region, setRegion] = useState("India");
  const [mission, setMission] = useState("agri");
  const [model, setModel] = useState("fia");
  const { scrollYProgress } = useScroll();
  const moving = !reduced && !paused;
  const selected = aircraft.find((p) => p.id === model)!;

  useEffect(() => {
    const saved = localStorage.getItem("fuselage-region");
    if (saved === "India" || saved === "Canada") setRegion(saved);
  }, []);
  function changeRegion(value: string) {
    setRegion(value);
    localStorage.setItem("fuselage-region", value);
  }

  return (
    <MotionConfig reducedMotion={moving ? "user" : "always"}>
      <main
        id="top"
        className={moving ? "experience" : "experience motion-paused"}
      >
        <a href="#worlds" className="skip-link">
          Skip to our divisions
        </a>
        <motion.div
          className="page-progress"
          style={{ scaleX: scrollYProgress }}
        />
        <header className="site-header">
          <a
            href="#top"
            className="brand"
            aria-label="Fuselage Innovations home"
          >
            <img
              src={asset("/assets/fuselage-logo.svg")}
              width="164"
              height="49"
              alt="Fuselage Innovations"
            />
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#worlds">Our worlds</a>
            <a href="#aircraft">Our aircraft</a>
            <a href="#purpose">Our purpose</a>
          </nav>
          <div className="header-actions">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="region-trigger"
                aria-label={`Switch region, currently ${region}`}
              >
                <Globe2 size={15} />
                <span>{region === "India" ? "IN" : "CA"}</span>
                <ChevronDown size={12} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="region-dropdown">
                {["India", "Canada"].map((value) => (
                  <DropdownMenuItem
                    key={value}
                    onSelect={() => changeRegion(value)}
                  >
                    {value}
                    <span>{region === value ? "Selected" : ""}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#contact" className="header-contact">
              Let’s talk <Plus size={15} />
            </a>
            <button
              onClick={() => setMenu(true)}
              className="menu-trigger"
              aria-label="Open navigation"
            >
              <Menu size={23} />
            </button>
          </div>
        </header>

        <Hero moving={moving} region={region} onFilm={() => setFilm(true)} />

        <section id="purpose" className="purpose-section">
          <div className="section-eyebrow">
            <span className="tiny-cross">+</span> ENGINEERED FOR A WORLD IN
            MOTION <span>01 — 04</span>
          </div>
          <div className="purpose-grid">
            <Reveal>
              <h2>
                THE SKY ISN’T
                <br />
                THE LIMIT.
                <br />
                <span>
                  IT’S THE
                  <br />
                  STARTING POINT.
                </span>
              </h2>
            </Reveal>
            <div className="purpose-side">
              <Reveal delay={0.1}>
                <p className="body-large">
                  A new vantage point.
                  <br />A world of possibility.
                </p>
                <p>
                  We bring together unmanned aircraft, IoT and AI to turn an
                  aerial perspective into meaningful action. For the land we
                  cultivate. The places we protect. And the people ready to go
                  further.
                </p>
                <a
                  href="https://fuselage.co.in/about/"
                  target="_blank"
                  rel="noreferrer"
                  className="line-link"
                >
                  The Fuselage story <Plus size={18} />
                </a>
              </Reveal>
              <div className="mini-flight">
                <motion.img
                  src={asset("/assets/nireeksh.png")}
                  alt="Nireeksh multispectral UAV"
                  animate={
                    moving
                      ? { y: [0, -14, 0], rotate: [-8, -3, -8] }
                      : { y: 0, rotate: -5 }
                  }
                  transition={{
                    duration: 7,
                    repeat: moving ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  loading="lazy"
                />
                <span>NIREEKSH / MULTISPECTRAL INTELLIGENCE</span>
              </div>
            </div>
          </div>
          <div className="proof-strip">
            <div>
              <span>01 / FIELD EXPERIENCE</span>
              <strong>
                50,000<span>+</span>
              </strong>
              <p>hectares tested & piloted with FIA QD10</p>
            </div>
            <div>
              <span>02 / ENGINEERING</span>
              <strong>Built in India.</strong>
              <p>UAV systems with a global perspective</p>
            </div>
            <div>
              <span>03 / GLOBAL PRESENCE</span>
              <strong>Two regions.</strong>
              <p>Kochi, India · Toronto, Canada</p>
            </div>
          </div>
        </section>

        <section id="worlds" className="worlds-section">
          <div className="worlds-heading">
            <Reveal>
              <p className="eyebrow">THREE WORLDS. ONE FUSELAGE.</p>
              <h2>
                CHOOSE YOUR
                <br />
                <span>HORIZON.</span>
              </h2>
            </Reveal>
            <p>
              One shared ambition.
              <br />
              Three ways to change your perspective.
            </p>
          </div>
          <Tabs
            value={mission}
            onValueChange={setMission}
            className="mission-tabs"
          >
            <TabsList
              className="mission-nav"
              aria-label="Choose a Fuselage division"
            >
              {missions.map((m, i) => (
                <TabsTrigger key={m.id} value={m.id} className="mission-tab">
                  <span>0{i + 1}</span>
                  <strong>{m.name}</strong>
                  <Plus size={18} />
                </TabsTrigger>
              ))}
            </TabsList>
            {missions.map((m) => (
              <TabsContent key={m.id} value={m.id} className="mission-panel">
                <motion.div
                  className={`mission-scene mission-${m.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.65 }}
                >
                  <motion.img
                    className="mission-backdrop"
                    src={m.image}
                    alt={
                      m.id === "club"
                        ? "Fuselage training and field operations"
                        : "Fuselage UAV deployed in the field"
                    }
                    initial={moving ? { scale: 1.07 } : false}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease }}
                    loading="lazy"
                  />
                  <div className="mission-gradient" />
                  {m.id === "aerospace" && (
                    <motion.img
                      className="mission-aircraft"
                      src={asset("/assets/nireeksh.png")}
                      alt="Nireeksh UAV"
                      initial={{ x: 70, opacity: 0, rotate: -10 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        rotate: -6,
                        y: moving ? [0, -12, 0] : 0,
                      }}
                      transition={{
                        x: { duration: 1 },
                        opacity: { duration: 1 },
                        y: { duration: 6, repeat: moving ? Infinity : 0 },
                      }}
                    />
                  )}
                  <div className="mission-copy">
                    <span className="eyebrow">{m.category}</span>
                    <h3>{m.headline}</h3>
                    <p>{m.description}</p>
                    <a
                      className="solid-button light-button"
                      href={
                        m.id === "aerospace"
                          ? "mailto:info@fuselage.co.in?subject=Custom%20UAV%20enquiry"
                          : m.link
                      }
                      target={m.id === "aerospace" ? undefined : "_blank"}
                      rel="noreferrer"
                    >
                      {m.action}
                      <Plus size={17} />
                    </a>
                  </div>
                  <div className="mission-bottom">
                    <div>
                      {m.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span>FUSELAGE / {m.name.toUpperCase()}</span>
                  </div>
                  <span className="scene-corner corner-tl" />
                  <span className="scene-corner corner-tr" />
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section id="aircraft" className="aircraft-section">
          <div className="section-eyebrow">
            <span className="tiny-cross">+</span> MEET THE MACHINES{" "}
            <span>03 — 04</span>
          </div>
          <div className="aircraft-heading">
            <Reveal>
              <h2>
                LESS FOOTPRINT.
                <br />
                <span>MORE POSSIBILITY.</span>
              </h2>
            </Reveal>
            <p>
              Purpose in every component.
              <br />
              Precision in every flight.
            </p>
          </div>
          <Tabs
            value={model}
            onValueChange={setModel}
            className="aircraft-tabs"
          >
            <TabsList className="model-switch" aria-label="Select aircraft">
              {aircraft.map((p) => (
                <TabsTrigger value={p.id} key={p.id}>
                  {p.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {aircraft.map((p) => (
              <TabsContent key={p.id} value={p.id}>
                <AircraftStage product={p} moving={moving} />
                <div className="aircraft-information">
                  <div>
                    <p className="eyebrow">{p.type}</p>
                    <h3>{p.title}</h3>
                  </div>
                  <div>
                    <p>{p.description}</p>
                    <button className="line-link" onClick={() => setSpec(true)}>
                      Explore {p.name}
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="aircraft-specs">
                    {p.stats.map(([n, label]) => (
                      <div key={label}>
                        <strong>{n}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="field-section" id="in-the-field">
          <img
            src={asset("/assets/agriculture.jpg")}
            alt="Fuselage agricultural drone operating above crops"
            loading="lazy"
          />
          <div className="field-shade" />
          <div className="field-top">
            <span className="eyebrow">PROVING GROUND / THE REAL WORLD</span>
            <span>KERALA, INDIA</span>
          </div>
          <Reveal className="field-copy">
            <h2>
              NOT JUST
              <br />A DIFFERENT VIEW.
              <br />
              <span>A DIFFERENCE.</span>
            </h2>
            <p>
              Technology only matters when it makes a difference on the ground.
              Our work starts in the field—and comes back to the people who
              depend on it.
            </p>
            <button className="film-button" onClick={() => setFilm(true)}>
              <span>
                <Play size={14} fill="currentColor" />
              </span>
              Watch Fuselage in the field
            </button>
          </Reveal>
          <div className="field-caption">
            REAL AIRCRAFT. REAL OPERATIONS. REAL PURPOSE.
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-eyebrow">
            <span className="tiny-cross">+</span> THE NEXT CHAPTER STARTS WITH
            YOU <span>04 — 04</span>
          </div>
          <Reveal>
            <div className="contact-heading">
              <h2>
                WHERE
                <br />
                DO WE GO
                <br />
                <span>NEXT?</span>
              </h2>
              <a
                className="contact-orb"
                href={`mailto:info@fuselage.co.in?subject=${encodeURIComponent("A new mission — " + region)}`}
              >
                <Plus size={38} strokeWidth={1} />
                <span>
                  START A<br />
                  CONVERSATION
                </span>
              </a>
            </div>
          </Reveal>
          <div className="contact-bottom">
            <p>
              {region === "India"
                ? "From a field in India to a mission anywhere."
                : "New perspectives for agriculture, infrastructure and emergency response in Canada."}
              <br />
              Tell us what you want to make possible.
            </p>
            <a href="mailto:info@fuselage.co.in">info@fuselage.co.in</a>
          </div>
        </section>

        <footer>
          <div className="footer-main">
            <a href="#top" aria-label="Back to Fuselage home">
              <img
                src={asset("/assets/fuselage-logo.svg")}
                width="172"
                height="51"
                alt="Fuselage Innovations"
              />
            </a>
            <div>
              <span>INDIA</span>
              <p>
                Maker Village, Kerala Technology
                <br />
                Innovation Zone, Kochi 683503
              </p>
            </div>
            <div>
              <span>CANADA</span>
              <p>
                325 Front St W<br />
                Toronto, ON M5V 2Y1
              </p>
            </div>
            <div>
              <a href="tel:+917012937807">+91 70129 37807</a>
              <a
                href="https://fuselage.co.in/contact-us/"
                target="_blank"
                rel="noreferrer"
              >
                Services & support
              </a>
            </div>
          </div>
          <div className="footer-end">
            <span>© {new Date().getFullYear()} Fuselage Innovations</span>
            <span>ENGINEERED TO GO FURTHER.</span>
            <a href="#top">Back to the sky</a>
          </div>
        </footer>

        <button
          className="motion-control"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={paused ? "Resume ambient motion" : "Pause ambient motion"}
        >
          {moving ? <CirclePause size={17} /> : <CirclePlay size={17} />}
          <span>{moving ? "Pause motion" : "Motion paused"}</span>
        </button>

        <Dialog open={menu} onOpenChange={setMenu}>
          <DialogContent className="nav-dialog">
            <DialogTitle className="eyebrow">EXPLORE FUSELAGE</DialogTitle>
            <DialogDescription className="sr-only">
              Navigate to a section of the homepage.
            </DialogDescription>
            <nav>
              {[
                ["Our worlds", "worlds"],
                ["Our aircraft", "aircraft"],
                ["Our purpose", "purpose"],
                ["In the field", "in-the-field"],
                ["Let’s talk", "contact"],
              ].map(([label, id], i) => (
                <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>
                  <span>0{i + 1}</span>
                  {label}
                  <Plus />
                </a>
              ))}
            </nav>
            <p>INDIA · CANADA</p>
          </DialogContent>
        </Dialog>
        <Dialog open={film} onOpenChange={setFilm}>
          <DialogContent className="film-dialog">
            <DialogTitle>Fuselage. In the field.</DialogTitle>
            <DialogDescription>
              Real operations from Fuselage Innovations.
            </DialogDescription>
            {film && (
              <video
                src={FILM}
                controls
                playsInline
                autoPlay
                preload="metadata"
                poster={asset("/assets/field.jpg")}
              />
            )}
            <a href={FILM} target="_blank" rel="noreferrer">
              Open film in a new tab
            </a>
          </DialogContent>
        </Dialog>
        <Dialog open={spec} onOpenChange={setSpec}>
          <DialogContent className="spec-dialog">
            <DialogTitle>{selected.name}</DialogTitle>
            <DialogDescription>{selected.description}</DialogDescription>
            <img src={selected.image} alt={selected.name} />
            <div className="spec-features">
              {selected.features.map((f) => (
                <p key={f}>
                  <Plus size={14} />
                  {f}
                </p>
              ))}
            </div>
            <p className="spec-note">
              Figures from Fuselage’s published product information. Flight time
              varies with payload and operating conditions.
            </p>
            <a
              className="solid-button"
              href={selected.url}
              target="_blank"
              rel="noreferrer"
            >
              Full product information
              <Plus size={16} />
            </a>
            <a
              className="line-link"
              href={`mailto:info@fuselage.co.in?subject=${encodeURIComponent(selected.name + " enquiry")}`}
            >
              Enquire about {selected.name}
              <Plus size={16} />
            </a>
          </DialogContent>
        </Dialog>
      </main>
    </MotionConfig>
  );
}

function Hero({
  moving,
  region,
  onFilm,
}: {
  moving: boolean;
  region: string;
  onFilm: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.4, 0]);
  const droneX = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    ["0%", "12%", "80%"],
  );
  const droneY = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  const droneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-7, 8, -13]);
  const droneScale = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [1, 1.06, 0.65],
  );
  const mouseX = useMotionValue(0),
    mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 55, damping: 22 }),
    y = useSpring(mouseY, { stiffness: 55, damping: 22 });
  const tilt = useTransform(x, [-24, 24], [-2, 2]);
  function follow(e: PointerEvent<HTMLElement>) {
    if (!moving || e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - b.left) / b.width - 0.5) * 48);
    mouseY.set(((e.clientY - b.top) / b.height - 0.5) * 28);
  }
  return (
    <section
      ref={ref}
      className="hero-journey"
      aria-label="Welcome to Fuselage"
    >
      <div
        className="hero-stage"
        onPointerMove={follow}
        onPointerLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        <motion.div
          className="hero-environment"
          style={moving ? { scale: backgroundScale } : undefined}
        />
        <div className="hero-vignette" />
        <div className="atmosphere atmosphere-one" />
        <div className="atmosphere atmosphere-two" />
        <div className="hero-topline">
          <span className="eyebrow">
            <span className="mini-line" /> A NEW PERSPECTIVE ON POSSIBILITY
          </span>
          <span className="hero-edition">UAV / IOT / AI</span>
        </div>
        <motion.div
          className="hero-title"
          style={moving ? { y: titleY, opacity: titleOpacity } : undefined}
        >
          <h1>
            <motion.span
              initial={moving ? { y: "110%" } : false}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.15 }}
            >
              BEYOND
            </motion.span>
            <motion.span
              className="headline-outline"
              initial={moving ? { y: "110%", opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.25, ease, delay: 0.3 }}
            >
              BOUNDARIES.
            </motion.span>
          </h1>
        </motion.div>
        <motion.div
          className="hero-drone-track"
          style={
            moving
              ? { x: droneX, y: droneY, rotate: droneRotate, scale: droneScale }
              : { rotate: -7 }
          }
        >
          <motion.div
            className="hero-drone-pointer"
            style={moving ? { x, y, rotate: tilt } : undefined}
          >
            <motion.img
              className="hero-drone"
              src={asset("/assets/fia-large.png")}
              width="939"
              height="407"
              alt="FIA QD10 drone in flight"
              fetchPriority="high"
              draggable={false}
              initial={moving ? { opacity: 0, scale: 0.78, y: 80 } : false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, ease, delay: 0.35 }}
            />
            <div className={moving && visible ? "aircraft-hover" : ""}>
              <span className="aircraft-beacon beacon-left" />
              <span className="aircraft-beacon beacon-right" />
            </div>
          </motion.div>
        </motion.div>
        <motion.img
          className="distant-drone"
          src={asset("/assets/nireeksh.png")}
          alt=""
          aria-hidden="true"
          animate={
            moving && visible
              ? { x: [0, 45, 0], y: [0, -20, 0], rotate: [-12, -4, -12] }
              : { x: 0, y: 0, rotate: -8 }
          }
          transition={{
            duration: 13,
            repeat: moving && visible ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
        <div className="hero-bottom">
          <motion.div
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            <p>
              Intelligence above.
              <br />
              Extraordinary impact below.
            </p>
            <a href="#worlds" className="solid-button">
              Enter our world <Plus size={17} />
            </a>
          </motion.div>
          <button className="hero-film" onClick={onFilm}>
            <span className="film-play">
              <Play size={15} fill="currentColor" />
            </span>
            <span>
              THE WORLD OF FUSELAGE<small>Watch the film</small>
            </span>
          </button>
          <div className="hero-aircraft-label">
            <span className="eyebrow">FIA QD10</span>
            <p>Precision agriculture UAV</p>
            <div>
              <span>10 L PAYLOAD</span>
              <span>25 MIN FLIGHT</span>
            </div>
          </div>
        </div>
        <div className="hero-baseline">
          <span>
            {region === "India"
              ? "DESIGNED & ENGINEERED IN INDIA"
              : "FUSELAGE INNOVATIONS / CANADA"}
          </span>
          <a href="#purpose" className="scroll-cue">
            <span className="scroll-track">
              <i />
            </span>
            SCROLL TO TAKE FLIGHT
          </a>
          <span>01 / 04</span>
        </div>
        <div className="hero-side-label">
          DIFFERENT PERSPECTIVE. GREATER POSSIBILITY.
        </div>
      </div>
    </section>
  );
}

function AircraftStage({
  product,
  moving,
}: {
  product: (typeof aircraft)[number];
  moving: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const r = useTransform(scrollYProgress, [0, 0.5, 1], [-12, -3, 9]);
  const planeY = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -60]);
  const px = useMotionValue(0),
    py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 65, damping: 22 }),
    y = useSpring(py, { stiffness: 65, damping: 22 });
  return (
    <div
      ref={ref}
      className="aircraft-stage"
      onPointerMove={(e) => {
        if (!moving || e.pointerType !== "mouse") return;
        const b = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - b.left - b.width / 2) * 0.04);
        py.set((e.clientY - b.top - b.height / 2) * 0.06);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <span className="model-watermark" aria-hidden="true">
        {product.name}
      </span>
      <div className="technical-orbit orbit-one" />
      <div className="technical-orbit orbit-two" />
      <div className="technical-cross cross-one">+</div>
      <div className="technical-cross cross-two">+</div>
      <motion.div
        className="aircraft-float"
        style={moving ? { y: planeY, rotate: r } : undefined}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          style={moving ? { x, y } : undefined}
          animate={moving && visible ? { scale: [1, 1.025, 1] } : { scale: 1 }}
          transition={{ duration: 7, repeat: moving && visible ? Infinity : 0 }}
          loading="lazy"
          draggable={false}
        />
      </motion.div>
      <span className="aircraft-stage-label">
        <Crosshair size={16} /> {product.type}
      </span>
      <span className="stage-hint">
        {moving ? "MOVE TO EXPLORE" : "AIRCRAFT PROFILE"}
      </span>
    </div>
  );
}
