import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Crown, Truck, Recycle, HardHat, House, MessageCircle, Phone, MapPin,
  Clock, CalendarRange, Tag, ArrowRight, Check, ChevronDown, Menu, X,
  Instagram, ShieldCheck,
} from 'lucide-react'

/* ================================================================
   RAINHA DO ENTULHO — Homepage
   Identidade v2.0 "Realeza Industrial".
   Regra: só dados reais. O que não foi confirmado entra como
   <Placeholder> claramente marcado, nunca inventado.
   ================================================================ */

/* ---------- Dados reais confirmados ---------- */
const WHATSAPP_NUMBER = '5562982322955'
const WHATSAPP_DISPLAY = '(62) 98232-2955'
const INSTAGRAM_URL = 'https://instagram.com/rainhadoentulho'
const INSTAGRAM_HANDLE = '@rainhadoentulho'
const REGIAO = 'Uruaçu-GO e região'
const CNPJ = '33.012.627/0001-11'
const ANOS_MERCADO = 6

/* Preços já divulgados publicamente pela empresa — revisar antes de campanha. */
const PRECO_SEMANAL = 'R$ 220'
const PRECO_MENSAL = 'R$ 750'
const CACAMBA_M3 = '5 m³'

/* Dados ainda NÃO confirmados — ficam como placeholder visível: */
const HORARIO_ATENDIMENTO = null            // ex.: "Seg a Sáb, 7h–18h"
const BAIRROS_ATENDIDOS = []                // ex.: ["Centro", "Vila Xique-Xique", ...]
const DEPOIMENTOS = []                      // depoimentos reais (nome + bairro)
const GOOGLE_MAPS_EMBED = null              // <iframe> da área de atendimento

const wa = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

const WA_GERAL = wa('Oi! Vim pelo site da Rainha do Entulho e quero saber mais.')
const WA_CACAMBA = wa('Oi! Vim pelo site e quero pedir uma caçamba. Pode me passar preço e data?')
const WA_REGIAO = wa('Oi! Vim pelo site. Vocês atendem a minha região? Vou mandar a localização.')

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Área de Atendimento', href: '#area' },
  { label: 'Contato', href: '#contato' },
]

/* ================================================================
   DESIGN SYSTEM — primitivos reutilizáveis
   ================================================================ */

function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
}

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 font-head font-bold rounded-card transition-all duration-200 ease-smooth lift disabled:opacity-60 disabled:pointer-events-none'
const BTN_SIZE = { md: 'px-5 py-3 text-sm', lg: 'px-6 py-3.5 text-[0.95rem]' }
const BTN_VARIANT = {
  primary: 'bg-gold text-charcoal hover:bg-gold-light shadow-soft',
  solid: 'bg-red text-cream hover:bg-red-dark shadow-soft',
  outline: 'border-2 border-charcoal/75 text-charcoal hover:bg-charcoal hover:text-cream',
  wa: 'bg-wa text-white hover:brightness-95 shadow-soft',
  ghost: 'text-charcoal hover:text-red gap-1.5 px-0',
}

function Button({ href, variant = 'primary', size = 'md', icon: Icon, iconRight = true, children, className = '', ...rest }) {
  const cls = `${BTN_BASE} ${BTN_SIZE[size]} ${BTN_VARIANT[variant]} ${className}`
  const inner = (
    <>
      {Icon && !iconRight && <Icon size={18} strokeWidth={2.5} aria-hidden />}
      {children}
      {Icon && iconRight && <Icon size={18} strokeWidth={2.5} aria-hidden />}
    </>
  )
  if (href) {
    const ext = href.startsWith('http')
    return (
      <a href={href} className={cls} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {inner}
      </a>
    )
  }
  return <button className={cls} {...rest}>{inner}</button>
}

function Eyebrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 font-body text-2xs font-semibold uppercase tracking-[0.16em] text-gold-dark ${className}`}>
      <span className="h-px w-6 bg-gold" aria-hidden />
      {children}
    </span>
  )
}

function SectionTitle({ eyebrow, title, kicker, align = 'left', light = false, className = '' }) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <Eyebrow className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-3 font-display text-3xl sm:text-4xl lg:text-[2.9rem] leading-[1.05] uppercase ${light ? 'text-cream' : 'text-charcoal'}`}>
        {title}
      </h2>
      {kicker && <p className={`mt-3 text-[1.02rem] leading-relaxed ${light ? 'text-cream/75' : 'text-ink-soft'}`}>{kicker}</p>}
    </div>
  )
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    // safety: never leave content invisible if IO doesn't fire (bg tab, etc.)
    const t = setTimeout(() => setSeen(true), 1400)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-smooth ${seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
      style={{ transitionDelay: seen ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

/* Placeholder visível para dados ainda não fornecidos pela empresa. */
function Placeholder({ label, children, className = '' }) {
  return (
    <div className={`relative rounded-card border-2 border-dashed border-gold/70 bg-gold/[0.06] p-4 sm:p-5 ${className}`} data-placeholder>
      <span className="inline-flex items-center gap-1.5 font-body text-2xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
        <span aria-hidden>⚑</span> A preencher — {label}
      </span>
      {children && <div className="mt-3 opacity-60">{children}</div>}
    </div>
  )
}

function Logo({ light = false, className = '' }) {
  return (
    <a href="#inicio" className={`flex items-center gap-2.5 shrink-0 ${className}`} aria-label="Rainha do Entulho — ir para o início">
      <img src="/brand/crown.png" alt="" width="48" height="36" className="w-9 sm:w-10 h-auto" />
      <span className="leading-none">
        <span className={`block font-head font-extrabold tracking-tight text-[0.92rem] sm:text-[1rem] ${light ? 'text-cream' : 'text-charcoal'}`}>
          RAINHA DO ENTULHO
        </span>
        <span className={`mt-0.5 block font-head font-semibold text-[0.58rem] tracking-[0.2em] ${light ? 'text-gold-light' : 'text-gold-dark'}`}>
          LOCAÇÃO DE CAÇAMBAS
        </span>
      </span>
    </a>
  )
}

/* ================================================================
   HEADER — top bar + navbar
   ================================================================ */

function useScrolled(offset = 12) {
  const [s, setS] = useState(false)
  useEffect(() => {
    const on = () => setS(window.scrollY > offset)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [offset])
  return s
}

function TopBar() {
  return (
    <div className="hidden sm:block bg-charcoal text-cream/80">
      <Container className="flex h-9 items-center justify-between text-[0.72rem] font-body">
        <span className="inline-flex items-center gap-2">
          <MapPin size={13} strokeWidth={2.2} aria-hidden />
          {REGIAO}
        </span>
        <div className="inline-flex items-center gap-5">
          {HORARIO_ATENDIMENTO ? (
            <span className="inline-flex items-center gap-2"><Clock size={13} strokeWidth={2.2} aria-hidden />{HORARIO_ATENDIMENTO}</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-gold-light/90"><Clock size={13} strokeWidth={2.2} aria-hidden />Horário a confirmar</span>
          )}
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-2 hover:text-cream">
            <Phone size={13} strokeWidth={2.2} aria-hidden />{WHATSAPP_DISPLAY}
          </a>
        </div>
      </Container>
    </div>
  )
}

function Navbar() {
  const scrolled = useScrolled(8)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div className={`transition-all duration-300 ease-smooth ${scrolled ? 'bg-cream/95 backdrop-blur shadow-soft border-b border-line' : 'bg-cream/70 backdrop-blur-sm border-b border-transparent'}`}>
        <Container className="flex h-16 sm:h-[4.5rem] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="font-body text-[0.86rem] text-ink-soft hover:text-red transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href={WA_CACAMBA} variant="solid" size="md" icon={ArrowRight}>Solicitar caçamba</Button>
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-card text-charcoal"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={26} strokeWidth={2.4} />
          </button>
        </Container>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition ${open ? 'visible' : 'invisible'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-charcoal/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <div className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-cream shadow-lift transition-transform duration-300 ease-smooth ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between px-5 border-b border-line">
            <Logo />
            <button className="w-11 h-11 inline-flex items-center justify-center text-charcoal" onClick={() => setOpen(false)} aria-label="Fechar menu">
              <X size={24} strokeWidth={2.4} />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-1" aria-label="Navegação">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 font-head font-semibold text-lg text-charcoal border-b border-line/70"
              >
                {l.label}
              </a>
            ))}
            <Button href={WA_CACAMBA} variant="solid" size="lg" icon={MessageCircle} iconRight={false} className="mt-5 w-full">
              Solicitar caçamba
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

/* ================================================================
   HERO
   ================================================================ */

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-2/60" aria-hidden />
      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
          {/* Comunicação */}
          <div>
            <Reveal>
              <Eyebrow>{REGIAO} · Locação de caçambas</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-4 font-display uppercase text-charcoal leading-[0.95] text-[2.6rem] sm:text-6xl lg:text-[4.4rem]">
                Na sua obra,<br />quem manda<br />é a <span className="text-red">Rainha.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-prose2 text-[1.05rem] leading-relaxed text-ink-soft">
                Locação de caçamba de entulho de {CACAMBA_M3} em Uruaçu-GO. Semanal ou mensal,
                com entrega e retirada na hora combinada — e preço fechado antes, direto no WhatsApp.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={WA_CACAMBA} variant="solid" size="lg" icon={ArrowRight}>Solicitar caçamba</Button>
                <Button href={WA_GERAL} variant="outline" size="lg" icon={MessageCircle} iconRight={false}>Falar no WhatsApp</Button>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.82rem] font-body text-ink-soft">
                {[`${ANOS_MERCADO} anos rodando Uruaçu`, 'Negócio de família', 'Única no Google da cidade'].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <Check size={15} strokeWidth={3} className="text-red" aria-hidden />{t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Personagem + produto */}
          <Reveal delay={140} className="relative mt-6 lg:mt-0">
            <div className="relative rounded-xl2 bg-cream-2/70 ring-1 ring-line overflow-hidden">
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-red/[0.12]" aria-hidden />
              <div className="relative h-[400px] sm:h-[480px] lg:h-[520px] flex items-end justify-center">
                <img
                  src="/mascote/rainha-full.webp"
                  alt="A Rainha do Entulho, personagem da marca, com coroa e faixa"
                  width="368" height="1400"
                  fetchPriority="high" decoding="async"
                  className="h-full w-auto object-contain drop-shadow-xl select-none pointer-events-none"
                />
              </div>
            </div>
            {/* card caçamba real */}
            <div className="absolute top-1 -right-2 sm:right-1 hidden sm:block w-40 rotate-[3deg] rounded-card overflow-hidden shadow-lift ring-1 ring-line bg-cream">
              <picture>
                <source srcSet="/mascote/cacambas-3.webp" type="image/webp" />
                <img src="/mascote/cacambas-3.jpg" alt="Caçambas de 5 m³ da Rainha do Entulho" width="320" height="180" loading="lazy" decoding="async" className="w-full h-24 object-cover" />
              </picture>
              <div className="px-2.5 py-1.5 text-2xs font-semibold uppercase tracking-[0.1em] text-charcoal">Caçamba de {CACAMBA_M3}</div>
            </div>
            {/* chip WhatsApp */}
            <div className="absolute -bottom-4 left-2 sm:left-5 flex items-center gap-2.5 rounded-card bg-cream px-3.5 py-2.5 shadow-lift ring-1 ring-line">
              <span className="grid place-items-center w-8 h-8 rounded-full bg-wa/15 text-wa animate-pulse-ring">
                <MessageCircle size={16} strokeWidth={2.6} />
              </span>
              <span className="leading-tight">
                <span className="block text-2xs font-semibold uppercase tracking-[0.12em] text-ink-soft">No WhatsApp</span>
                <span className="block font-head font-bold text-sm text-charcoal">Resposta rápida</span>
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ================================================================
   BARRA DE BENEFÍCIOS
   ================================================================ */

const BENEFITS = [
  { icon: CalendarRange, title: 'Semanal ou mensal', text: 'Você escolhe o prazo' },
  { icon: Clock, title: 'Hora combinada', text: 'Entrega e retirada agendadas' },
  { icon: Tag, title: 'Preço fechado antes', text: 'Sem multa escondida' },
  { icon: MessageCircle, title: 'Tudo no WhatsApp', text: 'Falando direto com a gente' },
]

function BenefitsBar() {
  return (
    <section className="bg-charcoal text-cream">
      <Container className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/10 lg:divide-y-0 lg:divide-x lg:divide-white/10">
        {BENEFITS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 60} className="flex items-start gap-3 py-5 lg:py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0">
            <Icon size={22} strokeWidth={2} className="mt-0.5 text-gold-light shrink-0" aria-hidden />
            <span>
              <span className="block font-head font-bold text-[0.95rem]">{title}</span>
              <span className="block text-[0.8rem] text-cream/60">{text}</span>
            </span>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}

/* ================================================================
   SOBRE
   ================================================================ */

function Sobre() {
  const facts = [
    ['Base', 'Uruaçu-GO · perímetro urbano'],
    ['Atendimento', WHATSAPP_DISPLAY],
    ['CNPJ', CNPJ],
  ]
  return (
    <section id="sobre" className="py-20 sm:py-28">
      <Container className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="rounded-xl2 overflow-hidden shadow-card ring-1 ring-line">
            <picture>
              <source srcSet="/mascote/rainha-patio.webp" type="image/webp" />
              <img src="/mascote/rainha-patio.jpg" alt="Pátio da Rainha do Entulho com as caçambas" width="1200" height="800" loading="lazy" decoding="async" className="w-full object-cover aspect-[4/3]" />
            </picture>
          </div>
        </Reveal>
        <Reveal delay={80} className="order-1 lg:order-2">
          <SectionTitle
            eyebrow="Sobre a empresa"
            title={<>Negócio de família,<br />{ANOS_MERCADO} anos na rua.</>}
            kicker="A Rainha do Entulho é de Uruaçu e roda a cidade há 6 anos. Quem atende é quem opera — você fala direto com a gente, sem central no meio do caminho."
          />
          <dl className="mt-7 grid sm:grid-cols-3 gap-4">
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-card bg-cream-2/60 p-4 ring-1 ring-line">
                <dt className="text-2xs font-semibold uppercase tracking-[0.12em] text-gold-dark">{k}</dt>
                <dd className="mt-1 font-head font-bold text-[0.9rem] text-charcoal break-words">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   SERVIÇOS
   ================================================================ */

const SERVICES = [
  {
    icon: Truck,
    title: `Locação de caçamba ${CACAMBA_M3}`,
    text: `Caçamba entregue no seu endereço em Uruaçu. Semanal (7 dias) ou mensal (30 dias).`,
    price: `${PRECO_SEMANAL}/semana · ${PRECO_MENSAL}/mês`,
  },
  {
    icon: Recycle,
    title: 'Retirada de entulho',
    text: 'Restos de obra, reforma, demolição e limpeza de quintal — a gente tira do seu caminho.',
  },
  {
    icon: Truck,
    title: 'Coleta e transporte',
    text: 'Caçamba cheia? A gente busca e leva o material pro destino certo.',
  },
  {
    icon: HardHat,
    title: 'Atendimento para obras',
    text: 'Construtoras e obras da cidade com fluxo de caçamba sem atrasar o cronograma.',
  },
  {
    icon: House,
    title: 'Atendimento residencial',
    text: 'Reforma, faxina pesada ou desentulho de quintal — a gente leva e busca onde você precisar.',
  },
]

function ServiceCard({ icon: Icon, title, text, price }) {
  return (
    <div className="group flex flex-col rounded-xl2 bg-white p-6 ring-1 ring-line shadow-soft lift">
      <span className="grid place-items-center w-12 h-12 rounded-card bg-red/[0.08] text-red">
        <Icon size={24} strokeWidth={2} aria-hidden />
      </span>
      <h3 className="mt-4 font-head font-extrabold text-[1.05rem] text-charcoal">{title}</h3>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft flex-1">{text}</p>
      {price && (
        <p className="mt-3 font-head font-bold text-[0.82rem] text-gold-dark tabular-nums">{price}</p>
      )}
      <a href={WA_CACAMBA} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-head font-bold text-[0.85rem] text-red group-hover:gap-2.5 transition-all">
        Pedir no WhatsApp <ArrowRight size={16} strokeWidth={2.6} aria-hidden />
      </a>
    </div>
  )
}

function Servicos() {
  return (
    <section id="servicos" className="py-20 sm:py-28 bg-cream-2/50">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="O que a gente faz"
            title="Uma caçamba, vários jeitos de usar."
            kicker="Um único tamanho, pensado pra aguentar entulho pesado de obra. O que muda é o prazo e a forma de atender."
          />
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
          <Reveal delay={SERVICES.length * 60} className="hidden lg:block">
            <div className="flex h-full flex-col justify-between rounded-xl2 bg-red p-6 text-cream shadow-card">
              <p className="font-display uppercase text-2xl leading-tight">Não achou<br />o que precisa?</p>
              <Button href={WA_GERAL} variant="primary" size="md" icon={ArrowRight} className="mt-4 self-start">
                Perguntar no WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ================================================================
   COMO FUNCIONA
   ================================================================ */

const STEPS = [
  { icon: MessageCircle, title: 'Você chama no WhatsApp', text: 'Manda o endereço e o que precisa descartar. Sem formulário, sem burocracia.' },
  { icon: Truck, title: 'A gente entrega', text: 'A caçamba chega no dia e hora combinados, dentro do perímetro urbano de Uruaçu.' },
  { icon: CalendarRange, title: 'Você enche no seu tempo', text: '7 ou 30 dias pra usar. Você escolhe o prazo na hora de contratar.' },
  { icon: Recycle, title: 'A gente retira', text: 'Encheu ou acabou o prazo? Avisa no WhatsApp que a gente busca e dá o destino certo.' },
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Como funciona"
            title="Do WhatsApp à retirada, em 4 passos."
            kicker="Sem visita técnica, sem proposta demorada. É conversa de WhatsApp e caçamba na porta."
          />
        </Reveal>
        <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 80} className="relative">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl text-red/25 tabular-nums leading-none">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid place-items-center w-10 h-10 rounded-card bg-charcoal text-cream shrink-0">
                  <Icon size={20} strokeWidth={2} aria-hidden />
                </span>
              </div>
              <h3 className="mt-4 font-head font-extrabold text-[1.02rem] text-charcoal">{title}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">{text}</p>
              {i < STEPS.length - 1 && (
                <span className="hidden lg:block absolute top-5 -right-2.5 text-gold" aria-hidden>
                  <ArrowRight size={20} strokeWidth={2.5} />
                </span>
              )}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}

/* ================================================================
   DEIXA QUE A RAINHA RESOLVE
   ================================================================ */

function RainhaResolve() {
  return (
    <section className="relative overflow-hidden bg-red text-cream">
      <Container className="relative grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-end">
        <Reveal className="pt-16 sm:pt-20 pb-16 sm:pb-20">
          <Eyebrow className="text-gold-light [&>span]:bg-gold-light">Deixa com a gente</Eyebrow>
          <h2 className="mt-3 font-display uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-[3.4rem]">
            Deixa que a<br />Rainha resolve.
          </h2>
          <p className="mt-4 max-w-md text-cream/85 leading-relaxed">
            Pedir caçamba é uma conversa de WhatsApp: você diz o que precisa, a gente combina
            preço e data. O entulho sai do seu caminho e vai pro lugar certo.
          </p>
          <Button href={WA_CACAMBA} variant="primary" size="lg" icon={ArrowRight} className="mt-7">
            Solicitar caçamba
          </Button>
        </Reveal>
        <Reveal delay={120} className="relative">
          <div className="h-[320px] sm:h-[400px] lg:h-[440px] flex items-end justify-center lg:justify-end">
            <img
              src="/mascote/rainha-3q.webp"
              alt="A Rainha do Entulho"
              width="458" height="1100"
              loading="lazy" decoding="async"
              className="h-full w-auto object-contain drop-shadow-2xl select-none pointer-events-none"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   DIFERENCIAIS
   ================================================================ */

const DIFF = [
  {
    icon: MapPin,
    title: 'Única no Google de Uruaçu',
    text: 'Hoje, quando alguém procura "caçamba de entulho" em Uruaçu, a Rainha do Entulho é o resultado que aparece no mapa.',
    wide: true,
  },
  { icon: MessageCircle, title: 'Fala direto com a gente', text: 'Negócio de família. Sem intermediário, sem central de atendimento.' },
  { icon: Clock, title: `${ANOS_MERCADO} anos rodando a cidade`, text: 'Seis anos entregando e retirando caçamba em Uruaçu, no prazo combinado.' },
  { icon: Tag, title: 'Preço fechado antes', text: 'Você sabe quanto vai pagar antes da caçamba sair. Sem multa escondida.' },
]

function Diferenciais() {
  return (
    <section id="diferenciais" className="py-20 sm:py-28 bg-cream-2/50">
      <Container>
        <Reveal>
          <SectionTitle eyebrow="Por que a Rainha" title="Mais que uma caçamba na porta." />
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {DIFF.map(({ icon: Icon, title, text, wide }, i) => (
            <Reveal key={title} delay={i * 60} className={wide ? 'sm:col-span-2 lg:row-span-2 lg:col-span-1' : ''}>
              <div className={`h-full rounded-xl2 p-6 ring-1 ring-line lift ${wide ? 'bg-charcoal text-cream' : 'bg-white'}`}>
                <span className={`grid place-items-center w-12 h-12 rounded-card ${wide ? 'bg-gold/20 text-gold-light' : 'bg-red/[0.08] text-red'}`}>
                  <Icon size={24} strokeWidth={2} aria-hidden />
                </span>
                <h3 className={`mt-4 font-head font-extrabold ${wide ? 'text-xl text-cream' : 'text-[1.05rem] text-charcoal'}`}>{title}</h3>
                <p className={`mt-2 leading-relaxed ${wide ? 'text-cream/75 text-[0.95rem]' : 'text-ink-soft text-[0.9rem]'}`}>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ================================================================
   FROTA (mundo real)
   ================================================================ */

const FLEET_PHOTOS = [
  { src: '/mascote/rainha-patio', alt: 'Pátio da Rainha do Entulho com a caçamba', span: 'sm:col-span-2 sm:row-span-2' },
  { src: '/mascote/cacamba-real', alt: 'Caçamba de 5 m³ da Rainha do Entulho na rua' },
  { src: '/mascote/cacambas-3', alt: 'Caçambas de 5 m³ da frota' },
  { src: '/mascote/cena-chamado', alt: 'A Rainha do Entulho apontando para o entulho a retirar' },
  { src: '/mascote/cena-retirada', alt: 'Retirada de caçamba em obra' },
]

function Frota() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Estrutura real"
            title="Estrutura pronta pra sua obra."
            kicker="Caminhão poliguindaste e caçambas de 5 m³ rodando Uruaçu. Operação da empresa — não é intermediação."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] gap-3 sm:gap-4">
          {FLEET_PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={i * 70} className={`overflow-hidden rounded-card ring-1 ring-line ${p.span || ''}`}>
              <picture>
                <source srcSet={`${p.src}.webp`} type="image/webp" />
                <img src={`${p.src}.jpg`} alt={p.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </picture>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mt-4 text-[0.8rem] text-ink-soft">
            {/* Nº exato de caçambas / caminhões na frota não confirmado — evitar número inventado. */}
            Quer ver a caçamba antes de fechar? <a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="font-semibold text-red underline underline-offset-2">Pede foto no WhatsApp.</a>
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   ÁREA DE ATENDIMENTO
   ================================================================ */

function AreaAtendimento() {
  return (
    <section id="area" className="py-20 sm:py-28 bg-charcoal text-cream">
      <Container className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <Reveal>
          <SectionTitle
            light
            eyebrow="Onde a gente chega"
            title={<>A gente atende<br />Uruaçu-GO e região.</>}
            kicker="Base no perímetro urbano de Uruaçu. A gente roda os bairros da cidade e combina a distância pra fora do perímetro."
          />
          <div className="mt-6">
            {BAIRROS_ATENDIDOS.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {BAIRROS_ATENDIDOS.map((b) => (
                  <li key={b} className="rounded-full bg-white/10 px-3 py-1.5 text-[0.82rem]">{b}</li>
                ))}
              </ul>
            ) : (
              <Placeholder label="lista de bairros e cidades atendidas (confirmar com a empresa)">
                <div className="flex flex-wrap gap-2">
                  {['Centro', 'Bairro X', 'Bairro Y', 'Distrito Z'].map((b) => (
                    <span key={b} className="rounded-full bg-white/10 px-3 py-1.5 text-[0.8rem]">{b}</span>
                  ))}
                </div>
              </Placeholder>
            )}
          </div>
          <Button href={WA_REGIAO} variant="primary" size="lg" icon={MapPin} iconRight={false} className="mt-6">
            Consultar minha região
          </Button>
        </Reveal>

        <Reveal delay={100}>
          {GOOGLE_MAPS_EMBED ? (
            <div className="rounded-xl2 overflow-hidden ring-1 ring-white/15 aspect-[4/3]" dangerouslySetInnerHTML={{ __html: GOOGLE_MAPS_EMBED }} />
          ) : (
            <Placeholder label="mapa da área de atendimento (embed do Google Maps)" className="border-white/25 bg-white/[0.04]">
              <div className="grid place-items-center rounded-card bg-white/5 aspect-[4/3] text-cream/40">
                <MapPin size={40} strokeWidth={1.5} aria-hidden />
              </div>
            </Placeholder>
          )}
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   PROVA SOCIAL
   ================================================================ */

function TestimonialCard({ quote, name, area, muted }) {
  return (
    <div className={`rounded-xl2 bg-white p-6 ring-1 ring-line shadow-soft ${muted ? 'opacity-60' : ''}`}>
      <div className="flex gap-0.5 text-gold" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-lg leading-none">★</span>)}
      </div>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal">"{quote}"</p>
      <p className="mt-4 font-head font-bold text-[0.85rem] text-charcoal">{name}</p>
      <p className="text-[0.78rem] text-ink-soft">{area}</p>
    </div>
  )
}

function ProvaSocial() {
  return (
    <section className="py-20 sm:py-28 bg-cream-2/50">
      <Container>
        <Reveal>
          <SectionTitle align="center" eyebrow="Quem já chamou" title="O que dizem na cidade." />
        </Reveal>

        {DEPOIMENTOS.length > 0 ? (
          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {DEPOIMENTOS.map((d, i) => (
              <Reveal key={i} delay={i * 70}><TestimonialCard {...d} /></Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <Placeholder label="depoimentos reais (nome + bairro) e nota do Google — a integrar. Layout de exemplo abaixo:">
              <div className="grid sm:grid-cols-3 gap-5 mt-1">
                <TestimonialCard muted quote="Chamei de manhã, a caçamba chegou no horário. Retiraram sem eu precisar cobrar." name="Cliente exemplo" area="Bairro, Uruaçu-GO" />
                <TestimonialCard muted quote="Preço fechado no WhatsApp, sem surpresa. Já é a terceira obra com eles." name="Cliente exemplo" area="Bairro, Uruaçu-GO" />
                <TestimonialCard muted quote="Negócio de família, atendem bem. Recomendo pra reforma." name="Cliente exemplo" area="Bairro, Uruaçu-GO" />
              </div>
            </Placeholder>
            <p className="mt-5 text-center text-[0.9rem] text-ink-soft">
              Já é cliente? <a href="https://www.google.com/search?q=Rainha+do+Entulho+Uruaçu" target="_blank" rel="noopener noreferrer" className="font-semibold text-red underline underline-offset-2">Deixe sua avaliação no Google.</a>
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}

/* ================================================================
   CTA WHATSAPP
   ================================================================ */

function CtaWhatsapp() {
  return (
    <section className="relative overflow-hidden bg-red text-cream">
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gold/20 blur-2xl" aria-hidden />
      <Container className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
        <Reveal className="py-16 sm:py-20">
          <h2 className="font-display uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-[3.6rem]">
            Precisou de caçamba?<br /><span className="text-gold-light">Chama a Rainha.</span>
          </h2>
          <p className="mt-4 max-w-md text-cream/85">Resposta rápida, preço combinado antes e entrega com hora marcada em Uruaçu.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button href={WA_CACAMBA} variant="primary" size="lg" icon={MessageCircle} iconRight={false}>Solicitar pelo WhatsApp</Button>
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="font-head font-bold text-cream/90 hover:text-cream tabular-nums">{WHATSAPP_DISPLAY}</a>
          </div>
        </Reveal>
        <Reveal delay={120} className="relative hidden lg:block">
          <div className="h-[340px] lg:h-[380px] flex items-end justify-end">
            <img src="/mascote/rainha-full.webp" alt="" width="368" height="1400" loading="lazy" decoding="async" className="h-full w-auto object-contain drop-shadow-2xl select-none pointer-events-none" />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   FAQ
   ================================================================ */

const FAQS = [
  {
    q: 'Como funciona a locação?',
    a: `Você contrata a caçamba de ${CACAMBA_M3} por 7 dias (semanal) ou 30 dias (mensal). A gente entrega no endereço combinado em Uruaçu e retira no fim do prazo — ou antes, se você avisar que já encheu.`,
  },
  {
    q: 'Como solicito uma caçamba?',
    a: `Chama no WhatsApp ${WHATSAPP_DISPLAY} com o endereço e o tipo de material. A gente combina preço e data de entrega na hora.`,
  },
  {
    q: 'Qual o período de locação?',
    a: '7 dias no plano semanal ou 30 dias no mensal. Precisando de mais tempo, é só renovar.',
  },
  {
    q: 'O que pode ser descartado na caçamba?',
    a: 'Entulho de obra e reforma: concreto, tijolo, argamassa, madeira, telha, restos de demolição e limpeza de quintal.',
    note: 'Confirmar com a empresa a lista exata do que NÃO pode ir (lixo doméstico, material tóxico/inflamável, etc.).',
  },
  {
    q: 'Como funciona a retirada?',
    a: 'Quando encher ou acabar o prazo, você avisa no WhatsApp e a gente agenda a retirada. O material vai pro destino certo.',
  },
  {
    q: 'Quais regiões vocês atendem?',
    a: 'Uruaçu-GO e região, com base no perímetro urbano. Não sabe se a gente chega até você? Manda a localização no WhatsApp que a gente confirma.',
  },
]

function FAQItem({ q, a, note, open, onToggle, id }) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={`faq-btn-${id}`}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-head font-bold text-[1rem] text-charcoal">{q}</span>
          <ChevronDown size={20} strokeWidth={2.4} className={`shrink-0 text-red transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      </h3>
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        className={`grid transition-all duration-300 ease-smooth ${open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="text-[0.92rem] leading-relaxed text-ink-soft">{a}</p>
          {note && (
            <p className="mt-2 inline-flex items-start gap-1.5 rounded bg-gold/10 px-2 py-1 text-2xs font-semibold uppercase tracking-[0.1em] text-gold-dark">
              <span aria-hidden>⚑</span> {note}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <Reveal>
          <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes." />
          <p className="mt-4 text-[0.95rem] text-ink-soft">
            Não achou sua dúvida? <a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="font-semibold text-red underline underline-offset-2">Pergunta no WhatsApp.</a>
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div>
            {FAQS.map((f, i) => (
              <FAQItem key={f.q} id={i} {...f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   CONTATO
   ================================================================ */

const MATERIAL_OPTS = ['Obra / reforma', 'Demolição', 'Limpeza de quintal', 'Mudança', 'Outro']
const PRAZO_OPTS = ['Semanal (7 dias)', 'Mensal (30 dias)', 'Ainda não sei']

function Field({ label, children, required }) {
  return (
    <label className="block">
      <span className="block font-body text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink-soft">
        {label}{required && <span className="text-red"> *</span>}
      </span>
      <span className="mt-1.5 block">{children}</span>
    </label>
  )
}

const inputCls =
  'w-full rounded-card border border-line bg-white px-4 py-3 text-[0.95rem] text-charcoal placeholder:text-ink-soft/60 focus:border-gold focus:outline-none'

function ContactForm() {
  const [form, setForm] = useState({ nome: '', bairro: '', material: MATERIAL_OPTS[0], prazo: PRAZO_OPTS[0] })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const msg = [
      'Oi! Vim pelo site da Rainha do Entulho e quero pedir uma caçamba.',
      form.nome && `Nome: ${form.nome}`,
      form.bairro && `Bairro/endereço: ${form.bairro}`,
      `Tipo de material: ${form.material}`,
      `Prazo: ${form.prazo}`,
    ].filter(Boolean).join('\n')
    window.open(wa(msg), '_blank', 'noopener')
  }

  return (
    <section id="contato" className="py-20 sm:py-28 bg-cream-2/50">
      <Container className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
        <Reveal>
          <SectionTitle eyebrow="Contato" title={<>Pede sua caçamba<br />em 1 minuto.</>} />
          <p className="mt-4 text-[0.95rem] text-ink-soft">
            Preenche os campos e a gente abre a conversa já com tudo escrito — ou chama direto:
          </p>
          <div className="mt-5 space-y-3">
            <a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-head font-bold text-charcoal">
              <span className="grid place-items-center w-10 h-10 rounded-card bg-wa/15 text-wa"><MessageCircle size={18} strokeWidth={2.4} /></span>
              {WHATSAPP_DISPLAY}
            </a>
            <p className="flex items-center gap-3 text-[0.9rem] text-ink-soft">
              <span className="grid place-items-center w-10 h-10 rounded-card bg-charcoal/5 text-charcoal"><MapPin size={18} strokeWidth={2.2} /></span>
              {REGIAO}
            </p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[0.9rem] text-ink-soft hover:text-charcoal">
              <span className="grid place-items-center w-10 h-10 rounded-card bg-charcoal/5 text-charcoal"><Instagram size={18} strokeWidth={2.2} /></span>
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <form onSubmit={submit} className="rounded-xl2 bg-white p-6 sm:p-8 ring-1 ring-line shadow-card grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Seu nome">
                <input className={inputCls} value={form.nome} onChange={set('nome')} placeholder="Como te chamar" autoComplete="name" />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Bairro / endereço" required>
                <input className={inputCls} value={form.bairro} onChange={set('bairro')} placeholder="Onde entregar a caçamba" required />
              </Field>
            </div>
            <Field label="Tipo de material">
              <select className={inputCls} value={form.material} onChange={set('material')}>
                {MATERIAL_OPTS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Prazo">
              <select className={inputCls} value={form.prazo} onChange={set('prazo')}>
                {PRAZO_OPTS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2 mt-2 flex flex-wrap items-center gap-4">
              <Button variant="solid" size="lg" icon={ArrowRight}>Enviar pelo WhatsApp</Button>
              <span className="text-[0.8rem] text-ink-soft">Abre o WhatsApp com a mensagem pronta. Sem cadastro.</span>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   FOOTER
   ================================================================ */

function Footer() {
  const cols = [
    { h: 'Serviços', items: [['Locação de caçamba', '#servicos'], ['Retirada de entulho', '#servicos'], ['Coleta e transporte', '#servicos'], ['Atendimento para obras', '#servicos']] },
    { h: 'Empresa', items: [['Sobre', '#sobre'], ['Como funciona', '#como-funciona'], ['Área de atendimento', '#area'], ['Contato', '#contato']] },
  ]
  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="h-1 edge-gold opacity-80" aria-hidden />
      <Container className="py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-[0.86rem] leading-relaxed">
            Locação de caçamba de entulho de {CACAMBA_M3} em Uruaçu-GO. Negócio de família, {ANOS_MERCADO} anos na rua.
          </p>
        </div>

        {cols.map((c) => (
          <nav key={c.h} aria-label={c.h}>
            <h4 className="font-head font-bold text-2xs uppercase tracking-[0.14em] text-gold-light">{c.h}</h4>
            <ul className="mt-4 space-y-2.5">
              {c.items.map(([label, href]) => (
                <li key={label}><a href={href} className="text-[0.86rem] hover:text-cream">{label}</a></li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h4 className="font-head font-bold text-2xs uppercase tracking-[0.14em] text-gold-light">Contato</h4>
          <ul className="mt-4 space-y-2.5 text-[0.86rem]">
            <li><a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="hover:text-cream">WhatsApp {WHATSAPP_DISPLAY}</a></li>
            <li>{REGIAO}</li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-cream">Instagram {INSTAGRAM_HANDLE}</a></li>
            <li className="text-gold-light/80">{HORARIO_ATENDIMENTO || '⚑ Horário de atendimento a confirmar'}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-[0.76rem] text-cream/50">
          <span>© {new Date().getFullYear()} Rainha do Entulho · CNPJ {CNPJ}</span>
          <span className="flex gap-4">
            <Link to="/privacidade" className="hover:text-cream">Privacidade</Link>
            <Link to="/termos" className="hover:text-cream">Termos</Link>
          </span>
        </Container>
      </div>
    </footer>
  )
}

/* ================================================================
   FLOATING WHATSAPP (mobile)
   ================================================================ */

function FloatingWhatsApp() {
  const show = useScrolled(400)
  return (
    <a
      href={WA_CACAMBA}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`lg:hidden fixed bottom-4 right-4 z-40 grid place-items-center w-14 h-14 rounded-full bg-wa text-white shadow-lift transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <MessageCircle size={26} strokeWidth={2.4} />
    </a>
  )
}

/* ================================================================
   PAGE
   ================================================================ */

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <a href="#inicio" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:bg-charcoal focus:text-cream focus:px-4 focus:py-2 focus:rounded-card">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main>
        <Hero />
        <BenefitsBar />
        <Sobre />
        <Servicos />
        <ComoFunciona />
        <RainhaResolve />
        <Diferenciais />
        <Frota />
        <AreaAtendimento />
        <ProvaSocial />
        <CtaWhatsapp />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
