import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  Clock,
  Truck,
  Recycle,
  Home,
  HardHat,
  CalendarDays,
  CalendarRange,
  Menu,
  X,
  Upload,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ----------------------------------------------------------------
   Constants / Content
---------------------------------------------------------------- */
const WHATSAPP_NUMBER = '5562982322955'
const WHATSAPP_DISPLAY = '(62) 98232-2955'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Oi! Vim pelo site e quero saber mais sobre a locação de container.')}`
const WHATSAPP_URL_CACAMBA = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Oi! Vim pelo site e quero pedir uma caçamba. Pode me passar como funciona?')}`

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Contato', href: '#contato' },
]

const SERVICES_FULL = [
  {
    icon: CalendarDays,
    title: 'Locação Semanal',
    text: 'Container de 5m³ por 7 dias corridos — R$220. Ideal pra reforma pequena ou faxina de fim de semana.',
  },
  {
    icon: CalendarRange,
    title: 'Locação Mensal',
    text: 'Container de 5m³ por 30 dias corridos — R$750. Pra obra que vai levar mais tempo, sem precisar renovar toda semana.',
  },
  {
    icon: Home,
    title: 'Atendimento Residencial',
    text: 'Reforma, faxina pesada ou desentulho de quintal — a gente leva e busca o container onde você precisar, dentro de Uruaçu.',
  },
  {
    icon: HardHat,
    title: 'Atendimento para Obras',
    text: 'Construtoras e pequenas obras de Uruaçu contam com a gente há 6 anos pra dar vazão ao entulho sem atrasar o cronograma.',
  },
  {
    icon: Truck,
    title: 'Container Robusto de 5m³',
    text: 'Um único tamanho, pensado pra aguentar entulho pesado de obra sem quebrar nem vazar pelo caminho.',
  },
  {
    icon: Recycle,
    title: 'Coleta e Transporte',
    text: 'A gente busca o container cheio e leva o entulho pro destino certo — você não precisa se preocupar com mais nada.',
  },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 glass rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl ${
          scrolled ? 'shadow-lg shadow-primary/10' : 'shadow-md shadow-ink/5'
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#inicio" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Truck className="h-5 w-5 text-deep" strokeWidth={2.4} />
              <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition" />
            </span>
            <span className="font-display font-bold tracking-tight text-lg text-ink transition-colors">
              Rainha do Entulho
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-tight lift-on-hover text-ink/70 hover:text-primary-dark transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-deep px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
            Chamar no WhatsApp
          </a>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-full text-ink"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-xl text-ink">Rainha do Entulho</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-deep px-6 py-4 rounded-full font-semibold w-full"
          >
            <MessageCircle className="h-4 w-4" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.15,
      })
      gsap.from('.hero-character', {
        y: 44,
        opacity: 0,
        scale: 0.96,
        duration: 1.3,
        ease: 'power3.out',
        delay: 0.35,
      })
      gsap.from('.hero-disc', { scale: 0.6, opacity: 0, duration: 1.6, ease: 'power3.out', delay: 0.2 })
    }, heroRef)
    // segurança: se a animação não rodar (aba em segundo plano, rAF pausado, etc.),
    // garante que o conteúdo do hero fique visível
    const fallback = setTimeout(() => {
      gsap.set('.hero-copy > *, .hero-character, .hero-disc', {
        clearProps: 'opacity,transform',
      })
    }, 2600)
    return () => {
      clearTimeout(fallback)
      ctx.revert()
    }
  }, [])

  const characterImg = (variant) => {
    const cfg = {
      full: {
        webp: '/mascote/rainha-full.webp',
        png: '/mascote/rainha-full.png',
        w: 368,
        h: 1400,
        cls:
          'hidden lg:block h-[82vh] xl:h-[88vh] max-h-[860px] w-auto object-contain drop-shadow-[0_26px_40px_rgba(20,17,14,0.22)]',
      },
      threeq: {
        webp: '/mascote/rainha-3q.webp',
        png: '/mascote/rainha-3q.png',
        w: 458,
        h: 1100,
        cls:
          'block lg:hidden h-[44vh] max-h-[350px] sm:h-[52vh] sm:max-h-[440px] md:h-[58vh] md:max-h-[520px] w-auto object-contain drop-shadow-[0_18px_28px_rgba(20,17,14,0.18)]',
      },
    }[variant]
    return (
      <picture>
        <source srcSet={cfg.webp} type="image/webp" />
        <img
          src={cfg.png}
          alt="Rainha do Entulho — personagem oficial da marca, de coroa e faixa, com camiseta do time"
          width={cfg.w}
          height={cfg.h}
          className={`relative z-10 ${cfg.cls}`}
        />
      </picture>
    )
  }

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative w-full overflow-hidden bg-background isolate"
    >
      {/* faixa de sinalização no topo — nó de construção civil */}
      <div
        className="absolute inset-x-0 top-0 z-20 h-1.5"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg,#F5A623 0 16px,#14110E 16px 32px)' }}
      />

      {/* fundo claro com leve grid de projeto */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -left-40 top-16 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-7xl grid-cols-1 items-start gap-4 px-6 pb-16 pt-28 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-16 lg:pt-24">
        {/* ---------- Texto ---------- */}
        <div className="hero-copy text-center lg:text-left">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent sm:text-xs">
            <span className="h-2 w-2 rounded-[2px] bg-accent" />
            Uruaçu-GO · 6 anos de mercado
          </p>
          <h1 className="mt-4 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
            Precisou de caçamba?
            <span className="mt-1 block text-accent">Chama a Rainha.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            Locação de caçambas para obras, reformas e limpeza — com agilidade e praticidade,
            direto com quem faz.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
            <a
              href={WHATSAPP_URL_CACAMBA}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-deep shadow-[0_12px_28px_-6px_rgba(245,166,35,0.6)] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
              Pedir minha caçamba
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="lift-on-hover inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-6 py-4 font-semibold text-ink sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              {WHATSAPP_DISPLAY}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-700">
                A Rainha responde agora
              </span>
            </span>
            {['Entrega no mesmo dia', 'Sem multa escondida'].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted sm:text-[11px]"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-primary-dark" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- Personagem ---------- */}
        <div className="hero-character relative flex min-h-[48vh] items-end justify-center sm:min-h-[54vh] lg:min-h-[86vh] lg:justify-end lg:self-stretch">
          {/* forma sólida da marca atrás da personagem */}
          <div className="hero-disc absolute bottom-[7%] left-1/2 aspect-square w-[80%] max-w-[300px] -translate-x-1/2 rounded-full bg-primary sm:max-w-[360px] lg:left-auto lg:right-[3%] lg:bottom-[5%] lg:h-[60vh] lg:max-h-[600px] lg:w-auto lg:translate-x-0" />
          {/* círculo vermelho de apoio (desktop) */}
          <div className="hero-disc absolute right-[4%] top-[8%] hidden h-24 w-24 rounded-full bg-accent lg:block xl:h-32 xl:w-32" />
          {/* sombra de chão */}
          <div className="absolute bottom-[4%] left-1/2 h-6 w-[60%] max-w-[300px] -translate-x-1/2 rounded-[100%] bg-ink/25 blur-lg lg:left-auto lg:right-[14%] lg:w-[38%]" />
          {/* chip flutuante — guia online */}
          <div className="absolute left-[-4%] top-[18%] z-20 hidden items-center gap-2.5 rounded-2xl border border-divider bg-surface px-3.5 py-2.5 shadow-xl shadow-ink/10 lg:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15">
              <MessageCircle className="h-4 w-4 text-emerald-600" strokeWidth={2.5} />
            </span>
            <span className="leading-tight">
              <span className="block font-mono text-[9px] uppercase tracking-widest text-muted">no WhatsApp</span>
              <span className="block font-display text-xs font-bold text-ink">Resposta rápida</span>
            </span>
          </div>
          {characterImg('full')}
          {characterImg('threeq')}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Quem é a Rainha — apresentação da mascote
---------------------------------------------------------------- */
function MascotIntro() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mi-img', {
        y: 44,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      })
      gsap.from('.mi-copy > *', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const bullets = [
    'Entrega e retirada dentro de Uruaçu',
    'Prazo combinado, sem multa escondida',
    'Falou com a gente, falou com quem faz',
  ]

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="mi-img relative">
          <div className="absolute -inset-3 sm:-inset-4 bg-primary/10 rounded-[2.5rem] -rotate-2" />
          <picture>
            <source srcSet="/mascote/rainha-patio.webp" type="image/webp" />
            <img
              src="/mascote/rainha-patio.jpg"
              alt="Rainha do Entulho no pátio da empresa, ao lado da caçamba com a marca"
              width="1047"
              height="1300"
              loading="lazy"
              className="relative w-full rounded-[2rem] border border-divider shadow-2xl shadow-primary/10 object-cover"
            />
          </picture>
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white bg-deep/80 backdrop-blur px-3 py-1.5 rounded-full">
            Pátio próprio · Uruaçu-GO
          </span>
        </div>

        <div className="mi-copy">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Quem é a Rainha</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Tem coroa, mas
            <span className="block font-serif italic font-medium text-primary-dark">trabalha na obra.</span>
          </h2>
          <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
            A Rainha do Entulho é o jeito da gente atender Uruaçu há 6 anos: caçamba no dia
            combinado, retirada sem você precisar cobrar, e a mesma pessoa do começo ao fim.
            Sem central, sem terceiro.
          </p>
          <ul className="mt-8 space-y-3">
            {bullets.map((t) => (
              <li key={t} className="flex items-center gap-3 text-ink">
                <CheckCircle2 className="h-5 w-5 text-primary-dark flex-none" />
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn mt-9 inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30"
          >
            <MessageCircle className="h-4 w-4" />
            Chamar a Rainha no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature Card 1 — Modalidades Shuffler
---------------------------------------------------------------- */
function ModalidadesShuffler() {
  const items = [
    { tag: 'Semanal', label: 'Container 5m³ por 7 dias corridos', preco: 'R$220' },
    { tag: 'Mensal', label: 'Container 5m³ por 30 dias corridos', preco: 'R$750' },
    { tag: 'Entrega', label: 'Levamos até o seu endereço em Uruaçu', preco: 'Incluso' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, i) => {
        const offset = i
        const total = stack.length
        return (
          <div
            key={item.tag}
            style={{
              transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
              zIndex: total - offset,
              opacity: 1 - offset * 0.25,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
            }}
            className="absolute inset-0 bg-white border border-divider rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <span className="font-mono text-xs text-muted">{item.preco}</span>
            </div>
            <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">
              {item.label}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {Array.from({ length: 24 }).map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 w-1 rounded-full"
                  style={{ background: idx < 24 - offset * 6 ? '#F5A623' : '#E6DFD3' }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — Signature animation: ContainerTracker
   (re-skinned from teardrop/pipe pattern to debris/container theme)
---------------------------------------------------------------- */
function ContainerTracker() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [count, setCount] = useState(14)

  const statuses = [
    { text: 'Container disponível no pátio', label: 'Pronto', tone: 'emerald' },
    { text: 'A caminho do seu endereço', label: 'Em rota', tone: 'accent' },
    { text: 'Em uso na sua obra', label: 'Ocupado', tone: 'primary' },
    { text: 'Retirado — entulho no destino certo', label: 'Concluído', tone: 'emerald' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => {
        const next = (idx + 1) % statuses.length
        if (statuses[next].label === 'Concluído') setCount((c) => c + 1)
        return next
      })
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  // Debris chunks falling into the container
  const chunks = [
    { left: '15%', delay: '0.0s', dur: '2.6s', size: 15 },
    { left: '25%', delay: '1.3s', dur: '3.0s', size: 12 },
    { left: '38%', delay: '0.6s', dur: '2.8s', size: 17 },
    { left: '50%', delay: '1.8s', dur: '2.4s', size: 13 },
    { left: '62%', delay: '0.9s', dur: '3.1s', size: 16 },
    { left: '74%', delay: '2.0s', dur: '2.7s', size: 12 },
    { left: '85%', delay: '0.4s', dur: '2.9s', size: 15 },
  ]

  // Dust puffs at the debris pile
  const puffs = [
    { left: '22%', delay: '0.2s' },
    { left: '48%', delay: '1.0s' },
    { left: '76%', delay: '1.8s' },
  ]

  const status = statuses[statusIdx]
  const toneText =
    status.tone === 'emerald' ? 'text-emerald-600' : status.tone === 'accent' ? 'text-accent-dark' : 'text-primary-dark'
  const toneDot =
    status.tone === 'emerald' ? 'bg-emerald-500' : status.tone === 'accent' ? 'bg-accent' : 'bg-primary'

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/15"
      style={{ background: 'linear-gradient(180deg, #F3EFE8 0%, #DFD3BC 70%, #C9B694 100%)' }}
    >
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/40 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-white/30 blur-xl" />

      {/* Header strip */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Truck className="h-3.5 w-3.5 text-primary-dark" strokeWidth={2.2} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
            Rastreio do container
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-sm text-ink tabular-nums">
            {String(count).padStart(2, '0')}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">no mês</span>
        </div>
      </div>

      {/* Container rim (source element) */}
      <svg className="absolute left-3 right-3 top-9 h-5" viewBox="0 0 400 20" preserveAspectRatio="none">
        <rect x="0" y="6" width="400" height="8" rx="2" fill="#B23917" fillOpacity="0.3" />
        <rect x="0" y="7" width="400" height="2" fill="#8a2b10" fillOpacity="0.4" />
        <rect x="0" y="4" width="6" height="12" rx="1" fill="#8a2b10" fillOpacity="0.5" />
        <rect x="394" y="4" width="6" height="12" rx="1" fill="#8a2b10" fillOpacity="0.5" />
        {[60, 152, 248, 340].map((x) => (
          <rect key={x} x={x - 2} y="4" width="4" height="12" fill="#8a2b10" fillOpacity="0.5" />
        ))}
      </svg>

      {/* Debris field */}
      <div className="absolute inset-x-0 top-14 bottom-11 overflow-hidden">
        {chunks.map((d, i) => (
          <svg
            key={i}
            className="absolute top-0"
            style={{
              left: d.left,
              width: `${d.size}px`,
              height: `${Math.round(d.size * 1.1)}px`,
              animation: `rain-fall ${d.dur} cubic-bezier(0.55,0.05,0.7,0.45) ${d.delay} infinite`,
              filter: 'drop-shadow(0 1px 2px rgba(20,17,14,0.3))',
              transform: 'translateX(-50%)',
            }}
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`chunk-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8BE5C" />
                <stop offset="55%" stopColor="#F5A623" />
                <stop offset="100%" stopColor="#8a5a12" />
              </linearGradient>
            </defs>
            <path d="M4 10 L10 3 L19 6 L21 15 L14 21 L5 18 Z" fill={`url(#chunk-${i})`} />
          </svg>
        ))}
      </div>

      {/* Debris pile line (surface) */}
      <svg className="absolute bottom-9 left-3 right-3 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
        <path
          d="M 0,9 L 12,4 L 24,9 L 36,3 L 48,9 L 60,5 L 72,9 L 84,4 L 96,9 L 108,3 L 120,9 L 132,5 L 144,9 L 156,4 L 168,9 L 180,3 L 200,9"
          fill="none"
          stroke="#8a2b10"
          strokeOpacity="0.4"
          strokeWidth="1.2"
        />
      </svg>

      {/* Dust puffs */}
      <div className="absolute bottom-[34px] left-3 right-3 h-2">
        {puffs.map((r, i) => (
          <span
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full border border-primary-dark/40"
            style={{ left: r.left, width: '4px', height: '4px', animation: `rain-ripple 2.4s ease-out ${r.delay} infinite` }}
          />
        ))}
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone === 'accent' && <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />}
          </span>
          <span key={status.text} className={`font-mono text-[10px] truncate ${toneText}`} style={{ animation: 'rain-fadein 0.35s ease-out' }}>
            {status.text}
          </span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${toneText}`}>
          {status.label}
        </span>
      </div>

      <style>{`
        @keyframes rain-fall {
          0%   { transform: translate(-50%, -10px) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 95px) rotate(140deg); opacity: 0; }
        }
        @keyframes rain-ripple {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes rain-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Cursor Scheduler (Agendamento pelo WhatsApp)
---------------------------------------------------------------- */
function RetiradaScheduler() {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const [step, setStep] = useState(0)
  const activeDay = 2

  useEffect(() => {
    const interval = setInterval(() => setStep((prev) => (prev + 1) % 5), 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = (() => {
    switch (step) {
      case 0: return { x: 8, y: 110, opacity: 0 }
      case 1: return { x: 60, y: 60, opacity: 1 }
      case 2: return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 3: return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 4: return { x: 130, y: 130, opacity: 1 }
      default: return { x: 8, y: 110, opacity: 0 }
    }
  })()

  return (
    <div className="relative h-44 w-full bg-white border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Semana 34 · Agosto</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-0.5 rounded-full">
          Agendamento
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
              step >= 3 && idx === activeDay ? 'bg-primary text-deep scale-110 shadow-lg shadow-primary/30' : 'bg-background text-ink'
            }`}
          >
            <span className="font-mono text-[9px] text-muted">{d}</span>
            <span className="font-display font-semibold text-sm">{idx + 17}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-2.5 rounded-2xl font-medium text-xs transition-all duration-300 ${
          step === 4 ? 'bg-accent text-white scale-[1.02] shadow-md shadow-accent/30' : 'bg-divider/40 text-muted'
        }`}
      >
        {step >= 3 ? '✓ Confirmado no WhatsApp' : 'Escolha um dia'}
      </button>

      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px`, opacity: cursorPos.opacity, transform: step === 3 ? 'scale(0.85)' : 'scale(1)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#14110E" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      })
      gsap.from('.feature-heading > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: '01 / Modalidades',
      heading: 'Locação Flexível',
      sub: 'Semanal ou mensal',
      text: 'Você escolhe o prazo — sem pacote fechado, sem multa escondida. Container de 5m³ chega no seu endereço em Uruaçu.',
      Component: ModalidadesShuffler,
    },
    {
      eyebrow: '02 / Operação',
      heading: 'Do Pedido à Retirada',
      sub: 'Rápido, sem enrolação',
      text: 'Da hora que você chama no WhatsApp até o container sair cheio do seu endereço — a gente acompanha cada etapa.',
      Component: ContainerTracker,
    },
    {
      eyebrow: '03 / Agendamento',
      heading: 'Marca e Já Confirma',
      sub: 'Direto pelo WhatsApp',
      text: 'Sem sistema complicado — você fala o dia, a gente confirma na hora e o container chega certinho.',
      Component: RetiradaScheduler,
    },
  ]

  return (
    <section id="servicos" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feature-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Como a gente trabalha
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Três frentes.
            <span className="block font-serif italic font-medium text-primary-dark mt-1">Um só compromisso.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-primary/40 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{card.eyebrow}</span>
                <ArrowUpRight className="h-5 w-5 text-ink/30 group-hover:text-primary-dark group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={1.8} />
              </div>

              <card.Component />

              <div className="mt-6">
                <h3 className="font-display font-bold text-2xl text-ink leading-tight">{card.heading}</h3>
                <p className="font-serif italic text-primary-dark text-sm mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp — animated counter (intersection observer)
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars — Three core numbers
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01', title: 'Experiência', target: 6, suffix: '', label: 'anos de mercado',
      desc: 'Seis anos atendendo Uruaçu com o mesmo compromisso: você chama, a gente resolve.',
    },
    {
      n: '02', title: 'Capacidade', target: 5, suffix: 'm³', label: 'por container',
      desc: 'Um único tamanho, robusto o bastante pra dar conta de entulho de obra ou reforma.',
    },
    {
      n: '03', title: 'Atendimento', target: 100, suffix: '%', label: 'direto, sem central',
      desc: 'Sem intermediário — quem atende é quem faz o serviço, direto pelo WhatsApp.',
    },
  ]

  return (
    <section id="diferenciais" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">
              ╱ Três diferenciais
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              Os números por
              <span className="block font-serif italic font-medium text-primary-dark">trás da confiança.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Três números que definem como a gente trabalha. Não é marketing — é o que a gente entrega toda vez.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`pillar-card relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{p.n} / {p.title}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-extrabold text-[6rem] sm:text-[8rem] md:text-[9rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-primary-dark mb-3 sm:mb-4">
                  {p.suffix}
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">{p.label}</p>
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>

              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }} />
              </div>

              <span className="absolute top-9 right-9 sm:top-12 sm:right-12 font-mono text-[9px] uppercase tracking-widest text-primary/30">
                {p.n}
              </span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — Sticky Stacking Cards
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Chamado',
      tagline: 'Você chama no WhatsApp.',
      text: 'Manda sua localização e o que precisa — sem burocracia, sem formulário. Antônio mesmo responde.',
      image: '/mascote/cena-chamado.webp',
      alt: 'Rainha do Entulho avaliando o entulho no canteiro de obra',
      meta: 'Passo 1 / Contato',
      objectPos: '62% center',
    },
    {
      num: '02',
      title: 'Entrega',
      tagline: 'O container chega no endereço.',
      text: 'Dentro do perímetro urbano de Uruaçu, com hora combinada. Você recebe o container de 5m³ prontinho pra usar.',
      image: '/mascote/cena-frota.webp',
      alt: 'Caminhão da Rainha do Entulho com o container carregado',
      meta: 'Passo 2 / Entrega',
      objectPos: '38% center',
    },
    {
      num: '03',
      title: 'Retirada',
      tagline: 'A gente busca e leva embora.',
      text: 'Quando o serviço acaba, você avisa e a gente retira o container cheio — o entulho vai pro destino certo.',
      image: '/mascote/cena-retirada.webp',
      alt: 'Caminhão da Rainha do Entulho levando o container cheio',
      meta: 'Passo 3 / Retirada',
      objectPos: '32% center',
    },
  ]

  return (
    <section id="como-funciona" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Como funciona</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Três passos.
          <span className="block font-serif italic font-medium text-primary-dark">Nenhuma surpresa.</span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[60vh] lg:min-h-[70vh]">
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{step.meta}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    Rainha do Entulho
                  </span>
                </div>

                <div className="my-12">
                  <span className="font-display font-extrabold text-[7rem] sm:text-[10rem] leading-none text-primary/15 -mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-serif italic text-primary-dark text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                </div>

                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
              </div>

              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  style={{ objectPosition: step.objectPos || 'center' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-deep/15" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">Passo {step.num}</span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  {step.num} / Rainha do Entulho
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   All Services Grid (full list of 6 services)
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Tudo que a gente faz</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              Um só container,
              <span className="block font-serif italic font-medium text-primary">jeitos diferentes de usar.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">
            A gente resolve entulho de todo tamanho — residência ou obra. Base em Uruaçu, perímetro urbano.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {SERVICES_FULL.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div key={i} className="svc-tile group bg-deep p-7 sm:p-9 hover:bg-white/[0.02] transition-colors duration-500 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary group-hover:text-deep" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: ShieldCheck,
      title: 'Única no Google de Uruaçu',
      text: 'Hoje, quando alguém busca "caçamba de entulho" em Uruaçu, a Rainha do Entulho é o único resultado que aparece no mapa.',
    },
    {
      Icon: Users,
      title: 'Negócio de família',
      text: 'Quem atende é quem faz o serviço — Antônio no caminhão, a família no suporte. Sem intermediário, sem central.',
    },
    {
      Icon: Clock,
      title: '6 anos de mercado',
      text: 'Seis anos entregando e retirando container em Uruaçu, sempre no prazo combinado.',
    },
  ]

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Por que confiar na gente</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            Mais que uma caçamba.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary-dark mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
          >
            <MessageCircle className="h-4 w-4" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact Form
---------------------------------------------------------------- */
function Field({ label, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const dropRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.message) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5))
  }

  return (
    <section id="contato" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <picture>
                <source srcSet="/mascote/rainha-bust.webp" type="image/webp" />
                <img
                  src="/mascote/rainha-bust.png"
                  alt="Rainha do Entulho"
                  width="120"
                  height="110"
                  loading="lazy"
                  className="h-20 w-20 rounded-full object-cover object-top border-2 border-primary/40 bg-primary/5"
                />
              </picture>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-700">Online agora</span>
              </span>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Contato</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Como a gente
              <span className="block font-serif italic font-medium text-primary-dark">pode ajudar?</span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Preenche seus dados aqui, ou chama direto no WhatsApp — o jeito mais rápido de falar com a gente.
            </p>

            <div className="mt-10 space-y-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <MessageCircle className="h-5 w-5 text-primary-dark group-hover:text-deep" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Chamar no WhatsApp</span>
                  <span className="font-display font-semibold text-ink text-lg">{WHATSAPP_DISPLAY}</span>
                </span>
              </a>

              <a href={`tel:+${WHATSAPP_NUMBER}`} className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Phone className="h-5 w-5 text-primary-dark group-hover:text-deep" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Ligar direto</span>
                  <span className="font-display font-semibold text-ink text-lg">{WHATSAPP_DISPLAY}</span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-dark" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Atendemos</span>
                  <span className="font-display font-semibold text-ink text-lg">Uruaçu-GO · perímetro urbano</span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-2">Sem burocracia</p>
              <p className="text-sm text-muted leading-relaxed">
                Só usamos seus dados pra combinar a entrega e a retirada do container. Sem terceiro, sem spam.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5">
              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Nome" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label="WhatsApp" type="tel" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <Field label="E-mail" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field label="Bairro / endereço" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} />
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">O que você precisa *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Ex: preciso de um container por 1 semana pra reforma do banheiro..."
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                  </div>

                  <div
                    ref={dropRef}
                    onDragOver={(e) => { e.preventDefault(); dropRef.current?.classList.add('!border-primary', '!bg-primary/5') }}
                    onDragLeave={() => dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')}
                    onDrop={(e) => { e.preventDefault(); dropRef.current?.classList.remove('!border-primary', '!bg-primary/5'); handleFiles(e.dataTransfer.files) }}
                    className="mt-5 border-2 border-dashed border-divider rounded-3xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input type="file" multiple id="file-up" className="hidden" onChange={(e) => handleFiles(e.target.files)} accept="image/*" />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary-dark mb-2" />
                      <p className="font-display font-semibold text-ink text-sm">Anexe fotos do local ou do entulho</p>
                      <p className="text-xs text-muted mt-1">Clique ou arraste os arquivos aqui (máx 5 fotos)</p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-dark text-xs px-3 py-1.5 rounded-full font-mono">
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">A gente responde rápido. Campos com * são obrigatórios.</p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Enviando...' : 'Enviar pedido'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-3">Pedido recebido!</h3>
                  <p className="text-muted max-w-md mx-auto">A gente responde rápido pra combinar a entrega. Se quiser adiantar, chama no WhatsApp.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Caçamba na obra.
            <span className="font-serif italic font-medium text-primary block">Sem enrolação.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">Rainha do Entulho — locação de container de entulho em Uruaçu, perímetro urbano.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto">
              <MessageCircle className="h-4 w-4" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <Truck className="h-5 w-5 text-deep" strokeWidth={2.4} />
              </span>
              <span className="font-display font-bold text-lg">Rainha do Entulho</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Locação de container de entulho de 5m³ em Uruaçu-GO. 6 anos de mercado, negócio de família.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-6">Uruaçu-GO · Vila Xique-Xique</p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Serviços</p>
            <ul className="space-y-2.5">
              {SERVICES_FULL.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <a href="#servicos" className="text-white/65 hover:text-primary transition text-sm">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Empresa</p>
            <ul className="space-y-2.5">
              <li><a href="#diferenciais" className="text-white/65 hover:text-primary transition text-sm">Diferenciais</a></li>
              <li><a href="#como-funciona" className="text-white/65 hover:text-primary transition text-sm">Como Funciona</a></li>
              <li><a href="#contato" className="text-white/65 hover:text-primary transition text-sm">Contato</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Contato</p>
            <ul className="space-y-2.5">
              <li><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-white/65 hover:text-primary transition text-sm">{WHATSAPP_DISPLAY}</a></li>
              <li><a href={`tel:+${WHATSAPP_NUMBER}`} className="text-white/65 hover:text-primary transition text-sm">Ligar direto</a></li>
              <li className="text-white/65 text-sm">Uruaçu, GO</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Disponível · pronto pra atender</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacidade" className="hover:text-primary transition">Privacidade</Link>
            <Link to="/termos" className="hover:text-primary transition">Termos</Link>
            <span>© 2026 Rainha do Entulho</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <MascotIntro />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
