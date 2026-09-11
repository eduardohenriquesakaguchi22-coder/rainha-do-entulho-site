import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageCircle, Phone, MapPin, ArrowRight, ArrowUpRight, Check,
  ChevronDown, Menu, X, Instagram, Truck, Recycle, RefreshCw, CheckCircle2,
  Users, Tag, Clock,
} from 'lucide-react'

/* ================================================================
   RAINHA DO ENTULHO — Homepage (redesign v3 "Editorial Industrial")
   Referência de hierarquia/composição: catálogos de equipamento pesado.
   Identidade 100% Rainha do Entulho. Só dados reais confirmados.
   A mascote é o único elemento 3D/digital — proposital, aparece em
   3 momentos: HERO, COMO FUNCIONA e CTA FINAL.
   ----------------------------------------------------------------
   FOTOS
     /mascote/hero-obra.webp    → cena da mascote 3D apresentando a caçamba na
                                  obra (HERO) — imagem fornecida pelo cliente; já
                                  traz a personagem, então NÃO usar recorte aqui.
     /mascote/cacamba-logo.webp → detalhe REAL da pintura/logotipo (seção A CAÇAMBA)
   Não usados (ficam no disco): cacamba-real, hero-operacao, diferenciais-rainha.
   Quando o cliente enviar fotos reais de entrega/retirada, elas entram nos
   Serviços e numa Galeria (marcador antes do FAQ).
   MASCOTE (recortes com alpha)
     /mascote/rainha-apontando.webp   → HERO (ao lado da caçamba)
     /mascote/rainha-whatsapp.webp    → COMO FUNCIONA (atende pelo WhatsApp)
     /mascote/rainha-apresentando.webp→ CTA FINAL (convite)
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
const PRECO_SEMANAL = 'R$ 220 / semana'
const PRECO_MENSAL = 'R$ 750 / mês'

/* NÃO confirmados — ficam FORA do site até o cliente passar:
   bairros exatos atendidos, embed de mapa, depoimentos/nota do Google,
   horário de atendimento, nº de caçambas/caminhões da frota, anos de
   mercado, lista fechada do que não pode ir na caçamba, fotos de obras. */

const wa = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
const WA_GERAL = wa('Oi! Vim pelo site e queria falar sobre aluguel de caçamba.')
const WA_CACAMBA = wa('Oi! Vim pelo site e quero alugar uma caçamba. Pode me passar o preço e a data?')
const WA_ORCAMENTO = wa('Oi! Vim pelo site e quero um orçamento. Já mando o endereço da obra e o que vou descartar.')
const WA_REGIAO = wa('Oi! Vim pelo site. Vocês entregam no meu endereço? Já mando a localização.')

const NAV_LINKS = [
  { label: 'Início', href: '#topo' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'A caçamba', href: '#cacamba' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'A empresa', href: '#porque' },
  { label: 'Contato', href: '#contato' },
]

/* ================================================================
   PRIMITIVOS
   ================================================================ */

function Container({ className = '', children, as: Tag = 'div' }) {
  return <Tag className={`mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 ${className}`}>{children}</Tag>
}

