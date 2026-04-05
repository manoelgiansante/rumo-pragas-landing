import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowDown,
  Camera,
  Shield,
  Zap,
  Smartphone,
  Bug,
  Leaf,
  Map,
  Users,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Star,
  Globe,
  Clock,
  Sparkles,
  Target,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Brain,
  MessageCircle,
  BookOpen,
  TrendingUp,
} from "lucide-react";

// ========== ANIMATIONS ==========
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
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
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
          transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start: number;
    let frame: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

// ========== ICONS ==========
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const AppleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const AndroidIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.44-.59-3.03-.94-4.71-.94s-3.27.35-4.71.94L5.21 5.67c-.18-.28-.54-.37-.83-.22-.31.16-.42.54-.26.85L5.96 9.48C2.64 11.24.29 14.58.12 18.5h23.52c-.17-3.92-2.52-7.26-6.04-9.02zM7 15.25c-.69 0-1.25-.56-1.25-1.25S6.31 12.75 7 12.75s1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
  </svg>
);

const WA_URL =
  "https://wa.me/5517996581120?text=Olá! Gostaria de saber mais sobre o Rumo Pragas.";

// ========== LANDING PAGE ==========
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Skip to content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-[#1A472A] focus:font-semibold focus:text-sm">
        Pular para o conteúdo
      </a>

      {/* =============== HEADER =============== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_1px_0_0_#E5E0D5]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-18 lg:h-20 items-center justify-between">
          <button className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao topo">
            <img
              src="/images/icon.png"
              alt="Rumo Pragas"
              className="h-10 w-10 rounded-xl"
            />
            <span
              className={`font-display text-xl transition-colors duration-300 ${
                scrolled ? "text-[#1A472A]" : "text-white"
              }`}
            >
              Rumo Pragas
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { name: "Como Funciona", id: "como-funciona" },
              { name: "Recursos", id: "recursos" },
              { name: "Preços", id: "precos" },
              { name: "Download", id: "download" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-5 py-2 text-[13px] font-sans font-medium tracking-wide uppercase transition-colors duration-300 cursor-pointer ${
                  scrolled
                    ? "text-[#5A5850] hover:text-[#1A472A]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:flex items-center gap-2 px-6 h-10 text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-400 cursor-pointer ${
              scrolled
                ? "bg-[#1A472A] text-white hover:bg-[#0E2A18]"
                : "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
            }`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            Contato
          </a>
        </div>
      </header>

      {/* =============== HERO =============== */}
      <main id="main-content">
      <section
        className="relative min-h-[100vh] flex items-center overflow-hidden"
        aria-label="Rumo Pragas - Diagnóstico inteligente"
      >
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E2A18] via-[#1A472A] to-[#0E2A18]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C44D2B]/10 rounded-full blur-[150px]" />
        </div>

        <div className="container relative z-10 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="max-w-2xl">
              <ScrollReveal>
                <div className="inline-flex items-center gap-3 mb-10">
                  <div className="gold-line" />
                  <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4B962] font-semibold">
                    Inteligência Artificial para o Campo
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-white font-normal leading-[1.05] tracking-tight mb-8">
                  Fotografe a praga.
                  <br />
                  <span className="italic text-[#E06B4A]">
                    A IA faz o resto.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed font-light mb-12">
                  O Rumo Pragas identifica pragas e doenças em segundos com
                  inteligência artificial. Receba o diagnóstico completo e o
                  plano de tratamento direto no celular.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <button
                    onClick={() => scrollTo("download")}
                    className="btn-terra text-sm px-10 h-14 flex items-center justify-center gap-3 cursor-pointer tracking-wider uppercase"
                  >
                    <Camera className="w-4 h-4" />
                    Baixar Grátis
                  </button>
                  <button
                    onClick={() => scrollTo("como-funciona")}
                    className="bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40 text-sm px-10 h-14 flex items-center justify-center gap-3 font-sans font-semibold tracking-wider uppercase transition-all duration-400 cursor-pointer"
                  >
                    Como Funciona
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="flex items-center gap-10 lg:gap-14">
                  {[
                    { value: "200+", label: "Pragas catalogadas" },
                    { value: "IA", label: "Diagnóstico em segundos" },
                    { value: "100%", label: "Funciona offline" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-10 lg:gap-14">
                      {i > 0 && (
                        <div className="w-px h-10 bg-white/10 -ml-5 lg:-ml-7" />
                      )}
                      <div>
                        <p className="text-3xl lg:text-4xl font-display text-white">
                          {stat.value}
                        </p>
                        <p className="text-[11px] text-white/70 mt-1 tracking-wider uppercase font-sans">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right — App Screenshot */}
            <ScrollReveal delay={0.3}>
              <div className="hidden lg:block relative">
                <div className="absolute -inset-12 bg-[#C44D2B]/10 rounded-full blur-[100px]" />
                <div className="relative mx-auto w-[280px]">
                  {/* Phone frame */}
                  <div className="relative bg-[#111] rounded-[3rem] p-3 shadow-2xl shadow-black/40 border border-white/10">
                    <div className="rounded-[2.4rem] overflow-hidden">
                      <img
                        src="/images/screenshot-home.png"
                        alt="Tela principal do Rumo Pragas"
                        className="w-full"
                        width={280}
                        height={606}
                        loading="eager"
                      />
                    </div>
                    {/* Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#111] rounded-b-2xl" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase font-sans">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </section>

      {/* =============== COMO FUNCIONA — 3 PASSOS =============== */}
      <section className="py-24 md:py-32 bg-white border-b border-[#E5E0D5]" id="como-funciona">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="gold-line" />
              <span className="badge-editorial">Como Funciona</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1A472A] mb-6">
              Três passos para o
              <br />
              <span className="italic text-[#C44D2B]">diagnóstico perfeito.</span>
            </h2>
            <p className="text-base text-[#5A5850] leading-relaxed font-light">
              Sem precisar de agrônomo presente. Sem esperar dias por um laudo.
              O resultado sai na hora, direto no seu celular.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12" staggerDelay={0.15}>
            {[
              {
                step: "01",
                icon: Camera,
                title: "Fotografe",
                description:
                  "Aponte a câmera para a folha, fruto ou caule afetado. A IA precisa de apenas uma foto para começar.",
                color: "#1A472A",
              },
              {
                step: "02",
                icon: Brain,
                title: "IA Analisa",
                description:
                  "Nossa inteligência artificial identifica a praga ou doença em segundos, com taxa de confiança e nome científico.",
                color: "#C44D2B",
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Receba o Plano",
                description:
                  "Tratamento químico, biológico e preventivo — tudo detalhado, prático e pronto para aplicar no campo.",
                color: "#B8943E",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="text-center space-y-6 group">
                  <div className="relative mx-auto w-20 h-20">
                    <div
                      className="w-20 h-20 border-2 flex items-center justify-center transition-colors duration-500"
                      style={{ borderColor: item.color + "30" }}
                    >
                      <item.icon
                        className="w-8 h-8 transition-colors duration-500"
                        style={{ color: item.color }}
                      />
                    </div>
                    <span
                      className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center text-[11px] font-sans font-bold text-white"
                      style={{ background: item.color }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-[#1A472A]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5A5850] leading-relaxed font-light max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =============== RECURSOS COMPLETOS =============== */}
      <section className="py-24 md:py-32" id="recursos">
        <div className="container">
          <ScrollReveal className="mb-20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="gold-line" />
                  <span className="badge-editorial">Recursos</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1A472A]">
                  Muito mais que um
                  <br />
                  <span className="italic text-[#C44D2B]">identificador de pragas.</span>
                </h2>
              </div>
              <p className="text-base text-[#5A5850] max-w-md leading-relaxed font-light lg:pb-2">
                Um ecossistema completo de ferramentas para manejo integrado
                de pragas — do diagnóstico ao monitoramento regional.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1}>
            {[
              {
                icon: Camera,
                title: "Diagnóstico por IA",
                description:
                  "Fotografe a planta e receba identificação da praga com nome científico, nível de confiança e tratamento completo.",
                badge: "Core",
              },
              {
                icon: BookOpen,
                title: "Biblioteca de Pragas",
                description:
                  "200+ pragas e doenças catalogadas com fotos, sintomas, tratamentos e prevenção. Filtre por cultura.",
                badge: "Gratuito",
              },
              {
                icon: BarChart3,
                title: "MIP — Manejo Integrado",
                description:
                  "Ferramentas de amostragem para soja, monitoramento de cana e registro de armadilhas com limiar de ação.",
                badge: "Profissional",
              },
              {
                icon: Map,
                title: "Mapa de Surtos",
                description:
                  "Visualize focos de pragas na sua região em tempo real. Reporte surtos e receba alertas geolocalizados.",
                badge: "Comunidade",
              },
              {
                icon: Users,
                title: "Comunidade & Especialistas",
                description:
                  "Tire dúvidas com outros produtores e agrônomos verificados. Compartilhe experiências e soluções.",
                badge: "Comunidade",
              },
              {
                icon: Brain,
                title: "Risco de Doenças (IA)",
                description:
                  "Previsão de risco de doenças baseada em clima e localização. Antecipe-se às pragas antes que cheguem.",
                badge: "Pro",
              },
            ].map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="card-premium p-8 lg:p-10 space-y-5 h-full group">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 border border-[#E5E0D5] flex items-center justify-center group-hover:border-[#C44D2B]/30 transition-colors duration-500">
                      <feature.icon className="w-5 h-5 text-[#1A472A]" />
                    </div>
                    <span className="px-3 py-1 border border-[#E5E0D5] text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-[#5A5850]">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-[#1A472A]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#5A5850] leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =============== APP SCREENSHOTS =============== */}
      <section className="py-24 md:py-32 bg-[#F5F3EE] border-y border-[#E5E0D5] overflow-hidden">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="gold-line" />
              <span className="badge-editorial">O App</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#1A472A] mb-6">
              Projetado para o{" "}
              <span className="italic text-[#C44D2B]">campo.</span>
            </h2>
            <p className="text-base text-[#5A5850] leading-relaxed font-light">
              Interface limpa, intuitiva e funcional — mesmo sem internet.
              Disponível para iOS e Android.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex justify-center gap-6 lg:gap-10 overflow-x-auto pb-4">
              {[
                { src: "/images/screenshot-home.png", label: "Início" },
                { src: "/images/screenshot-camera.png", label: "Diagnóstico" },
                { src: "/images/screenshot-library.png", label: "Biblioteca" },
                { src: "/images/screenshot-history.png", label: "Histórico" },
              ].map((screen) => (
                <div key={screen.label} className="flex-shrink-0 text-center">
                  <div className="w-[200px] lg:w-[240px] bg-[#111] rounded-[2rem] p-2 shadow-xl shadow-black/20 border border-white/5">
                    <div className="rounded-[1.6rem] overflow-hidden">
                      <img
                        src={screen.src}
                        alt={`Tela ${screen.label}`}
                        className="w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-[#5A5850] mt-4 tracking-wider uppercase font-sans font-medium">
                    {screen.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =============== PREÇOS =============== */}
      <section className="py-24 md:py-32" id="precos">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="gold-line" />
              <span className="badge-editorial">Planos</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1A472A] mb-6">
              Escolha o plano{" "}
              <span className="italic text-[#C44D2B]">ideal.</span>
            </h2>
            <p className="text-base text-[#5A5850] leading-relaxed font-light">
              Comece grátis. Evolua quando precisar.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto" staggerDelay={0.15}>
            {/* Free */}
            <StaggerItem>
              <div className="card-premium p-8 lg:p-10 h-full space-y-6">
                <div>
                  <h3 className="font-display text-2xl text-[#1A472A]">Gratuito</h3>
                  <p className="text-sm text-[#5A5850] font-light mt-1">Para experimentar</p>
                </div>
                <div>
                  <span className="text-4xl font-display text-[#1A472A]">R$ 0</span>
                  <span className="text-sm text-[#5A5850] font-light">/mês</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "3 diagnósticos/mês",
                    "Biblioteca completa de pragas",
                    "Comunidade de produtores",
                    "Mapa de surtos (visualizar)",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#1A1A18]/70 font-light">
                      <div className="w-1 h-1 bg-[#B8943E] rounded-full mt-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("download")}
                  className="w-full h-12 border border-[#E5E0D5] hover:border-[#1A472A]/30 text-[#1A472A] text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                >
                  Baixar Grátis
                </button>
              </div>
            </StaggerItem>

            {/* Basic */}
            <StaggerItem>
              <div className="relative card-premium p-8 lg:p-10 h-full space-y-6 border-[#C44D2B]/30">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C44D2B] via-[#E06B4A] to-[#C44D2B]" />
                <div className="absolute -top-3 right-6">
                  <span className="px-3 py-1 bg-[#C44D2B] text-white text-[10px] font-sans font-semibold tracking-[0.15em] uppercase">
                    Popular
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-[#1A472A]">Básico</h3>
                  <p className="text-sm text-[#5A5850] font-light mt-1">Para produtores ativos</p>
                </div>
                <div>
                  <span className="text-4xl font-display text-[#1A472A]">R$ 29</span>
                  <span className="text-sm text-[#5A5850] font-light">/mês</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "10 diagnósticos/mês",
                    "Biblioteca completa de pragas",
                    "Ferramentas MIP",
                    "Comunidade + especialistas",
                    "Mapa de surtos completo",
                    "Reportar surtos",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#1A1A18]/70 font-light">
                      <div className="w-1 h-1 bg-[#C44D2B] rounded-full mt-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("download")}
                  className="btn-terra w-full h-12 flex items-center justify-center text-xs tracking-wider uppercase cursor-pointer"
                >
                  Começar Agora
                </button>
              </div>
            </StaggerItem>

            {/* Pro */}
            <StaggerItem>
              <div className="card-premium p-8 lg:p-10 h-full space-y-6">
                <div>
                  <h3 className="font-display text-2xl text-[#1A472A]">Pro</h3>
                  <p className="text-sm text-[#5A5850] font-light mt-1">Para agrônomos e consultores</p>
                </div>
                <div>
                  <span className="text-4xl font-display text-[#1A472A]">R$ 69</span>
                  <span className="text-sm text-[#5A5850] font-light">/mês</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "50 diagnósticos/mês",
                    "Tudo do plano Básico",
                    "Previsão de risco por IA",
                    "Prioridade no suporte",
                    "Relatórios exportáveis",
                    "AgroAssistente IA (chat)",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#1A1A18]/70 font-light">
                      <div className="w-1 h-1 bg-[#B8943E] rounded-full mt-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("download")}
                  className="w-full h-12 bg-[#1A472A] hover:bg-[#0E2A18] text-white text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                >
                  Assinar Pro
                </button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* =============== CULTURAS ATENDIDAS =============== */}
      <section className="py-24 md:py-32 bg-[#F5F3EE] border-y border-[#E5E0D5]">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="gold-line" />
              <span className="badge-editorial">Culturas</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#1A472A] mb-6">
              Suas lavouras,{" "}
              <span className="italic text-[#C44D2B]">cobertas.</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" staggerDelay={0.05}>
            {[
              { name: "Soja", emoji: "🫘" },
              { name: "Milho", emoji: "🌽" },
              { name: "Café", emoji: "☕" },
              { name: "Algodão", emoji: "🧶" },
              { name: "Cana", emoji: "🎋" },
              { name: "Trigo", emoji: "🌾" },
            ].map((crop) => (
              <StaggerItem key={crop.name}>
                <div className="card-premium p-6 text-center space-y-3 group">
                  <span className="text-3xl" role="img" aria-label={crop.name}>
                    {crop.emoji}
                  </span>
                  <p className="text-sm font-sans font-medium text-[#1A472A] tracking-wide">
                    {crop.name}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =============== DOWNLOAD CTA =============== */}
      <section className="relative py-24 md:py-32 overflow-hidden grain-overlay" id="download">
        <div className="absolute inset-0 bg-[#0E2A18]" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C44D2B]/60 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-10">
            <ScrollReveal>
              <div className="gold-line mx-auto mb-8" />
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
                Proteja sua lavoura
                <br />
                <span className="italic text-[#E06B4A]">com inteligência.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed font-light">
                Baixe o Rumo Pragas gratuitamente e comece a diagnosticar pragas
                com IA agora mesmo. Disponível para iOS e Android.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <a
                  href="https://apps.apple.com/br/app/rumo-pragas/id123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 h-14 bg-white text-[#0E2A18] text-sm font-sans font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <AppleIcon />
                  App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.agrorumo.rumopragas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 h-14 bg-white text-[#0E2A18] text-sm font-sans font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <AndroidIcon />
                  Google Play
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex justify-center gap-8 pt-6 text-white/70">
                {[
                  { icon: Shield, text: "Gratuito para começar" },
                  { icon: Smartphone, text: "iOS & Android" },
                  { icon: Globe, text: "PT & ES" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs tracking-wider">
                    <Icon className="w-3.5 h-3.5" />
                    {text}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =============== FAQ =============== */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl">
          <ScrollReveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="gold-line" />
              <span className="badge-editorial">FAQ</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-[#1A472A]">
              Perguntas <span className="italic text-[#C44D2B]">frequentes.</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="space-y-4" staggerDelay={0.08}>
            {[
              {
                q: "O app funciona sem internet?",
                a: "Sim! A biblioteca de pragas funciona 100% offline. O diagnóstico por IA precisa de conexão para enviar a foto, mas se você estiver sem sinal, a foto fica na fila e é processada automaticamente quando a conexão voltar.",
              },
              {
                q: "Quais culturas o app identifica?",
                a: "Atualmente cobrimos soja, milho, café, algodão, cana-de-açúcar e trigo. Estamos expandindo para mais culturas a cada atualização.",
              },
              {
                q: "A IA é confiável?",
                a: "Nossa IA é treinada com milhares de imagens reais de pragas e doenças. Cada diagnóstico vem com um nível de confiança (%) para que você saiba a precisão. Sempre recomendamos confirmar com um agrônomo para casos críticos.",
              },
              {
                q: "Posso cancelar minha assinatura?",
                a: "Sim, a qualquer momento. Sem fidelidade, sem multa. Cancele diretamente pelo app ou pela loja (App Store / Google Play).",
              },
              {
                q: "O app está disponível em espanhol?",
                a: "Sim! O Rumo Pragas suporta português e espanhol. Você pode alterar o idioma nas configurações do app.",
              },
            ].map((faq, i) => (
              <StaggerItem key={i}>
                <details className="group card-premium p-6 lg:p-8 cursor-pointer">
                  <summary className="flex items-center justify-between font-display text-lg text-[#1A472A] list-none">
                    {faq.q}
                    <ChevronRight className="w-5 h-5 text-[#5A5850] transition-transform duration-300 group-open:rotate-90 flex-shrink-0 ml-4" />
                  </summary>
                  <p className="text-sm text-[#5A5850] leading-relaxed font-light mt-4 pt-4 border-t border-[#E5E0D5]">
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
      <footer className="bg-[#0E2A18] text-white grain-overlay">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8943E]/40 to-transparent" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
            {/* Brand */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src="/images/icon.png"
                  alt="Rumo Pragas"
                  className="h-10 w-10 rounded-xl"
                />
                <span className="font-display text-xl text-white">
                  Rumo Pragas
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed font-light max-w-xs">
                Diagnóstico inteligente de pragas com inteligência artificial.
                Parte do ecossistema AgroRumo.
              </p>
              <div className="gold-line" />
            </div>

            {/* Links */}
            <div>
              <h4 className="font-sans font-semibold text-white/70 text-xs uppercase tracking-[0.2em] mb-6">
                Produto
              </h4>
              <ul className="space-y-3">
                {["Como Funciona", "Recursos", "Preços", "Download"].map((l) => (
                  <li key={l}>
                    <button
                      onClick={() =>
                        scrollTo(l.toLowerCase().replace(/ /g, "-").replace("ç", "c"))
                      }
                      className="text-white/70 text-sm hover:text-[#D4B962] transition-colors duration-300 cursor-pointer font-light"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ecossistema */}
            <div>
              <h4 className="font-sans font-semibold text-white/70 text-xs uppercase tracking-[0.2em] mb-6">
                Ecossistema AgroRumo
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "AgroRumo", href: "https://agrorumo.com" },
                  { name: "Rumo Máquinas", href: "https://controledemaquina.com.br" },
                  { name: "CampoVivo", href: "https://campovivo-landing.vercel.app" },
                ].map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 text-sm hover:text-[#D4B962] transition-colors duration-300 cursor-pointer font-light flex items-center gap-1 group"
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
              <h4 className="font-sans font-semibold text-white/70 text-xs uppercase tracking-[0.2em] mb-6">
                Contato
              </h4>
              <div className="space-y-4">
                <a
                  href="mailto:contato@agrorumo.com"
                  className="flex items-center gap-3 text-white/70 text-sm hover:text-white transition-colors duration-300 font-light"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  contato@agrorumo.com
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 text-sm hover:text-white transition-colors duration-300 font-light"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  (17) 99658-1120
                </a>
                <div className="flex items-center gap-3 text-white/70 text-sm font-light">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  São José do Rio Preto — SP
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs tracking-wide font-light">
              &copy; 2026 AgroRumo Tecnologia LTDA. Todos os direitos reservados.
            </p>
            <div className="flex gap-8 text-xs text-white/50 tracking-wide font-light">
              <a
                href="https://praga.agrorumo.com/privacidade.html"
                className="hover:text-white/70 transition-colors cursor-pointer"
              >
                Privacidade
              </a>
              <a
                href="https://praga.agrorumo.com/termos.html"
                className="hover:text-white/70 transition-colors cursor-pointer"
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
