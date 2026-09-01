import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Truck, Recycle, HardHat, MessageCircle, Phone, MapPin, Clock,
  CalendarRange, Tag, ArrowRight, Check, ChevronDown, Menu, X, Instagram,
} from 'lucide-react'

/* ================================================================
   RAINHA DO ENTULHO — Homepage
   Identidade v2.0 "Realeza Industrial".
   Regra: só dados reais confirmados. Nada de placeholder visível.
   O que não foi confirmado fica FORA da tela (comentado abaixo).
   ================================================================ */

/* ---------- Dados reais confirmados ---------- */
const WHATSAPP_NUMBER = '5562982322955'
const WHATSAPP_DISPLAY = '(62) 98232-2955'
const INSTAGRAM_URL = 'https://instagram.com/rainhadoentulho'
const INSTAGRAM_HANDLE = '@rainhadoentulho'
const REGIAO = 'Uruaçu-GO e região'
const CNPJ = '33.012.627/0001-11'
const CACAMBA_M3 = '5 m³'
/* Preços já divulgados publicamente pela empresa — revisar antes de campanha. */
const PRECO_CURTO = 'R$ 220/sem · R$ 750/mês'

/* NÃO confirmados — não entram no site até o cliente passar:
   bairros atendidos, embed do mapa, depoimentos/nota Google,
   horário de atendimento, nº de caçambas/caminhões da frota,
   "anos de mercado", lista exata do que não pode ir na caçamba. */

const wa = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
const WA_GERAL = wa('Oi! Vim pelo site da Rainha do Entulho e quero saber mais.')
const WA_CACAMBA = wa('Oi! Vim pelo site e quero pedir uma caçamba. Pode me passar preço e data?')
const WA_REGIAO = wa('Oi! Vim pelo site. Vocês atendem a minha região? Vou mandar a localização.')

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Atendimento', href: '#atende' },
  { label: 'Contato', href: '#contato' },
]

/* ================================================================
   DESIGN SYSTEM
   ================================================================ */

const SEC = 'py-16 sm:py-20'
const SEC_TIGHT = 'py-12 sm:py-16'