/* parallax leve pra imagens grandes — transform-only, respeita reduced-motion */
function useParallax(strength = 0.06) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 1024) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const rect = el.getBoundingClientRect()
        const mid = rect.top + rect.height / 2 - window.innerHeight / 2
        el.style.transform = `translate3d(0, ${(-mid * strength).toFixed(1)}px, 0)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [strength])
  return ref
}

const BTN_BASE =
  'group inline-flex items-center justify-center gap-2 font-head font-bold uppercase tracking-[0.04em] rounded-[3px] transition-all duration-200 ease-smooth lift disabled:opacity-60 disabled:pointer-events-none'
const BTN_SIZE = {
  sm: 'px-4 py-2.5 text-[0.72rem]',
  md: 'px-5 py-3 text-[0.78rem]',
  lg: 'px-7 py-4 text-[0.82rem]',
}
const BTN_VARIANT = {
  primary: 'bg-red text-cream hover:bg-red-dark',
  gold: 'bg-gold text-charcoal hover:bg-gold-light',
  dark: 'bg-charcoal text-cream hover:bg-charcoal-soft',
  outline: 'border border-charcoal/40 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-cream',
  'outline-light': 'border border-cream/40 text-cream hover:bg-cream hover:text-charcoal',
}

function Button({ href, variant = 'primary', size = 'md', icon: Icon = ArrowRight, iconRight = true, children, className = '', ...rest }) {
  const cls = `${BTN_BASE} ${BTN_SIZE[size]} ${BTN_VARIANT[variant]} ${className}`
  const inner = (
    <>
      {Icon && !iconRight && <Icon size={16} strokeWidth={2.6} aria-hidden />}
      <span>{children}</span>
      {Icon && iconRight && <Icon size={16} strokeWidth={2.6} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />}
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

function Kicker({ children, light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 font-head text-[0.7rem] font-bold uppercase tracking-[0.2em] ${light ? 'text-gold-light' : 'text-gold-dark'} ${className}`}>
      <span className="h-px w-8 bg-current" aria-hidden />
      {children}
    </span>
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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    const t = setTimeout(() => setSeen(true), 1600)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-[600ms] ease-smooth ${seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${className}`}
      style={{ transitionDelay: seen ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

function Logo({ light = false, className = '' }) {
  return (
    <a href="#topo" className={`flex items-center gap-2.5 shrink-0 ${className}`} aria-label="Rainha do Entulho — início">
      <img src="/brand/crown.png" alt="" width="44" height="33" className="w-8 sm:w-9 h-auto" />
      <span className="leading-none">
        <span className={`block font-head font-extrabold tracking-tight text-[0.86rem] sm:text-[0.95rem] ${light ? 'text-cream' : 'text-charcoal'}`}>
          RAINHA DO ENTULHO
        </span>
        <span className={`mt-1 block font-head font-semibold text-[0.54rem] tracking-[0.24em] ${light ? 'text-gold-light' : 'text-gold-dark'}`}>
          LOCAÇÃO DE CAÇAMBAS · URUAÇU-GO
        </span>
      </span>
    </a>
  )
}

/* ================================================================
   HEADER
   ================================================================ */

function useScrolled(offset = 8) {
  const [s, setS] = useState(false)
  useEffect(() => {
    const on = () => setS(window.scrollY > offset)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [offset])
  return s
}

function TopStrip() {
  return (
    <div className="hidden md:block bg-charcoal text-cream/70">
      <Container className="flex h-9 items-center justify-between text-[0.72rem] font-body">
        <span className="inline-flex items-center gap-2">
          <MapPin size={13} strokeWidth={2.2} aria-hidden className="text-gold-light" />
          {REGIAO}
        </span>
        <span className="inline-flex items-center gap-5">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cream transition-colors">
            <Instagram size={13} strokeWidth={2} aria-hidden />{INSTAGRAM_HANDLE}
          </a>
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-1.5 hover:text-cream transition-colors">
            <Phone size={13} strokeWidth={2.2} aria-hidden />{WHATSAPP_DISPLAY}
          </a>
        </span>
      </Container>
    </div>
  )
}

function Header() {
  const scrolled = useScrolled(8)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      <TopStrip />
      <div className={`border-b transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur border-line shadow-[0_1px_16px_-8px_rgba(44,44,44,0.35)]' : 'bg-cream border-line/50'}`}>
        <Container className={`flex items-center justify-between gap-8 transition-all duration-300 ${scrolled ? 'h-16 lg:h-[4.25rem]' : 'h-16 lg:h-[5rem]'}`}>
          <Logo />
          <nav className="hidden lg:flex items-center gap-9" aria-label="Navegação principal">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-underline font-head text-[0.82rem] font-semibold uppercase tracking-[0.07em] text-charcoal/75 hover:text-charcoal">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button href={WA_ORCAMENTO} variant="primary" size="md" icon={ArrowUpRight}>Solicitar orçamento</Button>
          </div>
          <button
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-charcoal"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={26} strokeWidth={2.2} />
          </button>
        </Container>
      </div>

      {/* Drawer mobile */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition ${open ? 'visible' : 'invisible'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-charcoal/60 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-cream shadow-lift transition-transform duration-300 ease-smooth ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between px-5 border-b border-line">
            <Logo />
            <button className="w-11 h-11 inline-flex items-center justify-center text-charcoal" onClick={() => setOpen(false)} aria-label="Fechar menu">
              <X size={24} strokeWidth={2.2} />
            </button>
          </div>
          <nav className="flex flex-col p-5" aria-label="Navegação">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-4 font-head font-bold uppercase tracking-[0.05em] text-[1.05rem] text-charcoal border-b border-line/70">
                {l.label}
              </a>
            ))}
            <Button href={WA_ORCAMENTO} variant="primary" size="lg" icon={ArrowUpRight} className="mt-6 w-full">
              Solicitar orçamento
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
  const imgRef = useParallax(0.05)
  return (
    <section id="topo" className="relative bg-cream">
      <Container className="grid lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-16 items-center py-16 sm:py-24 lg:py-28 lg:min-h-[calc(100vh-8rem)]">
        {/* Coluna texto */}
        <div className="max-w-2xl">
          <Reveal><Kicker>Caçamba de entulho · {REGIAO}</Kicker></Reveal>
          <Reveal delay={60}>
            <h1 className="mt-6 font-display uppercase text-charcoal leading-[1.13] text-[2.6rem] sm:text-[3.5rem] lg:text-[4rem]">
              Caçamba de entulho<br />pra sua obra<br /><span className="text-red">em Uruaçu.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-7 max-w-prose2 text-[1.05rem] leading-relaxed text-ink-soft">
              A gente aluga caçamba de {CACAMBA_M3} por semana ou por mês. Leva até a obra,
              busca quando você terminar, e passa o preço antes no WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={WA_CACAMBA} variant="primary" size="lg">Pedir uma caçamba</Button>
              <Button href="#como-funciona" variant="outline" size="lg" icon={ArrowRight}>Ver como funciona</Button>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <dl className="mt-12 grid grid-cols-3 gap-px bg-line border-y border-line">
              {[
                ['Tamanho', CACAMBA_M3],
                ['Aluguel', 'Semana ou mês'],
                ['Atende', 'Uruaçu-GO'],
              ].map(([k, v]) => (
                <div key={k} className="bg-cream px-1 py-4">
                  <dt className="font-head text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink-soft">{k}</dt>
                  <dd className="mt-1.5 font-head font-extrabold text-[1rem] text-charcoal">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Coluna imagem — cena da caçamba na obra (já traz a Rainha na foto) */}
        <Reveal delay={140} className="relative aspect-[4/3] lg:aspect-auto lg:h-[38rem] xl:h-[42rem]">
          <div className="ph-zoom absolute inset-0 border border-charcoal/12 bg-charcoal overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gold z-10" aria-hidden />
            <picture className="absolute inset-0 block">
              <source srcSet="/mascote/hero-obra.webp" type="image/webp" />
              <img
                ref={imgRef}
                src="/mascote/hero-obra.jpg"
                alt="Caçamba de 5 m³ da Rainha do Entulho carregada de entulho numa obra em Uruaçu-GO"
                width="1448" height="1086"
                fetchPriority="high" decoding="async"
                className="absolute inset-x-0 -top-[2%] h-[104%] w-full object-cover object-[50%_50%] will-change-transform"
              />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" aria-hidden />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   FAIXA DE CONFIANÇA
   ================================================================ */

const TRUST = [
  ['01', 'Negócio de família', 'Você fala com quem trabalha aqui'],
  ['02', `Caçamba de ${CACAMBA_M3}`, 'Dá pra obra, reforma e limpeza pesada'],
  ['03', 'Semana ou mês', 'Você escolhe quanto tempo fica com ela'],
  ['04', 'Preço combinado antes', 'Você sabe quanto vai pagar antes de fechar'],
]

const TRUST_BORDERS = [
  '',
  'border-l border-white/10',
  'border-t border-white/10 lg:border-t-0 lg:border-l',
  'border-t border-l border-white/10 lg:border-t-0',
]

function TrustBar() {
  return (
    <section className="bg-charcoal text-cream">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {TRUST.map(([n, title, text], i) => (
          <Reveal
            key={n}
            delay={i * 60}
            className={`py-9 lg:py-11 lg:px-10 lg:first:pl-0 lg:last:pr-0 ${TRUST_BORDERS[i]}`}
          >
            <span className="font-display text-[1rem] text-gold-light/60 tabular-nums">{n}</span>
            <h3 className="mt-2 font-head font-extrabold text-[1.02rem]">{title}</h3>
            <p className="mt-1.5 text-[0.82rem] leading-snug text-cream/55">{text}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}

/* ================================================================
   SERVIÇOS — cards editoriais, numerados, com cor de destaque
   ================================================================ */

const SERVICE_ACCENTS = {
  red: {
    bar: 'bg-red', num: 'text-red/15', icon: 'bg-red/10 text-red',
    chip: 'bg-red/[0.07] text-red-dark ring-1 ring-red/15',
    btn: 'bg-red text-cream hover:bg-red-dark',
  },
  gold: {
    bar: 'bg-gold-dark', num: 'text-gold-dark/20', icon: 'bg-gold/15 text-gold-dark',
    chip: 'bg-gold/[0.12] text-gold-dark ring-1 ring-gold/25',
    btn: 'bg-gold-dark text-cream hover:bg-red-dark',
  },
  charcoal: {
    bar: 'bg-charcoal', num: 'text-charcoal/10', icon: 'bg-charcoal/8 text-charcoal',
    chip: 'bg-charcoal/[0.05] text-charcoal ring-1 ring-charcoal/15',
    btn: 'bg-charcoal text-cream hover:bg-red-dark',
  },
}

const SERVICOS = [
  {
    n: '01',
    icon: Truck,
    accent: 'red',
    title: 'Aluguel de caçamba',
    text: 'A gente leva a caçamba de 5 m³ até você e busca no fim do prazo. Serve pra reforma, obra, demolição ou aquela limpeza de quintal que junta muito entulho.',
    spec: [PRECO_SEMANAL, PRECO_MENSAL],
    cta: 'Pedir no WhatsApp',
    href: WA_CACAMBA,
  },
  {
    n: '02',
    icon: Recycle,
    accent: 'gold',
    title: 'Retirada de entulho',
    text: 'Encheu a caçamba? A gente busca, tira o material da frente e leva pro lugar certo. Vale pra obra, reforma, demolição e limpeza de terreno.',
    spec: ['Obra e reforma', 'Demolição', 'Limpeza de terreno'],
    cta: 'Falar com a gente',
    href: WA_GERAL,
  },
  {
    n: '03',
    icon: RefreshCw,
    accent: 'charcoal',
    title: 'Troca de caçamba',
    text: 'Se a obra é longa e a caçamba enche antes do prazo, a gente vem, tira a cheia e deixa uma vazia no lugar. Você não para a obra.',
    spec: ['Caminhão é nosso', 'Sem intermediário'],
    cta: 'Combinar a troca',
    href: WA_GERAL,
  },
]

function ServiceCard({ n, icon: Icon, accent, title, text, spec, cta, href, delay }) {
  const a = SERVICE_ACCENTS[accent]
  return (
    <Reveal
      delay={delay}
      className="group relative flex flex-col bg-white rounded-card shadow-card ring-1 ring-charcoal/8 overflow-hidden transition-all duration-300 ease-smooth hover:shadow-lift hover:-translate-y-1.5"
    >
      <span className={`absolute inset-x-0 top-0 h-[5px] ${a.bar}`} aria-hidden />

      <div className="flex flex-col grow p-7 sm:p-8">
        <div className="flex items-start justify-between">
          <span className={`inline-flex items-center justify-center w-12 h-12 rounded-card ${a.icon}`}>
            <Icon size={22} strokeWidth={2.2} aria-hidden />
          </span>
          <span className={`font-display text-[3.4rem] leading-none tabular-nums ${a.num}`} aria-hidden>{n}</span>
        </div>

        <h3 className="mt-6 font-display uppercase leading-[1.0] text-[1.7rem] sm:text-[1.85rem] text-charcoal">
          {title}
        </h3>
        <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">{text}</p>

        {spec && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {spec.map((s) => (
              <li key={s} className={`inline-flex items-center gap-1.5 rounded-card px-3 py-1.5 text-[0.78rem] font-head font-semibold ${a.chip}`}>
                <Check size={13} strokeWidth={3} aria-hidden />{s}
              </li>
            ))}
          </ul>
        )}

        <a
          href={href}
          target="_blank" rel="noopener noreferrer"
          className={`group/link mt-7 pt-6 border-t border-charcoal/8 flex items-center justify-between gap-2 font-head font-bold uppercase tracking-[0.06em] text-[0.8rem] text-charcoal transition-colors group-hover:text-red-dark`}
        >
          {cta}
          <span className={`inline-flex items-center justify-center w-9 h-9 rounded-card ${a.btn} transition-transform duration-200 group-hover/link:translate-x-1`}>
            <ArrowRight size={16} strokeWidth={2.8} aria-hidden />
          </span>
        </a>
      </div>
    </Reveal>
  )
}

function Servicos() {
  return (
    <section id="servicos" className="bg-cream-2">
      <Container className="py-20 sm:py-24 lg:py-28">
        <Reveal className="max-w-3xl">
          <Kicker>O que a gente faz</Kicker>
          <h2 className="mt-5 font-display uppercase text-charcoal leading-[1.0] text-[2.5rem] sm:text-[3.2rem] lg:text-[3.6rem]">
            Aluguel de caçamba e retirada de entulho
          </h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-soft">
            A caçamba é uma só, de {CACAMBA_M3}. O que muda é quanto tempo você fica com ela
            e o que você precisa que a gente faça.
          </p>
        </Reveal>

        <div className="mt-12 lg:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {SERVICOS.map((s, i) => <ServiceCard key={s.n} delay={i * 80} {...s} />)}
        </div>
      </Container>
    </section>
  )
}

/* ================================================================
   A CAÇAMBA — destaque de equipamento + especificações
   ================================================================ */

const SPECS = [
  ['Tamanho', CACAMBA_M3],
  ['Tipo', 'Caçamba de entulho, de metal'],
  ['Serve pra', 'Reforma, obra, demolição e limpeza'],
  ['Aluguel', `${PRECO_SEMANAL}  ou  ${PRECO_MENSAL}`],
  ['Entrega e retirada', 'A gente combina o dia e a hora com você'],
  ['Onde a gente atende', REGIAO],
]

function Cacamba() {
  return (
    <section id="cacamba" className="bg-charcoal text-cream">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        {/* Foto grande, full-bleed no lado — detalhe REAL da pintura na caçamba */}
        <Reveal className="ph-zoom relative min-h-[360px] lg:min-h-[540px] border-b lg:border-b-0 lg:border-r border-white/10">
          <picture>
            <source srcSet="/mascote/cacamba-logo.webp" type="image/webp" />
            <img
              src="/mascote/cacamba-logo.jpg"
              alt="Caçamba da Rainha do Entulho com coroa, nome e telefone, numa obra ao entardecer"
              width="1800" height="1084"
              loading="lazy" decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-[58%_58%]"
            />
          </picture>
        </Reveal>

        {/* Especificações */}
        <Reveal delay={80} className="px-5 sm:px-10 lg:px-20 py-16 lg:py-20">
          <Kicker light>A caçamba</Kicker>
          <h2 className="mt-5 font-display uppercase leading-[1.0] text-[2.4rem] sm:text-[3rem]">
            Como é a caçamba
          </h2>
          <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-cream/70">
            É a caçamba de metal de sempre, de {CACAMBA_M3}. Quem leva e busca é a gente, no nosso
            caminhão. Você não passa por intermediário.
          </p>

          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {SPECS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] sm:grid-cols-[12rem_1fr] gap-4 py-4">
                <dt className="font-head text-[0.68rem] font-bold uppercase tracking-[0.14em] text-cream/50">{k}</dt>
                <dd className="font-head font-semibold text-[0.92rem] text-cream tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={WA_CACAMBA} variant="gold" size="lg">Pedir a caçamba</Button>
            <Button href={WA_REGIAO} variant="outline-light" size="lg" icon={MapPin} iconRight={false}>Ver se atende meu endereço</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================
   COMO FUNCIONA — 4 etapas + mascote (momento 2)
   ================================================================ */

const STEP_ACCENTS = {
  red: { bg: 'bg-red', text: 'text-red', line: 'bg-red/25' },
  gold: { bg: 'bg-gold-dark', text: 'text-gold-dark', line: 'bg-gold/30' },
  charcoal: { bg: 'bg-charcoal', text: 'text-charcoal', line: 'bg-charcoal/20' },
  redDeep: { bg: 'bg-red-deep', text: 'text-red-deep', line: 'bg-red-deep/25' },
}

const STEPS = [
  { n: '01', icon: MessageCircle, accent: 'red', title: 'Chama no WhatsApp', text: 'Fala onde é a obra e o que você vai jogar fora.' },
  { n: '02', icon: CheckCircle2, accent: 'gold', title: 'A gente combina tudo', text: 'Passa o preço e o dia da entrega na hora.' },
  { n: '03', icon: Truck, accent: 'charcoal', title: 'A caçamba chega', text: 'A gente leva até o local no dia combinado.' },
  { n: '04', icon: RefreshCw, accent: 'redDeep', title: 'Depois a gente busca', text: 'Encheu ou acabou o prazo? Você avisa e a gente tira.' },
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-cream">
      <Container className="py-20 sm:py-24 lg:py-28">
        <Reveal className="max-w-3xl">
          <Kicker>Como funciona</Kicker>
          <h2 className="mt-5 font-display uppercase text-charcoal leading-[0.96] text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem]">
            Como pedir a caçamba
          </h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-soft">
            Não tem visita técnica nem proposta demorada. Você chama no WhatsApp e a gente
            resolve por lá.
          </p>
        </Reveal>

        <div className="mt-12 lg:mt-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Foto — a Rainha na obra, com prancheta, celular e a caçamba */}
          <Reveal className="ph-zoom rounded-card overflow-hidden ring-1 ring-charcoal/10 shadow-card lg:sticky lg:top-28">
            <picture>
              <source srcSet="/mascote/rainha-whatsapp.webp" type="image/webp" />
              <img
                src="/mascote/rainha-whatsapp.jpg"
                alt="A Rainha do Entulho numa obra, com prancheta e celular, ao lado da caçamba"
                width="1448" height="1086"
                loading="lazy" decoding="async"
                className="block w-full h-auto"
              />
            </picture>
          </Reveal>

          {/* Etapas — trilha vertical com selo colorido por etapa */}
          <ol className="relative">
            {STEPS.map(({ n, icon: Icon, accent, title, text }, i) => {
              const a = STEP_ACCENTS[accent]
              const last = i === STEPS.length - 1
              return (
                <Reveal as="li" key={n} delay={i * 80} className={`relative flex gap-5 sm:gap-6 ${last ? '' : 'pb-9 lg:pb-10'}`}>
                  {!last && (
                    <span className={`absolute left-[27px] sm:left-[31px] top-14 sm:top-16 bottom-0 w-px ${a.line}`} aria-hidden />
                  )}
                  <span className={`relative z-10 shrink-0 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full ${a.bg} text-cream shadow-card`}>
                    <Icon size={24} strokeWidth={2.2} aria-hidden />
                  </span>
                  <div className="pt-1 sm:pt-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`font-display text-[1.05rem] tracking-wide tabular-nums ${a.text}`}>{n}</span>
                      <span className="h-px w-6 bg-line" aria-hidden />
                    </div>
                    <h3 className="mt-1.5 font-head font-extrabold text-[1.15rem] sm:text-[1.25rem] text-charcoal uppercase tracking-[0.02em]">{title}</h3>
                    <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-soft max-w-md">{text}</p>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}

/* ================================================================
   POR QUE A RAINHA — diferenciais reais, tipográfico
   ================================================================ */

const DIFF_ACCENTS = {
  red: 'bg-red text-cream',
  gold: 'bg-gold-dark text-cream',
  cream: 'bg-cream text-charcoal',
  redDeep: 'bg-red-deep text-cream',
}

const DIFERENCIAIS = [
  { icon: Users, accent: 'red', title: 'Negócio de família', text: 'Você fala com quem trabalha na empresa, não com central de atendimento.' },
  { icon: Tag, accent: 'gold', title: 'Preço combinado antes', text: 'Você sabe quanto vai pagar no WhatsApp, antes da caçamba chegar.' },
  { icon: Clock, accent: 'cream', title: 'No seu prazo', text: 'Uma semana ou um mês. A retirada acontece quando você avisar.' },
  { icon: Truck, accent: 'redDeep', title: 'Caminhão próprio', text: 'A gente não repassa pra terceiro. Quem entrega e busca é a Rainha.' },
]

function PorQue() {
  return (
    <section id="porque" className="relative overflow-hidden bg-charcoal text-cream">
      {/* coroa como assinatura discreta — aparece só aqui */}
      <img
        src="/brand/crown.png" alt="" aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-20 w-[26rem] opacity-[0.05] select-none"
      />
      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <Kicker light>A empresa</Kicker>
            <h2 className="mt-5 font-display uppercase leading-[1.0] text-[2.6rem] sm:text-[3.3rem] lg:text-[3.7rem]">
              Quem é a<br />Rainha do Entulho
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:pt-3">
            <p className="max-w-md text-[1.05rem] leading-relaxed text-cream/70">
              É uma empresa de Uruaçu que aluga caçamba e faz retirada de entulho. A caçamba e o
              caminhão são nossos, e quem atende é a própria família.
            </p>
            <div className="mt-7 inline-flex items-center gap-3 border border-white/15 px-4 py-2.5">
              <span className="h-2 w-2 bg-red" aria-hidden />
              <span className="font-head text-[0.72rem] font-bold uppercase tracking-[0.14em] text-cream/70">
                CNPJ {CNPJ}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Diferenciais — cards com selo colorido por item */}
        <div className="mt-14 lg:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {DIFERENCIAIS.map(({ icon: Icon, accent, title, text }, i) => (
            <Reveal
              key={title} delay={i * 70}
              className="group relative rounded-card bg-white/[0.04] ring-1 ring-white/10 p-7 lg:p-8 transition-all duration-300 ease-smooth hover:bg-white/[0.06] hover:ring-white/20 hover:-translate-y-1"
            >
              <span className="absolute top-6 right-6 font-display text-[1.7rem] leading-none text-white/10 tabular-nums" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`relative inline-flex items-center justify-center w-12 h-12 rounded-full shadow-card ${DIFF_ACCENTS[accent]}`}>
                <Icon size={21} strokeWidth={2.2} aria-hidden />
              </span>
              <h3 className="mt-5 font-display uppercase text-[1.2rem] leading-tight text-gold-light">{title}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-cream/65">{text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ================================================================
   GALERIA / TRABALHOS
   Entra quando o cliente enviar fotos REAIS de obras e retiradas.
   Não usar imagens genéricas nem repetir as fotos das outras seções.
   ================================================================ */
/* function Galeria() { ... } */

/* ================================================================
   FAQ — enxuto, editorial (sem cards)
   ================================================================ */

const FAQS = [
  {
    q: 'Como funciona o aluguel?',
    a: `Você aluga a caçamba de ${CACAMBA_M3} por 7 dias ou por 30 dias. A gente entrega no endereço em Uruaçu e busca no fim do prazo. Se encher antes, é só avisar que a gente tira.`,
  },
  {
    q: 'Como peço uma caçamba?',
    a: `Manda mensagem no WhatsApp ${WHATSAPP_DISPLAY} com o endereço da obra e o que você vai descartar. A gente responde com o preço e a data.`,
  },
  {
    q: 'Quanto custa?',
    a: `${PRECO_SEMANAL} ou ${PRECO_MENSAL}. A gente confirma o valor no WhatsApp antes de entregar. Não fazemos aluguel por diária.`,
  },
  {
    q: 'Quanto tempo posso ficar com a caçamba?',
    a: '7 dias no plano semanal ou 30 dias no mensal. Se precisar de mais tempo, é só avisar que a gente combina.',
  },
  {
    q: 'O que pode ir na caçamba?',
    a: 'Entulho e resíduo de obra ou reforma — tijolo, concreto, argamassa, cerâmica, madeira, esse tipo de coisa. Material perigoso, químico ou proibido por lei não pode. Na dúvida, fala com a gente antes.',
  },
  {
    q: 'Vocês entregam no meu endereço?',
    a: 'A gente atende Uruaçu e a região. Se não tiver certeza que chega até você, manda a localização no WhatsApp que a gente confirma.',
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
          className="flex w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="font-head font-bold text-[1rem] text-charcoal uppercase tracking-[0.02em]">{q}</span>
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
          <p className="max-w-2xl text-[0.94rem] leading-relaxed text-ink-soft">{a}</p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-cream border-t border-line">
      <Container className="py-20 sm:py-24 lg:py-28 grid lg:grid-cols-[0.65fr_1.35fr] gap-12 lg:gap-20">
        <Reveal>
          <Kicker>Dúvidas</Kicker>
          <h2 className="mt-5 font-display uppercase text-charcoal leading-[0.96] text-[2.4rem] sm:text-[3rem]">
            Perguntas<br />frequentes
          </h2>
          <p className="mt-5 text-[0.95rem] text-ink-soft">
            Ficou com outra dúvida?{' '}
            <a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="font-semibold text-red underline underline-offset-2 hover:text-red-dark">
              Chama no WhatsApp.
            </a>
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="border-t border-line">
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
   CTA FINAL — mascote (momento 3)
   ================================================================ */

function CtaFinal() {
  return (
    <section id="contato" className="relative overflow-hidden bg-red-crimson text-cream">
      <div className="h-1 edge-gold opacity-90" aria-hidden />
      <Container className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-end">
        <div className="py-16 sm:py-20 lg:py-24">
          <Reveal>
            <Kicker light>Fala com a gente</Kicker>
            <h2 className="mt-5 font-display uppercase leading-[1.0] text-[2.7rem] sm:text-[3.5rem] lg:text-[4.1rem]">
              Precisou de caçamba?<br />
              <span className="text-gold-light">Chama a Rainha.</span>
            </h2>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-cream/85">
              Manda uma mensagem que a gente já passa o preço e combina a entrega.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={WA_CACAMBA} variant="gold" size="lg" icon={MessageCircle} iconRight={false}>
                Pedir pelo WhatsApp
              </Button>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="inline-flex items-center gap-2 font-head font-bold text-lg tabular-nums text-cream hover:text-gold-light transition-colors"
              >
                <Phone size={18} strokeWidth={2.6} className="text-gold-light" aria-hidden />
                {WHATSAPP_DISPLAY}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Retrato da Rainha — mesmo vermelho da seção, funde sem borda visível */}
        <Reveal delay={120} className="relative hidden sm:block">
          <div className="relative mx-auto lg:ml-auto lg:mr-0 w-[64%] sm:w-[58%] lg:w-[74%] max-w-[320px] aspect-square">
            <picture>
              <source srcSet="/mascote/rainha-apresentando.webp" type="image/webp" />
              <img
                src="/mascote/rainha-apresentando.jpg"
                alt="A Rainha do Entulho, de coroa e faixa, chamando você pra falar no WhatsApp"
                width="1000" height="1000"
                loading="lazy" decoding="async"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ================================================================
   FOOTER
   ================================================================ */

function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70">
      <Container className="py-16 lg:py-20 grid gap-12 md:grid-cols-[1.6fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-[0.86rem] leading-relaxed">
            Aluguel de caçamba de entulho de {CACAMBA_M3} em Uruaçu-GO. Negócio de família, caminhão próprio.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h4 className="font-head font-bold text-[0.62rem] uppercase tracking-[0.18em] text-gold-light">Navegação</h4>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className="text-[0.86rem] hover:text-cream transition-colors">{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="font-head font-bold text-[0.62rem] uppercase tracking-[0.18em] text-gold-light">Contato</h4>
          <ul className="mt-4 space-y-2.5 text-[0.86rem]">
            <li><a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-cream transition-colors"><MessageCircle size={14} strokeWidth={2} aria-hidden />WhatsApp {WHATSAPP_DISPLAY}</a></li>
            <li className="inline-flex items-center gap-2"><MapPin size={14} strokeWidth={2} aria-hidden />{REGIAO}</li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-cream transition-colors"><Instagram size={14} strokeWidth={2} aria-hidden />{INSTAGRAM_HANDLE}</a></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-[0.74rem] text-cream/50">
          <span>© {new Date().getFullYear()} Rainha do Entulho · CNPJ {CNPJ} · Uruaçu-GO</span>
          <span className="flex gap-5">
            <Link to="/privacidade" className="hover:text-cream transition-colors">Privacidade</Link>
            <Link to="/termos" className="hover:text-cream transition-colors">Termos</Link>
          </span>
        </Container>
      </div>
    </footer>
  )
}

/* ================================================================
   WHATSAPP FLUTUANTE (mobile)
   ================================================================ */

function FloatingWhatsApp() {
  const show = useScrolled(500)
  return (
    <a
      href={WA_CACAMBA}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`lg:hidden fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 bg-wa text-white font-head font-bold text-[0.78rem] uppercase tracking-[0.04em] px-4 py-3 rounded-[3px] shadow-lift transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      <MessageCircle size={18} strokeWidth={2.4} />
      Pedir caçamba
    </a>
  )
}

/* ================================================================
   PÁGINA
   ================================================================ */

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <a href="#servicos" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:bg-charcoal focus:text-cream focus:px-4 focus:py-2">
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Servicos />
        <Cacamba />
        <ComoFunciona />
        <PorQue />
        {/* GALERIA/TRABALHOS entra aqui quando houver fotos reais de obras. */}
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
