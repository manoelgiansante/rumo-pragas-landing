import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  Camera,
  Shield,
  Smartphone,
  Brain,
  BookOpen,
  Zap,
  WifiOff,
  Bell,
  History,
  ChevronRight,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowDown,
  Check,
  Star,
  FlaskConical,
  Globe,
  Crosshair,
  Activity,
  Database,
  Menu,
  Microscope,
  X,
} from "lucide-react";

// ========== ANIMATION PRIMITIVES ==========

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ========== ICONS ==========

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const AndroidIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.44-.59-3.03-.94-4.71-.94s-3.27.35-4.71.94L5.21 5.67c-.18-.28-.54-.37-.83-.22-.31.16-.42.54-.26.85L5.96 9.48C2.64 11.24.29 14.58.12 18.5h23.52c-.17-3.92-2.52-7.26-6.04-9.02zM7 15.25c-.69 0-1.25-.56-1.25-1.25S6.31 12.75 7 12.75s1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
  </svg>
);

// ========== BACKGROUND COMPONENTS ==========

function NeuralNetworkBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Neural nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 4) * 20}%`,
            width: i % 2 === 0 ? 3 : 2,
            height: i % 2 === 0 ? 3 : 2,
            background: i % 3 === 0 ? "rgba(220, 38, 38, 0.4)" : i % 3 === 1 ? "rgba(59, 130, 246, 0.3)" : "rgba(139, 92, 246, 0.3)",
          }}
          animate={{
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.6,
          }}
        />
      ))}
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
        <motion.line
          x1="10%" y1="15%" x2="32%" y2="35%"
          stroke="#DC2626" strokeWidth="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="32%" y1="35%" x2="54%" y2="55%"
          stroke="#3B82F6" strokeWidth="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
        <motion.line
          x1="54%" y1="55%" x2="76%" y2="35%"
          stroke="#DC2626" strokeWidth="0.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        <motion.line
          x1="21%" y1="75%" x2="65%" y2="15%"
          stroke="#8B5CF6" strokeWidth="0.3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        />
        <motion.line
          x1="76%" y1="35%" x2="88%" y2="75%"
          stroke="#DC2626" strokeWidth="0.3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse", delay: 1.5 }}
        />
      </svg>
    </div>
  );
}

function ScanLineEffect() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-specimen-glow/70 to-transparent"
      style={{ top: 0 }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
    />
  );
}

/** Decorative lab annotation placed absolutely */
function LabAnnotation({ text, className }: { text: string; className: string }) {
  return (
    <span className={`lab-annotation absolute ${className}`} aria-hidden="true">
      [{text}]
    </span>
  );
}

// ========== CONSTANTS ==========

const WA_URL = "https://wa.me/5517996581120?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Rumo%20Pragas.";

// Tailwind requires full class strings at build time — no dynamic interpolation
const ACCENT_CLASSES: Record<string, { border: string; borderHover: string; bg: string; text: string; corner: string }> = {
  "specimen-red": {
    border: "border-specimen-red/20",
    borderHover: "group-hover:border-specimen-red/40",
    bg: "bg-specimen-red/5",
    text: "text-specimen-red",
    corner: "bg-specimen-red/30",
  },
  "bio-green": {
    border: "border-bio-green/20",
    borderHover: "group-hover:border-bio-green/40",
    bg: "bg-bio-green/5",
    text: "text-bio-green",
    corner: "bg-bio-green/30",
  },
  "neural-purple": {
    border: "border-neural-purple/20",
    borderHover: "group-hover:border-neural-purple/40",
    bg: "bg-neural-purple/5",
    text: "text-neural-purple",
    corner: "bg-neural-purple/30",
  },
  "neural-blue": {
    border: "border-neural-blue/20",
    borderHover: "group-hover:border-neural-blue/40",
    bg: "bg-neural-blue/5",
    text: "text-neural-blue",
    corner: "bg-neural-blue/30",
  },
};

// Step card accents (40% opacity for corners, 25% for borders, 50% hover)
const STEP_ACCENT_CLASSES: Record<string, { corner: string; border: string; borderHover: string; bg: string; text: string }> = {
  "specimen-red": {
    corner: "bg-specimen-red/40",
    border: "border-specimen-red/25",
    borderHover: "group-hover:border-specimen-red/50",
    bg: "bg-specimen-red/5",
    text: "text-specimen-red",
  },
  "neural-blue": {
    corner: "bg-neural-blue/40",
    border: "border-neural-blue/25",
    borderHover: "group-hover:border-neural-blue/50",
    bg: "bg-neural-blue/5",
    text: "text-neural-blue",
  },
  "bio-green": {
    corner: "bg-bio-green/40",
    border: "border-bio-green/25",
    borderHover: "group-hover:border-bio-green/50",
    bg: "bg-bio-green/5",
    text: "text-bio-green",
  },
};

const FEATURES = [
  {
    icon: Camera,
    title: "Identificacao por Foto",
    description: "Aponte a camera para a praga ou doenca. A IA identifica em segundos com nome cientifico e nivel de confianca.",
    badge: "CORE",
    accent: "specimen-red",
  },
  {
    icon: BookOpen,
    title: "500+ Pragas Catalogadas",
    description: "Biblioteca completa com fotos, sintomas, ciclo de vida e metodos de controle. Funciona offline.",
    badge: "FREE",
    accent: "bio-green",
  },
  {
    icon: FlaskConical,
    title: "Tratamento Completo",
    description: "Recomendacao de controle quimico, biologico e preventivo com dosagens e periodos de carencia.",
    badge: "PRO",
    accent: "neural-purple",
  },
  {
    icon: History,
    title: "Historico de Diagnosticos",
    description: "Todos os diagnosticos salvos com data, localizacao e fotos. Acompanhe a evolucao das pragas na sua area.",
    badge: "CORE",
    accent: "specimen-red",
  },
  {
    icon: WifiOff,
    title: "Funciona Offline",
    description: "Biblioteca e historico disponiveis sem internet. Diagnosticos em fila sao processados quando o sinal voltar.",
    badge: "CORE",
    accent: "neural-blue",
  },
  {
    icon: Bell,
    title: "Alertas Regionais",
    description: "Notificacoes sobre surtos de pragas na sua regiao baseadas em dados climaticos e relatos da comunidade.",
    badge: "PRO",
    accent: "neural-purple",
  },
];

const TESTIMONIALS = [
  {
    name: "Carlos Eduardo",
    role: "Agronomo, Ribeirao Preto - SP",
    text: "Uso o Rumo Pragas diariamente nas minhas consultorias. A precisao da IA me surpreendeu — identificou ferrugem asiatica em estagio inicial que eu quase passei batido.",
    stars: 5,
    caseId: "001",
  },
  {
    name: "Ana Paula Ferreira",
    role: "Produtora de cafe, Patrocinio - MG",
    text: "Meus funcionarios usam no campo e ja conseguem tomar decisoes rapidas sem esperar minha visita. O plano de tratamento e muito pratico.",
    stars: 5,
    caseId: "002",
  },
  {
    name: "Rodrigo Mendes",
    role: "Consultor MIP, Sorriso - MT",
    text: "O historico de diagnosticos me ajuda a montar relatorios para os clientes. A biblioteca offline e essencial para quem trabalha em areas sem sinal.",
    stars: 5,
    caseId: "003",
  },
];

// ========== MAIN COMPONENT ==========

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans bg-lab-black text-microscope grain-overlay">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-specimen-red focus:px-4 focus:py-2 focus:text-white focus:font-semibold focus:text-sm"
      >
        Pular para o conteudo
      </a>

      {/* =============== HEADER =============== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-lab-black/90 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(220,38,38,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 lg:h-18 items-center justify-between">
          <button
            className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
          >
            <div className="h-9 w-9 border border-specimen-red/40 bg-specimen-red/10 flex items-center justify-center rounded-none">
              <Crosshair className="w-4 h-4 text-specimen-red" />
            </div>
            <span className="font-mono text-sm font-bold tracking-wider text-microscope uppercase">
              Rumo<span className="text-specimen-red">_</span>Pragas
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-0">
            {[
              { name: "Como Funciona", id: "como-funciona" },
              { name: "Recursos", id: "recursos" },
              { name: "IA Demo", id: "demo" },
              { name: "Precos", id: "precos" },
              { name: "Download", id: "download" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-specimen-text hover:text-specimen-red transition-colors duration-300 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-5 h-9 font-mono text-[10px] font-bold tracking-[0.2em] uppercase bg-transparent border border-lab-border text-specimen-text hover:border-specimen-red/40 hover:text-specimen-red transition-all duration-400 cursor-pointer"
          >
            <WhatsAppIcon className="w-3 h-3" />
            Contato
          </a>

          {/* Mobile hamburger button */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 border border-lab-border text-specimen-text hover:border-specimen-red/40 hover:text-specimen-red transition-all duration-300 cursor-pointer bg-transparent"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 top-16 bg-lab-black/60 backdrop-blur-sm lg:hidden z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              {/* Menu panel */}
              <motion.nav
                className="absolute top-full left-0 right-0 bg-lab-black/95 backdrop-blur-2xl border-b border-lab-border lg:hidden z-50"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div className="container flex flex-col py-4 gap-1">
                  {[
                    { name: "Como Funciona", id: "como-funciona" },
                    { name: "Recursos", id: "recursos" },
                    { name: "IA Demo", id: "demo" },
                    { name: "Precos", id: "precos" },
                    { name: "Download", id: "download" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollTo(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-specimen-text hover:text-specimen-red hover:bg-specimen-red/5 transition-all duration-300 cursor-pointer text-left bg-transparent border-none"
                    >
                      {item.name}
                    </button>
                  ))}
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-specimen-text hover:text-specimen-red hover:bg-specimen-red/5 transition-all duration-300 cursor-pointer border-t border-lab-border mt-2 pt-4"
                  >
                    <WhatsAppIcon className="w-3 h-3" />
                    Contato via WhatsApp
                  </a>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        {/* =============== HERO =============== */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-[100vh] flex items-center overflow-hidden"
          aria-label="Rumo Pragas - Diagnostico com IA"
        >
          {/* Complex BG layers */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-lab-black" />
            <div className="absolute inset-0 microscope-grid" />
            <div className="absolute inset-0 crosshair-overlay" />
            <NeuralNetworkBg />
            {/* Specimen red radial glow */}
            <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-specimen-red/6 rounded-full blur-[200px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-neural-blue/4 rounded-full blur-[150px]" />
          </div>

          {/* Lab annotations scattered */}
          <LabAnnotation text="v2.1" className="top-28 left-[8%] hidden lg:block" />
          <LabAnnotation text="deep learning" className="top-[40%] right-[5%] hidden lg:block" />
          <LabAnnotation text="98.7% accuracy" className="bottom-[25%] left-[6%] hidden lg:block" />

          <div className="container relative z-10 py-32 lg:py-40">
            {/* LEFT-HEAVY ASYMMETRIC: 65% text, 35% phone */}
            <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-8 items-center">
              {/* Left — Text block (dominant) */}
              <div className="max-w-3xl">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-3 mb-8">
                    <motion.div
                      className="w-2 h-2 bg-specimen-red"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="badge-lab">
                      <Brain className="w-3 h-3" />
                      Neural Net // 95% precisao
                    </span>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className="mb-3">
                    <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-specimen-red/60">
                      // sistema de diagnostico
                    </span>
                  </div>
                  <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-microscope font-bold leading-[1.08] tracking-tight mb-4">
                    Identifique pragas
                    <br />
                    <span
                      className="glitch-text text-specimen-red"
                      data-text="em segundos com IA."
                    >
                      em segundos com IA.
                    </span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="text-base md:text-lg text-specimen-text max-w-lg leading-relaxed font-light mb-10">
                    Fotografe a praga ou doenca na sua lavoura. A inteligencia artificial
                    identifica, classifica e recomenda o tratamento completo — tudo em
                    segundos, direto no seu celular.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-3 mb-14">
                    <button
                      onClick={() => scrollTo("download")}
                      className="btn-specimen px-10 h-13 flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <Camera className="w-4 h-4" />
                        Baixar Gratis
                      </span>
                    </button>
                    <button
                      onClick={() => scrollTo("como-funciona")}
                      className="bg-transparent border border-lab-border text-microscope hover:border-specimen-red/30 hover:text-specimen-red font-mono text-[11px] font-bold tracking-[0.15em] uppercase px-8 h-13 flex items-center justify-center gap-3 transition-all duration-400 cursor-pointer"
                    >
                      Como Funciona
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <div className="flex items-center gap-10 lg:gap-12">
                    {[
                      { value: 500, suffix: "+", label: "Pragas catalogadas" },
                      { value: 95, suffix: "%", label: "Precisao da IA" },
                      { value: 100, suffix: "%", label: "Funciona offline" },
                    ].map((stat, i) => (
                      <div key={stat.label} className="flex items-center gap-10 lg:gap-12">
                        {i > 0 && (
                          <div className="w-px h-8 bg-lab-border -ml-5 lg:-ml-6" />
                        )}
                        <div>
                          <p className="font-mono text-2xl lg:text-3xl font-bold text-microscope">
                            <CountUp end={stat.value} suffix={stat.suffix} />
                          </p>
                          <p className="font-mono text-[9px] text-muted-text mt-1 tracking-[0.2em] uppercase">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {/* Right — Phone Mockup with Lab Scan Effect */}
              <ScrollReveal delay={0.3}>
                <div className="hidden lg:block relative">
                  {/* Glow behind phone */}
                  <div className="absolute -inset-16 bg-specimen-red/8 rounded-full blur-[120px]" />

                  {/* Phone frame shifted to overlap into next section */}
                  <div className="relative mx-auto w-[280px] translate-y-16">
                    <div className="relative bg-lab-dark border border-lab-border rounded-[2.5rem] p-2.5 shadow-2xl shadow-black/60">
                      <div className="rounded-[2rem] overflow-hidden relative">
                        {/* Simulated camera screen */}
                        <div className="aspect-[9/19.5] bg-gradient-to-br from-[#040D04] via-[#071407] to-[#030A03] relative">
                          {/* Leaf shape */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              <div className="w-36 h-52 bg-gradient-to-br from-bio-dim/60 via-bio-green/35 to-bio-green/20 rounded-[60%_40%_60%_40%] rotate-12 blur-[1px]" />
                              {/* Disease spots */}
                              <div className="absolute top-8 left-9 w-4 h-4 rounded-full bg-specimen-red/50 blur-[2px]" />
                              <div className="absolute top-16 right-7 w-3 h-3 rounded-full bg-specimen-red/40 blur-[2px]" />
                              <div className="absolute bottom-18 left-12 w-5 h-5 rounded-full bg-specimen-red/45 blur-[2px]" />
                            </div>
                          </div>

                          {/* Scan line */}
                          <ScanLineEffect />

                          {/* Targeting brackets */}
                          <div className="absolute top-14 left-6 w-8 h-8 border-0 targeting-bracket targeting-bracket-tl" />
                          <div className="absolute top-14 right-6 w-8 h-8 border-0 targeting-bracket targeting-bracket-tr" />
                          <div className="absolute bottom-24 left-6 w-8 h-8 border-0 targeting-bracket targeting-bracket-bl" />
                          <div className="absolute bottom-24 right-6 w-8 h-8 border-0 targeting-bracket targeting-bracket-br" />

                          {/* Top status — ANALYZING blink */}
                          <div className="absolute top-4 left-0 right-0 flex justify-center">
                            <div className="px-3 py-1 bg-lab-black/60 backdrop-blur-md border border-specimen-red/20">
                              <p className="font-mono text-[9px] text-specimen-glow font-bold tracking-[0.3em] blink">
                                ANALYZING...
                              </p>
                            </div>
                          </div>

                          {/* Bottom result */}
                          <motion.div
                            className="absolute bottom-3 left-2.5 right-2.5 bg-lab-black/70 backdrop-blur-xl border border-lab-border p-2.5"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 2, duration: 0.8 }}
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-1.5 h-1.5 bg-bio-green animate-pulse" />
                              <span className="font-mono text-[8px] text-bio-green font-bold tracking-[0.2em]">IDENTIFIED</span>
                            </div>
                            <p className="font-mono text-[11px] text-microscope font-bold">Ferrugem Asiatica</p>
                            <p className="font-mono text-[9px] text-specimen-text italic">Phakopsora pachyrhizi</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="flex-1 h-[3px] bg-lab-border overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-specimen-red to-bio-green"
                                  initial={{ width: 0 }}
                                  animate={{ width: "96%" }}
                                  transition={{ delay: 2.5, duration: 1.5 }}
                                />
                              </div>
                              <span className="font-mono text-[9px] text-bio-green font-bold">96%</span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      {/* Notch */}
                      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-lab-dark rounded-b-xl" />
                    </div>

                    {/* Floating lab badges */}
                    <motion.div
                      className="absolute -right-20 top-16 lab-card px-3 py-1.5 flex items-center gap-2"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Database className="w-3 h-3 text-neural-blue" />
                      <span className="font-mono text-[9px] text-specimen-text font-bold tracking-wider">DEEP_LEARNING</span>
                    </motion.div>

                    <motion.div
                      className="absolute -left-20 bottom-28 lab-card px-3 py-1.5 flex items-center gap-2"
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                      <Activity className="w-3 h-3 text-specimen-red" />
                      <span className="font-mono text-[9px] text-specimen-text font-bold tracking-wider">95%_ACC</span>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-[9px] text-muted-text tracking-[0.4em] uppercase">
              Scroll
            </span>
            <ArrowDown className="w-3 h-3 text-muted-text" />
          </motion.div>
        </motion.section>

        {/* Section divider */}
        <div className="section-divider" />

        {/* =============== HOW AI WORKS — 3 STEPS =============== */}
        <section
          className="relative py-24 md:py-32"
          id="como-funciona"
        >
          <div className="absolute inset-0 neural-bg" />
          <div className="container relative z-10">
            <ScrollReveal className="text-center max-w-2xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="specimen-line" />
                <span className="badge-lab">Protocolo</span>
                <div className="specimen-line" style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl text-microscope font-bold mb-5">
                Tres passos para o
                <br />
                <span className="text-specimen-red">
                  diagnostico perfeito.
                </span>
              </h2>
              <p className="text-sm text-specimen-text leading-relaxed font-light">
                Sem agronomos presentes. Sem esperar dias por laudos.
                O resultado sai na hora, direto no seu celular.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-4 relative" staggerDelay={0.2}>
              {/* Processing connection line (desktop) */}
              <div className="hidden md:block absolute top-1/2 left-[33%] -translate-y-1/2 w-[34%] z-20 pointer-events-none">
                <div className="h-[2px] processing-bar" />
              </div>

              {[
                {
                  step: "01",
                  icon: Camera,
                  title: "Tire uma Foto",
                  description: "Aponte a camera para a folha, fruto ou caule afetado. A IA precisa de apenas uma foto.",
                  color: "specimen-red",
                },
                {
                  step: "02",
                  icon: Brain,
                  title: "IA Analisa",
                  description: "Redes neurais profundas identificam a praga em segundos, com nome cientifico e confianca.",
                  color: "neural-blue",
                },
                {
                  step: "03",
                  icon: Check,
                  title: "Diagnostico + Tratamento",
                  description: "Controle quimico, biologico e preventivo — tudo detalhado e pronto para aplicar no campo.",
                  color: "bio-green",
                },
              ].map((item) => (
                <StaggerItem key={item.step}>
                  <div className="lab-card p-7 lg:p-8 text-center space-y-5 group relative overflow-hidden">
                    {/* Corner accent */}
                    <div className={`absolute top-0 left-0 w-8 h-[2px] ${STEP_ACCENT_CLASSES[item.color].corner}`} />
                    <div className={`absolute top-0 left-0 h-8 w-[2px] ${STEP_ACCENT_CLASSES[item.color].corner}`} />

                    <div className="relative z-10">
                      {/* Step number */}
                      <div className="font-mono text-[10px] font-bold tracking-[0.3em] text-muted-text mb-4">
                        STEP_{item.step}
                      </div>

                      <div className="relative mx-auto w-16 h-16 mb-3">
                        <motion.div
                          className={`w-16 h-16 border ${STEP_ACCENT_CLASSES[item.color].border} ${STEP_ACCENT_CLASSES[item.color].bg} flex items-center justify-center transition-all duration-500 ${STEP_ACCENT_CLASSES[item.color].borderHover}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <item.icon className={`w-7 h-7 ${STEP_ACCENT_CLASSES[item.color].text}`} />
                        </motion.div>
                      </div>

                      <h3 className="font-mono text-lg text-microscope font-bold mt-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-specimen-text leading-relaxed font-light max-w-xs mx-auto mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="section-divider" />

        {/* =============== FEATURES — HEXAGONAL GRID =============== */}
        <section className="py-24 md:py-32 relative" id="recursos">
          <LabAnnotation text="feature_map" className="top-12 right-[8%] hidden lg:block" />
          <div className="container">
            <ScrollReveal className="mb-20">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="specimen-line" />
                    <span className="badge-lab">Recursos</span>
                  </div>
                  <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl text-microscope font-bold">
                    Tudo que voce precisa
                    <br />
                    <span className="text-specimen-red">
                      para proteger sua lavoura.
                    </span>
                  </h2>
                </div>
                <p className="text-sm text-specimen-text max-w-md leading-relaxed font-light lg:pb-2">
                  Do diagnostico ao monitoramento regional — um ecossistema
                  completo de ferramentas de protecao vegetal.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="hex-grid" staggerDelay={0.1}>
              {FEATURES.map((feature, idx) => (
                <StaggerItem key={feature.title}>
                  <div className="lab-card p-6 lg:p-7 h-full group relative overflow-hidden">
                    {/* Corner bracket */}
                    <div className={`absolute top-0 right-0 w-6 h-[1px] ${ACCENT_CLASSES[feature.accent].corner}`} />
                    <div className={`absolute top-0 right-0 h-6 w-[1px] ${ACCENT_CLASSES[feature.accent].corner}`} />
                    <div className={`absolute bottom-0 left-0 w-6 h-[1px] ${ACCENT_CLASSES[feature.accent].corner}`} />
                    <div className={`absolute bottom-0 left-0 h-6 w-[1px] ${ACCENT_CLASSES[feature.accent].corner}`} />

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <motion.div
                          className={`w-11 h-11 border ${ACCENT_CLASSES[feature.accent].border} ${ACCENT_CLASSES[feature.accent].bg} flex items-center justify-center ${ACCENT_CLASSES[feature.accent].borderHover} transition-all duration-500`}
                          animate={idx % 2 === 0
                            ? { scale: [1, 1.05, 1] }
                            : { rotate: [0, 3, 0, -3, 0] }
                          }
                          transition={{ duration: 4 + idx * 0.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <feature.icon className={`w-5 h-5 ${ACCENT_CLASSES[feature.accent].text}`} />
                        </motion.div>
                        <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-muted-text border border-lab-border px-2 py-0.5">
                          {feature.badge}
                        </span>
                      </div>
                      <h3 className="font-mono text-base text-microscope font-bold">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-specimen-text leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="section-divider" />

        {/* =============== AI DEMO — FULL-BLEED SPLIT SCREEN =============== */}
        <section className="py-24 md:py-32 relative overflow-hidden" id="demo">
          {/* Data stream matrix background */}
          <div className="absolute inset-0 data-stream-bg opacity-30" />
          <div className="absolute inset-0 neural-bg" />
          {/* Big specimen glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-specimen-red/4 rounded-full blur-[200px]" />

          <LabAnnotation text="neural_inference" className="top-16 left-[6%] hidden lg:block" />
          <LabAnnotation text="confidence: 0.96" className="bottom-20 right-[8%] hidden lg:block" />

          <div className="container relative z-10">
            <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="specimen-line" />
                <span className="badge-lab">
                  <Microscope className="w-3 h-3" />
                  Laboratorio IA
                </span>
                <div className="specimen-line" style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl text-microscope font-bold mb-5">
                Veja a IA{" "}
                <span className="text-specimen-red">trabalhando.</span>
              </h2>
              <p className="text-sm text-specimen-text leading-relaxed font-light">
                De uma simples foto ao diagnostico completo com tratamento.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="max-w-5xl mx-auto">
                {/* Split screen with processing bar */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_60px_1fr] gap-0 items-stretch">

                  {/* LEFT — INPUT: Photo simulation */}
                  <div className="lab-card p-5 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <Camera className="w-3.5 h-3.5 text-muted-text" />
                      <span className="font-mono text-[9px] text-muted-text font-bold tracking-[0.2em] uppercase">Input // foto_enviada</span>
                    </div>
                    <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-[#040D04] via-[#071407] to-[#030A03] border border-lab-border">
                      {/* Simulated leaf with disease */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-48 h-64 bg-gradient-to-br from-bio-dim/50 via-bio-green/30 to-bio-green/20 rounded-[55%_45%_60%_40%] rotate-6" />
                          <div className="absolute top-10 left-10 w-5 h-5 rounded-full bg-[#8B4513]/50 blur-[1px]" />
                          <div className="absolute top-22 right-8 w-4 h-4 rounded-full bg-[#8B4513]/40 blur-[1px]" />
                          <div className="absolute bottom-22 left-14 w-6 h-6 rounded-full bg-[#8B4513]/45 blur-[1px]" />
                          <div className="absolute top-32 left-18 w-3 h-3 rounded-full bg-[#8B4513]/35 blur-[1px]" />
                        </div>
                      </div>
                      {/* Scan overlay */}
                      <div className="absolute inset-0 border border-specimen-red/15">
                        <ScanLineEffect />
                      </div>
                      {/* AI targeting boxes */}
                      <motion.div
                        className="absolute top-[25%] left-[18%] w-14 h-14 border border-specimen-glow/40"
                        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute top-[50%] right-[20%] w-10 h-10 border border-specimen-glow/30"
                        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      />
                      {/* Coordinate readout */}
                      <div className="absolute bottom-2 left-2 font-mono text-[8px] text-specimen-red/50">
                        x:234 y:891 | 4032x3024px
                      </div>
                    </div>
                  </div>

                  {/* CENTER — Processing Pipeline */}
                  <div className="hidden lg:flex flex-col items-center justify-center py-8">
                    <div className="w-[2px] flex-1 processing-bar" />
                    <motion.div
                      className="my-3 w-10 h-10 border border-specimen-red/30 bg-lab-dark flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-4 h-4 text-specimen-red" />
                    </motion.div>
                    <div className="w-[2px] flex-1 processing-bar" />
                  </div>

                  {/* Mobile processing bar */}
                  <div className="lg:hidden h-[2px] processing-bar my-0" />

                  {/* RIGHT — OUTPUT: Diagnosis result */}
                  <div className="lab-card p-5 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-3.5 h-3.5 text-specimen-red" />
                      <span className="font-mono text-[9px] text-specimen-red font-bold tracking-[0.2em] uppercase">Output // diagnostico</span>
                    </div>

                    <div className="space-y-4">
                      {/* Confidence */}
                      <div className="lab-card p-3.5 hover:transform-none">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-mono text-[9px] text-muted-text font-bold tracking-[0.2em] uppercase">Confianca</span>
                          <span className="font-mono text-xl text-bio-green font-bold">96%</span>
                        </div>
                        <div className="h-[3px] bg-lab-border overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-specimen-red via-neural-blue to-bio-green"
                            initial={{ width: 0 }}
                            whileInView={{ width: "96%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Pest name */}
                      <div className="lab-card p-3.5 hover:transform-none">
                        <p className="font-mono text-[9px] text-muted-text mb-1 tracking-[0.2em] uppercase">Praga Identificada</p>
                        <p className="font-mono text-lg text-microscope font-bold">Ferrugem Asiatica</p>
                        <p className="font-mono text-xs text-specimen-text italic">Phakopsora pachyrhizi</p>
                        <div className="flex gap-2 mt-2.5">
                          <span className="px-2 py-0.5 font-mono text-[8px] font-bold bg-specimen-red/10 text-specimen-red border border-specimen-red/20 tracking-wider">FUNGICA</span>
                          <span className="px-2 py-0.5 font-mono text-[8px] font-bold bg-specimen-glow/8 text-specimen-glow border border-specimen-glow/20 tracking-wider">ALTA SEVERIDADE</span>
                        </div>
                      </div>

                      {/* Treatment */}
                      <div className="lab-card p-3.5 hover:transform-none">
                        <p className="font-mono text-[9px] text-muted-text mb-2.5 tracking-[0.2em] uppercase">Tratamento Recomendado</p>
                        <div className="space-y-2">
                          {[
                            { label: "Quimico", text: "Trifloxistrobina + Protioconazol", icon: FlaskConical },
                            { label: "Biologico", text: "Bacillus subtilis", icon: Shield },
                            { label: "Preventivo", text: "Rotacao de culturas + variedades resistentes", icon: Zap },
                          ].map((t) => (
                            <div key={t.label} className="flex items-start gap-2.5 py-1.5 border-b border-lab-border last:border-0">
                              <t.icon className="w-3.5 h-3.5 text-bio-green mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-mono text-[8px] text-bio-green font-bold tracking-[0.2em] uppercase">{t.label}</p>
                                <p className="text-xs text-specimen-text font-light">{t.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="section-divider" />

        {/* =============== PRICING =============== */}
        <section className="py-24 md:py-32 relative" id="precos">
          <div className="container">
            <ScrollReveal className="text-center max-w-2xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="specimen-line" />
                <span className="badge-lab">Planos</span>
                <div className="specimen-line" style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl text-microscope font-bold mb-5">
                Comece gratis.{" "}
                <span className="text-specimen-red">Evolua quando precisar.</span>
              </h2>
              <p className="text-sm text-specimen-text leading-relaxed font-light">
                Sem fidelidade, sem surpresas. Cancele quando quiser.
              </p>
            </ScrollReveal>

            {/* OVERSIZED Free card + smaller Pro card offset */}
            <StaggerContainer className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto items-stretch" staggerDelay={0.15}>

              {/* Free — OVERSIZED */}
              <StaggerItem className="flex-[1.3]">
                <div className="lab-card p-8 lg:p-10 h-full space-y-6 relative overflow-hidden border-bio-green/20 hover:border-bio-green/40">
                  {/* Green glow top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-bio-green/50 to-transparent" />
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-20 bg-bio-green/10 rounded-full blur-3xl" />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-mono text-xl text-microscope font-bold uppercase tracking-wider">Gratis</h3>
                      <p className="text-xs text-specimen-text font-light mt-1">Para experimentar</p>
                    </div>
                    <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-bio-green border border-bio-green/30 bg-bio-green/5 px-2.5 py-1">
                      FREE
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-5xl lg:text-6xl text-microscope font-bold">R$ 0</span>
                    <span className="font-mono text-sm text-muted-text font-bold">/mes</span>
                  </div>

                  <ul className="space-y-3">
                    {[
                      "5 diagnosticos/mes",
                      "Biblioteca completa offline",
                      "Historico de diagnosticos",
                      "Mapa de surtos (visualizar)",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-specimen-text font-light">
                        <Check className="w-4 h-4 text-bio-green mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => scrollTo("download")}
                    className="w-full h-12 border border-bio-green/30 hover:border-bio-green/60 text-bio-green font-mono text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer bg-transparent hover:bg-bio-green/5"
                  >
                    Baixar Gratis
                  </button>
                </div>
              </StaggerItem>

              {/* Pro — smaller, offset */}
              <StaggerItem className="flex-1 lg:mt-8">
                <div className="relative lab-card p-7 lg:p-8 h-full space-y-5 border-specimen-red/25 hover:border-specimen-red/50 overflow-hidden">
                  {/* Red glow top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-specimen-red/50 to-transparent" />
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-16 bg-specimen-red/10 rounded-full blur-3xl" />

                  <div className="absolute -top-2.5 right-5">
                    <span className="px-3 py-1 bg-specimen-red text-white font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
                      Popular
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-mono text-lg text-microscope font-bold uppercase tracking-wider">Pro</h3>
                      <p className="text-xs text-specimen-text font-light mt-1">Ilimitado para profissionais</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-4xl text-microscope font-bold">R$ 29</span>
                    <span className="font-mono text-xs text-muted-text font-bold">/mes</span>
                  </div>

                  <ul className="space-y-2.5">
                    {[
                      "Diagnosticos ilimitados",
                      "Tudo do plano Gratis",
                      "Tratamento completo",
                      "Alertas regionais por IA",
                      "Previsao de risco climatico",
                      "Relatorios exportaveis (PDF)",
                      "Suporte prioritario",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-specimen-text font-light">
                        <Check className="w-3.5 h-3.5 text-specimen-red mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => scrollTo("download")}
                    className="btn-specimen w-full h-11 flex items-center justify-center cursor-pointer"
                  >
                    <span>Assinar Pro</span>
                  </button>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        <div className="section-divider" />

        {/* =============== TESTIMONIALS — CASE FILES =============== */}
        <section className="py-24 md:py-32 relative">
          <div className="absolute inset-0 neural-bg" />
          <div className="container relative z-10">
            <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="specimen-line" />
                <span className="badge-lab">Relatorios de Campo</span>
                <div className="specimen-line" style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-mono text-3xl md:text-4xl text-microscope font-bold mb-5">
                Quem usa,{" "}
                <span className="text-specimen-red">recomenda.</span>
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" staggerDelay={0.15}>
              {TESTIMONIALS.map((t) => (
                <StaggerItem key={t.name}>
                  <div className="lab-card p-6 lg:p-7 h-full space-y-4 relative overflow-hidden">
                    {/* Case file header */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-specimen-red/60 uppercase">
                        Case #{t.caseId}
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(t.stars)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-specimen-red fill-specimen-red" />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-specimen-text leading-relaxed font-light relative z-10">
                      "{t.text}"
                    </p>

                    <div className="pt-3 border-t border-lab-border">
                      <p className="font-mono text-xs font-bold text-microscope">{t.name}</p>
                      <p className="font-mono text-[10px] text-muted-text mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="section-divider" />

        {/* =============== DOWNLOAD CTA — Neural BG =============== */}
        <section className="relative py-24 md:py-32 overflow-hidden" id="download">
          {/* Full dark with neural network animated bg */}
          <div className="absolute inset-0 bg-lab-black" />
          <div className="absolute inset-0 microscope-grid" />
          <NeuralNetworkBg />
          {/* Dramatic red glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-specimen-red/6 rounded-full blur-[250px]" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-specimen-red/40 to-transparent" />

          <LabAnnotation text="download_module" className="top-12 left-[6%] hidden lg:block" />

          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <ScrollReveal>
                <div className="specimen-line mx-auto mb-6" />
                <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl text-microscope font-bold leading-[1.1]">
                  Proteja sua lavoura com
                  <br />
                  <span className="text-specimen-red">
                    inteligencia artificial.
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-base text-specimen-text max-w-xl mx-auto leading-relaxed font-light">
                  Baixe gratuitamente e comece a diagnosticar pragas com IA
                  agora mesmo. Disponivel para iOS e Android.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <a
                    href="https://apps.apple.com/br/app/rumo-pragas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-8 h-13 bg-microscope text-lab-black font-mono text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,250,251,0.15)] cursor-pointer"
                  >
                    <AppleIcon />
                    App Store
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.agrorumo.rumopragas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-8 h-13 bg-microscope text-lab-black font-mono text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,250,251,0.15)] cursor-pointer"
                  >
                    <AndroidIcon />
                    Google Play
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex justify-center gap-8 pt-4 text-muted-text">
                  {[
                    { icon: Shield, text: "Gratuito para comecar" },
                    { icon: Smartphone, text: "iOS & Android" },
                    { icon: Globe, text: "PT & ES" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.15em] uppercase">
                      <Icon className="w-3 h-3" />
                      {text}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* =============== FAQ =============== */}
        <section className="py-24 md:py-32">
          <div className="container max-w-3xl">
            <ScrollReveal className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="specimen-line" />
                <span className="badge-lab">FAQ</span>
                <div className="specimen-line" style={{ transform: "scaleX(-1)" }} />
              </div>
              <h2 className="font-mono text-3xl md:text-4xl text-microscope font-bold">
                Perguntas{" "}
                <span className="text-specimen-red">frequentes.</span>
              </h2>
            </ScrollReveal>

            <StaggerContainer className="space-y-3" staggerDelay={0.08}>
              {[
                {
                  q: "O app funciona sem internet?",
                  a: "Sim! A biblioteca de pragas funciona 100% offline. O diagnostico por IA precisa de conexao para enviar a foto, mas se voce estiver sem sinal, a foto fica na fila e e processada automaticamente quando a conexao voltar.",
                },
                {
                  q: "Quais culturas o app identifica?",
                  a: "Cobrimos soja, milho, cafe, algodao, cana-de-acucar, trigo, feijao, arroz e mais. Estamos expandindo para novas culturas a cada atualizacao.",
                },
                {
                  q: "A IA e confiavel?",
                  a: "Nossa IA tem 95% de taxa de acerto, treinada com milhares de imagens reais. Cada diagnostico vem com nivel de confianca (%) para total transparencia. Para casos criticos, sempre recomendamos confirmar com um agronomo.",
                },
                {
                  q: "Posso cancelar minha assinatura?",
                  a: "Sim, a qualquer momento. Sem fidelidade, sem multa. Cancele diretamente pelo app ou pela loja (App Store / Google Play).",
                },
                {
                  q: "Como a IA e diferente de pesquisar no Google?",
                  a: "A IA analisa a foto da SUA planta, com a doenca no estagio exato em que esta. Google te da resultados genericos. Nosso diagnostico e personalizado, com tratamento especifico para a severidade encontrada.",
                },
              ].map((faq, i) => (
                <StaggerItem key={i}>
                  <details className="group lab-card p-5 lg:p-6 cursor-pointer">
                    <summary className="flex items-center justify-between font-mono text-sm font-bold text-microscope list-none">
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[9px] text-specimen-red/50 tracking-[0.2em]">Q.{String(i + 1).padStart(2, "0")}</span>
                        {faq.q}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-text transition-transform duration-300 group-open:rotate-90 flex-shrink-0 ml-4" />
                    </summary>
                    <p className="text-sm text-specimen-text leading-relaxed font-light mt-3 pt-3 border-t border-lab-border pl-10">
                      {faq.a}
                    </p>
                  </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>

      {/* =============== FOOTER =============== */}
      <footer className="relative">
        <div className="section-divider" />
        <div className="absolute inset-0 bg-gradient-to-b from-lab-black to-[#020409]" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 border border-specimen-red/40 bg-specimen-red/10 flex items-center justify-center">
                  <Crosshair className="w-4 h-4 text-specimen-red" />
                </div>
                <span className="font-mono text-sm font-bold tracking-wider text-microscope uppercase">
                  Rumo<span className="text-specimen-red">_</span>Pragas
                </span>
              </div>
              <p className="text-specimen-text text-sm leading-relaxed font-light max-w-xs">
                Diagnostico inteligente de pragas com inteligencia artificial.
                Parte do ecossistema AgroRumo.
              </p>
              <div className="specimen-line" />
            </div>

            {/* Links */}
            <div>
              <h4 className="font-mono font-bold text-muted-text text-[10px] uppercase tracking-[0.25em] mb-5">
                Produto
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "Como Funciona", id: "como-funciona" },
                  { name: "Recursos", id: "recursos" },
                  { name: "Precos", id: "precos" },
                  { name: "Download", id: "download" },
                ].map((l) => (
                  <li key={l.name}>
                    <button
                      onClick={() => scrollTo(l.id)}
                      className="text-specimen-text text-sm hover:text-specimen-red transition-colors duration-300 cursor-pointer font-light bg-transparent border-none p-0"
                    >
                      {l.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ecossistema */}
            <div>
              <h4 className="font-mono font-bold text-muted-text text-[10px] uppercase tracking-[0.25em] mb-5">
                Ecossistema AgroRumo
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "AgroRumo", href: "https://agrorumo.com" },
                  { name: "Rumo Maquinas", href: "https://controledemaquina.com.br" },
                  { name: "CampoVivo", href: "https://campovivo-landing.vercel.app" },
                ].map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-specimen-text text-sm hover:text-specimen-red transition-colors duration-300 cursor-pointer font-light flex items-center gap-1 group"
                    >
                      {l.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="font-mono font-bold text-muted-text text-[10px] uppercase tracking-[0.25em] mb-5">
                Contato
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:contato@agrorumo.com"
                  className="flex items-center gap-3 text-specimen-text text-sm hover:text-microscope transition-colors duration-300 font-light"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  contato@agrorumo.com
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-specimen-text text-sm hover:text-microscope transition-colors duration-300 font-light"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  (17) 99658-1120
                </a>
                <div className="flex items-center gap-3 text-specimen-text text-sm font-light">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  Sao Jose do Rio Preto — SP
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-lab-border py-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="font-mono text-muted-text text-[10px] tracking-[0.1em]">
              &copy; 2026 AgroRumo Tecnologia LTDA. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 font-mono text-[10px] text-muted-text tracking-[0.1em]">
              <a
                href="https://praga.agrorumo.com/privacidade.html"
                className="hover:text-specimen-text transition-colors cursor-pointer"
              >
                Privacidade
              </a>
              <a
                href="https://praga.agrorumo.com/termos.html"
                className="hover:text-specimen-text transition-colors cursor-pointer"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
        aria-label="Fale conosco no WhatsApp"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
          <div className="relative bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl transition-all duration-400 hover:scale-105">
            <WhatsAppIcon className="w-6 h-6" />
          </div>
        </div>
      </a>
    </div>
  );
}