function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
}

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 font-head font-bold rounded-card transition-all duration-200 ease-smooth lift disabled:opacity-60 disabled:pointer-events-none'
const BTN_SIZE = { sm: 'px-4 py-2.5 text-[0.82rem]', md: 'px-5 py-3 text-sm', lg: 'px-6 py-3.5 text-[0.95rem]' }
const BTN_VARIANT = {
  primary: 'bg-gold text-charcoal hover:bg-gold-light shadow-soft',
  solid: 'bg-red text-cream hover:bg-red-dark shadow-soft',
  outline: 'border-2 border-charcoal/75 text-charcoal hover:bg-charcoal hover:text-cream',
  'outline-light': 'border-2 border-cream/40 text-cream hover:bg-cream hover:text-charcoal',
  wa: 'bg-wa text-white hover:brightness-95 shadow-soft',
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

function Eyebrow({ children, className = '', center = false }) {
  return (
    <span className={`inline-flex items-center gap-2 font-body text-2xs font-semibold uppercase tracking-[0.16em] text-gold-dark ${center ? 'justify-center' : ''} ${className}`}>
      <span className="h-px w-6 bg-current opacity-60" aria-hidden />
      {children}
    </span>
  )
}

function SectionTitle({ eyebrow, title, kicker, center = false, light = false, className = '' }) {
  return (
    <div className={`${center ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <Eyebrow center={center} className={light ? 'text-gold-light' : ''}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-2.5 font-display text-3xl sm:text-4xl lg:text-[2.7rem] leading-[1.05] uppercase ${light ? 'text-cream' : 'text-charcoal'}`}>
        {title}
      </h2>
      {kicker && <p className={`mt-3 text-[1rem] leading-relaxed ${light ? 'text-cream/75' : 'text-ink-soft'}`}>{kicker}</p>}
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
    if (reduce || typeof IntersectionObserver === 'undefined') { setSeen(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    const t = setTimeout(() => setSeen(true), 1400)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-smooth ${seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} ${className}`}
      style={{ transitionDelay: seen ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

function Logo({ light = false, className = '' }) {
  return (
    <a href="#inicio" className={`flex items-center gap-2.5 shrink-0 ${className}`} aria-label="Rainha do Entulho — ir para o início">
      <img src="/brand/crown.png" alt="" width="48" height="36" className="w-9 sm:w-10 h-auto" />
      <span className="leading-none">
        <span className={`block font-head font-extrabold tracking-tight text-[0.9rem] sm:text-[0.98rem] ${light ? 'text-cream' : 'text-charcoal'}`}>
          RAINHA DO ENTULHO
        </span>
        <span className={`mt-0.5 block font-head font-semibold text-[0.56rem] tracking-[0.2em] ${light ? 'text-gold-light' : 'text-gold-dark'}`}>
          LOCAÇÃO DE CAÇAMBAS
        </span>
      </span>
    </a>
  )
}

/* ================================================================
   HEADER  [MANTIDO]
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
        <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-2 hover:text-cream">
          <Phone size={13} strokeWidth={2.2} aria-hidden />{WHATSAPP_DISPLAY}
        </a>
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
        <Container className="flex h-16 sm:h-[4.25rem] items-center justify-between gap-4">
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

      <div className={`fixed inset-0 z-[60] lg:hidden transition ${open ? 'visible' : 'invisible'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-charcoal/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-cream shadow-lift transition-transform duration-300 ease-smooth ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between px-5 border-b border-line">
            <Logo />
            <button className="w-11 h-11 inline-flex items-center justify-center text-charcoal" onClick={() => setOpen(false)} aria-label="Fechar menu">
              <X size={24} strokeWidth={2.4} />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-1" aria-label="Navegação">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 font-head font-semibold text-lg text-charcoal border-b border-line/70">
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
   HERO  [DESIGN MANTIDO — só ajuste de ritmo vertical]
   ================================================================ */

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-2/60" aria-hidden />
      <Container className="relative py-10 sm:py-14 lg:py-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          <div>
            <Reveal><Eyebrow>{REGIAO} · Locação de caçambas</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h1 className="mt-3 font-display uppercase text-charcoal leading-[0.95] text-[2.5rem] sm:text-6xl lg:text-[4.2rem]">
                Na sua obra,<br />quem manda<br />é a <span className="text-red">Rainha.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 max-w-prose2 text-[1.03rem] leading-relaxed text-ink-soft">
                Locação de caçamba de entulho de {CACAMBA_M3} em Uruaçu-GO. Semanal ou mensal,
                com entrega e retirada na hora combinada — e preço fechado antes, direto no WhatsApp.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={WA_CACAMBA} variant="solid" size="lg" icon={ArrowRight}>Solicitar caçamba</Button>
                <Button href={WA_GERAL} variant="outline" size="lg" icon={MessageCircle} iconRight={false}>Falar no WhatsApp</Button>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.82rem] font-body text-ink-soft">
                {['Negócio de família', `Caçamba de ${CACAMBA_M3}`, 'Semanal ou mensal'].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <Check size={15} strokeWidth={3} className="text-red" aria-hidden />{t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={140} className="relative mt-4 lg:mt-0">
            <div className="relative rounded-xl2 bg-cream-2/70 ring-1 ring-line overflow-hidden">
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-red/[0.12]" aria-hidden />
              <div className="relative h-[380px] sm:h-[440px] lg:h-[470px] flex items-end justify-center">
                <img
                  src="/mascote/rainha-full.webp"
                  alt="A Rainha do Entulho, personagem da marca, com coroa e faixa"
                  width="368" height="1400"
                  fetchPriority="high" decoding="async"
                  className="h-full w-auto object-contain drop-shadow-xl select-none pointer-events-none"
                />
              </div>
            </div>
            <div className="absolute top-3 -right-2 sm:right-1 hidden sm:flex flex-col items-start rounded-card bg-cream px-3.5 py-2.5 shadow-lift ring-1 ring-line">
              <span className="text-2xs font-semibold uppercase tracking-[0.12em] text-ink-soft">Caçamba</span>
              <span className="font-head font-extrabold text-charcoal leading-none">{CACAMBA_M3}</span>
              <span className="mt-0.5 text-2xs text-ink-soft">pronta pra obra</span>
            </div>
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
   BARRA DE BENEFÍCIOS  [MANTIDO — compacto]
   ================================================================ */

const BENEFITS = [
  { icon: CalendarRange, title: 'Semanal ou mensal', text: 'Você escolhe o prazo' },
  { icon: Clock, title: 'Hora combinada', text: 'Entrega e retirada agendadas' },
  { icon: Tag, title: 'Preço fechado antes', text: 'Sem multa escondida' },
  { icon: MessageCircle, title: 'Tudo no WhatsApp', text: 'Direto com a gente' },
]

function BenefitsBar() {
  return (
    <section className="bg-charcoal text-cream">
      <Container className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/10 lg:divide-y-0 lg:divide-x lg:divide-white/10">
        {BENEFITS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 50} className="flex items-start gap-3 py-4 lg:py-5 lg:px-6 first:lg:pl-0 last:lg:pr-0">
            <Icon size={20} strokeWidth={2} className="mt-0.5 text-gold-light shrink-0" aria-hidden />
            <span>
              <span className="block font-head font-bold text-[0.9rem]">{title}</span>
              <span className="block text-[0.78rem] text-cream/60">{text}</span>
            </span>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}

/* ================================================================
   SERVIÇOS  [4 cards, visual variado]
   ================================================================ */

function Servicos() {
  return (
    <section id="servicos" className={`${SEC} bg-white`}>
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="O que a gente faz"
            title="Uma caçamba, do jeito que a obra precisa."
            kicker="Um tamanho único de 5 m³, feito pra entulho pesado. O que muda é o prazo e a forma de atender."
          />
        </Reveal>

        <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 — destaque, com preço */}
          <Reveal className="sm:col-span-2 lg:col-span-2">
            <div className="group h-full flex flex-col justify-between rounded-xl2 bg-cream-2/70 p-6 ring-1 ring-line lift">
              <div>
                <span className="grid place-items-center w-12 h-12 rounded-card bg-red text-cream">
                  <Truck size={24} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-4 font-head font-extrabold text-[1.15rem] text-charcoal">Locação de caçamba {CACAMBA_M3}</h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-soft max-w-sm">
                  Semanal ou mensal, entregue no seu endereço em Uruaçu. Pra reforma, obra ou limpeza pesada.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-head font-bold text-[0.95rem] text-gold-dark tabular-nums">{PRECO_CURTO}</span>
                <a href={WA_CACAMBA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-head font-bold text-[0.85rem] text-red group-hover:gap-2.5 transition-all">
                  Pedir no WhatsApp <ArrowRight size={16} strokeWidth={2.6} aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Cards 2 e 3 — ícone */}
          {[
            { icon: Recycle, title: 'Retirada de entulho', text: 'Obra, reforma, demolição e limpeza de quintal — a gente tira do caminho.' },
            { icon: Truck, title: 'Coleta e transporte', text: 'A gente busca a caçamba cheia e leva pro destino certo.' },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={80 + i * 60}>
              <div className="group h-full flex flex-col rounded-xl2 bg-white p-5 ring-1 ring-line shadow-soft lift">
                <span className="grid place-items-center w-11 h-11 rounded-card bg-red/[0.08] text-red">
                  <Icon size={22} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-3.5 font-head font-extrabold text-[1rem] text-charcoal">{title}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-soft flex-1">{text}</p>
                <a href={WA_CACAMBA} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-head font-bold text-[0.82rem] text-red group-hover:gap-2.5 transition-all">
                  Pedir no WhatsApp <ArrowRight size={15} strokeWidth={2.6} aria-hidden />
                </a>
              </div>
            </Reveal>
          ))}

          {/* Card 4 — charcoal invertido, pra ritmo */}
          <Reveal delay={200} className="sm:col-span-2 lg:col-span-2">
            <div className="group h-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl2 bg-charcoal p-5 sm:p-6 text-cream lift">
              <div>
                <span className="grid place-items-center w-11 h-11 rounded-card bg-gold/20 text-gold-light">
                  <HardHat size={22} strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-3.5 font-head font-extrabold text-[1.05rem]">Atendimento para obras</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-cream/70 max-w-md">
                  Construtora e obra da cidade com fluxo de caçamba sem atrasar o cronograma.
                </p>
              </div>
              <Button href={WA_GERAL} variant="primary" size="sm" icon={ArrowRight} className="shrink-0">Falar com a gente</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ================================================================
   COMO FUNCIONA  [4 passos horizontais, compacto]
   ================================================================ */

const STEPS = [
  { icon: MessageCircle, title: 'Chama no WhatsApp', text: 'Manda o endereço e o tipo de material.' },
  { icon: Truck, title: 'A gente entrega', text: 'Caçamba na porta, dia e hora combinados.' },
  { icon: CalendarRange, title: 'Você usa no seu prazo', text: '7 ou 30 dias. Você escolhe.' },
  { icon: Recycle, title: 'A gente retira', text: 'Avisou, a gente busca e dá o destino certo.' },
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className={`${SEC} bg-cream`}>
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Como funciona"
            title="Do WhatsApp à retirada, em 4 passos."
            kicker="Sem visita técnica, sem proposta demorada."
          />
        </Reveal>
        <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-7">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 70} className="relative">
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl text-red/25 tabular-nums leading-none">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid place-items-center w-9 h-9 rounded-card bg-charcoal text-cream shrink-0">
                  <Icon size={18} strokeWidth={2} aria-hidden />
                </span>
              </div>
              <h3 className="mt-3 font-head font-extrabold text-[0.98rem] text-charcoal">{title}</h3>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-soft">{text}</p>
              {i < STEPS.length - 1 && (
                <span className="hidden lg:block absolute top-3.5 -right-3 text-gold" aria-hidden>
                  <ArrowRight size={18} strokeWidth={2.5} />
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
   DIFERENCIAIS + RAINHA  [seção combinada, charcoal]
   ================================================================ */

const DIFERENCIAIS = [
  { icon: MessageCircle, title: 'Negócio de família', text: 'Você fala direto com quem opera. Sem central, sem intermediário.' },
  { icon: Tag, title: 'Preço combinado antes', text: 'Você sabe o valor no WhatsApp, antes da caçamba sair.' },
  { icon: CalendarRange, title: 'No seu prazo', text: 'Semanal ou mensal — e a gente retira quando você avisar.' },
]

function DiferenciaisRainha() {
  return (
    <section className={`${SEC} bg-charcoal text-cream overflow-hidden`}>
      <Container className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14 items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="h-[300px] sm:h-[360px] lg:h-[420px] flex items-end justify-center">
            <img
              src="/mascote/rainha-3q.webp"
              alt="A Rainha do Entulho"
              width="458" height="1100"
              loading="lazy" decoding="async"
              className="h-full w-auto object-contain drop-shadow-2xl select-none pointer-events-none"
            />
          </div>
        </Reveal>

        <Reveal delay={80} className="order-1 lg:order-2">
          <Eyebrow className="text-gold-light">Por que a Rainha</Eyebrow>
          <h2 className="mt-2.5 font-display uppercase leading-[0.98] text-4xl sm:text-5xl lg:text-[3.2rem] text-cream">
            Deixa que a<br />Rainha resolve.
          </h2>
          <p className="mt-3 max-w-md text-cream/75 leading-relaxed">
            Pedir caçamba é uma conversa de WhatsApp: você diz o que precisa, a gente combina preço e data.
          </p>

          <ul className="mt-6 space-y-3.5">
            {DIFERENCIAIS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3.5">
                <span className="grid place-items-center w-9 h-9 rounded-card bg-gold/15 text-gold-light shrink-0">
                  <Icon size={17} strokeWidth={2} aria-hidden />
                </span>
                <span>
                  <span className="block font-head font-bold text-[0.95rem] text-cream">{title}</span>
                  <span className="block text-[0.85rem] text-cream/65">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <Button href={WA_CACAMBA} variant="primary" size="lg" icon={ArrowRight} className="mt-7">
            Solicitar caçamba
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   FROTA + ÁREA DE ATENDIMENTO  [duas colunas]
   ================================================================ */

function FrotaAtende() {
  return (
    <section id="atende" className={`${SEC} bg-cream-2/50`}>
      <Container className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
        {/* Frota */}
        <Reveal className="flex flex-col overflow-hidden rounded-xl2 bg-white ring-1 ring-line shadow-soft">
          <picture>
            <source srcSet="/mascote/cacamba-real.webp" type="image/webp" />
            <img src="/mascote/cacamba-real.jpg" alt="Caçamba de 5 m³ da Rainha do Entulho na rua, em Uruaçu" loading="lazy" decoding="async" className="w-full h-56 sm:h-64 object-cover" />
          </picture>
          <div className="p-6">
            <Eyebrow>Nossa operação</Eyebrow>
            <h2 className="mt-2 font-display uppercase text-2xl sm:text-3xl text-charcoal leading-tight">Estrutura pronta pra sua obra</h2>
            <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-soft">
              Caçamba de {CACAMBA_M3} e caminhão poliguindaste rodando Uruaçu. Operação da empresa — não é intermediação.
            </p>
            <a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-head font-bold text-[0.85rem] text-red hover:gap-2.5 transition-all">
              Pedir foto da caçamba <ArrowRight size={16} strokeWidth={2.6} aria-hidden />
            </a>
          </div>
        </Reveal>

        {/* Área de atendimento */}
        <Reveal delay={100} className="flex flex-col rounded-xl2 bg-charcoal text-cream p-6 sm:p-8">
          <Eyebrow className="text-gold-light">Onde a gente chega</Eyebrow>
          <h2 className="mt-2 font-display uppercase text-2xl sm:text-3xl leading-tight">Atende Uruaçu-GO e região</h2>
          <p className="mt-2.5 text-[0.92rem] leading-relaxed text-cream/70">
            Base no perímetro urbano de Uruaçu. A gente roda os bairros da cidade e combina a distância pra fora do perímetro.
          </p>

          <div className="mt-5 flex-1 grid place-items-center rounded-card bg-white/[0.04] ring-1 ring-white/10 py-8">
            <div className="text-center">
              <span className="grid place-items-center w-14 h-14 mx-auto rounded-full bg-gold/15 text-gold-light">
                <MapPin size={26} strokeWidth={2} aria-hidden />
              </span>
              <p className="mt-3 font-display uppercase text-xl text-cream leading-none">Uruaçu-GO</p>
              <p className="mt-1 text-[0.78rem] text-cream/55">Perímetro urbano e região</p>
            </div>
          </div>

          <Button href={WA_REGIAO} variant="primary" size="md" icon={MapPin} iconRight={false} className="mt-5 self-start">
            Consultar minha região
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   CTA WHATSAPP  [horizontal, altura controlada]  id=contato
   ================================================================ */

function CtaWhatsapp() {
  return (
    <section id="contato" className="relative overflow-hidden bg-red text-cream">
      <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-gold/20 blur-2xl" aria-hidden />
      <Container className="relative grid lg:grid-cols-[1.25fr_0.75fr] gap-6 items-center py-12 sm:py-16">
        <Reveal>
          <h2 className="font-display uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-[3.3rem]">
            Precisou de caçamba?<br /><span className="text-gold-light">Chama a Rainha.</span>
          </h2>
          <p className="mt-3 max-w-md text-cream/85">Resposta rápida, preço combinado antes e entrega com hora marcada em Uruaçu.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button href={WA_CACAMBA} variant="primary" size="lg" icon={MessageCircle} iconRight={false}>Pedir pelo WhatsApp</Button>
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="font-head font-bold text-cream/90 hover:text-cream tabular-nums">{WHATSAPP_DISPLAY}</a>
          </div>
        </Reveal>
        <Reveal delay={120} className="hidden lg:block">
          <div className="h-[220px] lg:h-[260px] flex items-end justify-end">
            <img
              src="/mascote/rainha-bust.webp"
              alt=""
              width="832" height="700"
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
   FAQ  [5 perguntas, compacto]
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
    q: 'Como funciona a retirada?',
    a: 'Quando encher ou acabar o prazo, você avisa no WhatsApp e a gente agenda a retirada. O material vai pro destino certo.',
  },
  {
    q: 'Quais regiões vocês atendem?',
    a: 'Uruaçu-GO e região, com base no perímetro urbano. Não sabe se a gente chega até você? Manda a localização no WhatsApp que a gente confirma.',
  },
]

function FAQItem({ q, a, open, onToggle, id }) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={`faq-btn-${id}`}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-4 text-left"
        >
          <span className="font-head font-bold text-[0.98rem] text-charcoal">{q}</span>
          <ChevronDown size={20} strokeWidth={2.4} className={`shrink-0 text-red transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      </h3>
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        className={`grid transition-all duration-300 ease-smooth ${open ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="text-[0.9rem] leading-relaxed text-ink-soft">{a}</p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className={`${SEC_TIGHT} bg-white`}>
      <Container className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14">
        <Reveal>
          <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes." />
          <p className="mt-3 text-[0.92rem] text-ink-soft">
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
   FOOTER  [compacto]
   ================================================================ */

function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="h-1 edge-gold opacity-80" aria-hidden />
      <Container className="py-10 grid gap-8 md:grid-cols-[1.5fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-[0.84rem] leading-relaxed">
            Locação de caçamba de entulho de {CACAMBA_M3} em Uruaçu-GO. Negócio de família.
          </p>
        </div>

        <nav aria-label="Navegação">
          <h4 className="font-head font-bold text-2xs uppercase tracking-[0.14em] text-gold-light">Navegação</h4>
          <ul className="mt-3.5 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className="text-[0.85rem] hover:text-cream">{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="font-head font-bold text-2xs uppercase tracking-[0.14em] text-gold-light">Contato</h4>
          <ul className="mt-3.5 space-y-2.5 text-[0.85rem]">
            <li><a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="hover:text-cream">WhatsApp {WHATSAPP_DISPLAY}</a></li>
            <li>{REGIAO}</li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cream"><Instagram size={14} strokeWidth={2} aria-hidden />{INSTAGRAM_HANDLE}</a></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 text-[0.74rem] text-cream/50">
          <span>© {new Date().getFullYear()} Rainha do Entulho · CNPJ {CNPJ} · Uruaçu-GO</span>
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
        <Servicos />
        <ComoFunciona />
        <DiferenciaisRainha />
        <FrotaAtende />
        {/* Prova social: entra quando houver depoimentos/nota do Google reais. */}
        <CtaWhatsapp />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
