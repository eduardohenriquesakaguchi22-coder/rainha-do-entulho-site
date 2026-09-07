import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageCircle, Phone, MapPin, ArrowRight, ArrowUpRight, Check,
  ChevronDown, Menu, X, Instagram,
} from 'lucide-react'

/* ================================================================
   RAINHA DO ENTULHO — Homepage (redesign v3 "Editorial Industrial")
   Referência de hierarquia/composição: catálogos de equipamento pesado.
   Identidade 100% Rainha do Entulho. Só dados reais confirmados.
   A mascote é o único elemento 3D/digital — proposital, aparece em
   3 momentos: HERO, COMO FUNCIONA e CTA FINAL.
   ----------------------------------------------------------------
   FOTOS — só a foto REAL da caçamba (usada em 2 recortes diferentes):
     /mascote/cacamba-real.webp   → estabelece a caçamba inteira (Hero)
     /mascote/cacamba-logo.webp   → detalhe da pintura/logotipo (seção A CAÇAMBA)
   As cenas CGI (hero-operacao, diferenciais-rainha) NÃO são usadas — pareciam
   IA e tinham a mascote embutida competindo com o equipamento. Ficam no disco.
   Quando o cliente enviar fotos reais de entrega/retirada/obra, elas entram
   nos Serviços e numa Galeria (marcador antes do FAQ).
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
  return <Tag className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</Tag>
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
      <div className={`border-b transition-colors duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur border-line' : 'bg-cream border-line/60'}`}>
        <Container className="flex h-16 lg:h-[4.5rem] items-center justify-between gap-6">
          <Logo />
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-underline font-head text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-charcoal/80 hover:text-charcoal">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button href={WA_ORCAMENTO} variant="primary" size="md" icon={ArrowUpRight}>Pedir orçamento</Button>
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
              Pedir orçamento
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
    <section id="topo" className="relative bg-cream">
      <Container className="grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-center py-14 sm:py-20 lg:py-24">
        {/* Coluna texto */}
        <div className="max-w-xl">
          <Reveal><Kicker>Caçamba de entulho · {REGIAO}</Kicker></Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 font-display uppercase text-charcoal leading-[0.94] text-[2.6rem] sm:text-[3.6rem] lg:text-[4.1rem]">
              Caçamba de entulho<br />pra sua obra<br /><span className="text-red">em Uruaçu.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-prose2 text-[1.02rem] leading-relaxed text-ink-soft">
              A gente aluga caçamba de {CACAMBA_M3} por semana ou por mês. Leva até a obra,
              busca quando você terminar, e passa o preço antes no WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={WA_CACAMBA} variant="primary" size="lg">Pedir uma caçamba</Button>
              <Button href="#como-funciona" variant="outline" size="lg" icon={ArrowRight}>Ver como funciona</Button>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <dl className="mt-10 grid grid-cols-3 gap-px bg-line border-y border-line">
              {[
                ['Tamanho', CACAMBA_M3],
                ['Aluguel', 'Semana ou mês'],
                ['Atende', 'Uruaçu-GO'],
              ].map(([k, v]) => (
                <div key={k} className="bg-cream px-1 py-3">
                  <dt className="font-head text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink-soft">{k}</dt>
                  <dd className="mt-1 font-head font-extrabold text-[0.95rem] text-charcoal">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Coluna imagem + mascote */}
        <Reveal delay={140} className="relative lg:pl-14">
          <div className="ph-zoom relative border border-charcoal/12 bg-charcoal">
            <div className="h-1 bg-gold" aria-hidden />
            <picture>
              <source srcSet="/mascote/cacamba-real.webp" type="image/webp" />
              <img
                src="/mascote/cacamba-real.jpg"
                alt="Caçamba de 5 m³ da Rainha do Entulho na rua, em Uruaçu-GO"
                width="1200" height="917"
                fetchPriority="high" decoding="async"
                className="w-full aspect-[5/4] object-cover object-[56%_44%]"
              />
            </picture>
            <div className="absolute right-0 bottom-0 bg-charcoal text-cream px-4 py-2.5 text-right">
              <span className="block font-head text-[0.56rem] font-bold uppercase tracking-[0.16em] text-gold-light">Nossa caçamba</span>
              <span className="block font-head font-extrabold text-[0.82rem] leading-tight">{CACAMBA_M3} · Uruaçu-GO</span>
            </div>
          </div>
          {/* Mascote ao lado da foto — secundária ao equipamento, pés na mesma base, não flutua */}
          <div className="pointer-events-none absolute left-0 sm:-left-7 lg:-left-3 bottom-0 w-[27%] sm:w-[24%] max-w-[140px]">
            <div className="absolute inset-x-1 -bottom-1 h-3 rounded-[50%] bg-charcoal/25 blur-md" aria-hidden />
            <img
              src="/mascote/rainha-apontando.webp"
              alt="A Rainha do Entulho, a mascote da empresa, ao lado da caçamba"
              width="364" height="688"
              loading="lazy" decoding="async"
              className="relative w-full h-auto object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.26)]"
            />
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
            className={`py-7 lg:py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0 ${TRUST_BORDERS[i]}`}
          >
            <span className="font-display text-[0.95rem] text-gold-light/70 tabular-nums">{n}</span>
            <h3 className="mt-1.5 font-head font-extrabold text-[0.98rem]">{title}</h3>
            <p className="mt-1 text-[0.8rem] leading-snug text-cream/55">{text}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}

/* ================================================================
   SERVIÇOS — apresentação editorial, numerada
   ================================================================ */

function ServiceRow({ n, title, text, spec, cta, href, image, imageAlt, reverse, dark }) {
  return (
    <Reveal
      className={`grid gap-8 lg:gap-14 items-center ${image ? 'lg:grid-cols-2' : 'lg:grid-cols-[0.9fr_1.1fr]'} ${dark ? 'text-cream' : ''}`}
    >
      {/* Bloco texto */}
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="flex items-baseline gap-4">
          <span className={`font-display text-[2.4rem] leading-none tabular-nums ${dark ? 'text-gold-light/40' : 'text-red/20'}`}>{n}</span>
          <h3 className={`font-display uppercase leading-[0.98] text-[1.8rem] sm:text-[2.1rem] ${dark ? 'text-cream' : 'text-charcoal'}`}>{title}</h3>
        </div>
        <p className={`mt-4 max-w-md text-[0.98rem] leading-relaxed ${dark ? 'text-cream/70' : 'text-ink-soft'}`}>{text}</p>
        {spec && (
          <ul className={`mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.82rem] font-head font-semibold ${dark ? 'text-cream/80' : 'text-charcoal'}`}>
            {spec.map((s) => (
              <li key={s} className="inline-flex items-center gap-1.5">
                <Check size={14} strokeWidth={3} className={dark ? 'text-gold-light' : 'text-red'} aria-hidden />{s}
              </li>
            ))}
          </ul>
        )}
        <a
          href={href}
          target="_blank" rel="noopener noreferrer"
          className={`mt-6 inline-flex items-center gap-2 font-head font-bold uppercase tracking-[0.06em] text-[0.78rem] ${dark ? 'text-gold-light hover:text-cream' : 'text-red hover:text-red-dark'} transition-colors`}
        >
          {cta} <ArrowRight size={15} strokeWidth={2.8} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
        </a>
      </div>

      {/* Bloco imagem (opcional) */}
      {image && (
        <div className={`ph-zoom border border-charcoal/12 ${reverse ? 'lg:order-1' : ''}`}>
          <picture>
            <source srcSet={image.replace('.jpg', '.webp')} type="image/webp" />
            <img src={image} alt={imageAlt} width="1100" height="825" loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover object-[50%_22%]" />
          </picture>
        </div>
      )}
      {/* Sem imagem: bloco tipográfico */}
      {!image && (
        <div className={`border-l-2 pl-6 lg:pl-10 py-2 ${dark ? 'border-gold-light/40' : 'border-red/30'} ${reverse ? 'lg:order-1' : ''}`}>
          <p className={`font-display uppercase leading-[1.02] text-[1.5rem] sm:text-[1.9rem] ${dark ? 'text-cream/90' : 'text-charcoal/85'}`}>
            {spec && spec.length
              ? spec.join(' · ')
              : 'Uma conversa de WhatsApp resolve.'}
          </p>
        </div>
      )}
    </Reveal>
  )
}

function Servicos() {
  return (
    <section id="servicos" className="bg-cream">
      <Container className="py-20 sm:py-24 lg:py-28">
        <Reveal className="max-w-2xl">
          <Kicker>O que a gente faz</Kicker>
          <h2 className="mt-4 font-display uppercase text-charcoal leading-[0.98] text-[2.3rem] sm:text-[3rem]">
            Aluguel de caçamba e retirada de entulho
          </h2>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
            A caçamba é uma só, de {CACAMBA_M3}. O que muda é quanto tempo você fica com ela
            e o que você precisa que a gente faça.
          </p>
        </Reveal>

        {/* Sem imagem por serviço: os números 01/02/03 + tipografia forte
            separam os serviços. Quando o cliente enviar fotos reais de
            entrega e de retirada, dá pra colocar uma foto grande por linha. */}
        <div className="mt-14 lg:mt-16 space-y-16 lg:space-y-20">
          <ServiceRow
            n="01"
            title="Aluguel de caçamba"
            text="A gente leva a caçamba de 5 m³ até você e busca no fim do prazo. Serve pra reforma, obra, demolição ou aquela limpeza de quintal que junta muito entulho."
            spec={[PRECO_SEMANAL, PRECO_MENSAL]}
            cta="Pedir no WhatsApp"
            href={WA_CACAMBA}
          />

          <ServiceRow
            n="02"
            title="Retirada de entulho"
            text="Encheu a caçamba? A gente busca, tira o material da frente e leva pro lugar certo. Vale pra obra, reforma, demolição e limpeza de terreno."
            spec={['Obra e reforma', 'Demolição', 'Limpeza de terreno']}
            cta="Falar com a gente"
            href={WA_GERAL}
            reverse
          />

          <ServiceRow
            n="03"
            title="Troca de caçamba"
            text="Se a obra é longa e a caçamba enche antes do prazo, a gente vem, tira a cheia e deixa uma vazia no lugar. Você não para a obra."
            spec={['Caminhão é nosso', 'Sem intermediário']}
            cta="Combinar a troca"
            href={WA_GERAL}
          />
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
      <div className="grid lg:grid-cols-2">
        {/* Foto grande, full-bleed no lado — detalhe REAL da pintura na caçamba */}
        <Reveal className="ph-zoom relative min-h-[360px] lg:min-h-[560px] border-b lg:border-b-0 lg:border-r border-white/10">
          <picture>
            <source srcSet="/mascote/cacamba-logo.webp" type="image/webp" />
            <img
              src="/mascote/cacamba-logo.jpg"
              alt="Logotipo da Rainha do Entulho pintado na caçamba: coroa, nome e telefone"
              width="708" height="568"
              loading="lazy" decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-[44%_46%]"
            />
          </picture>
        </Reveal>

        {/* Especificações */}
        <Reveal delay={80} className="px-5 sm:px-10 lg:px-16 py-16 lg:py-20">
          <Kicker light>A caçamba</Kicker>
          <h2 className="mt-4 font-display uppercase leading-[0.98] text-[2.2rem] sm:text-[2.8rem]">
            Como é a caçamba
          </h2>
          <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-cream/70">
            É a caçamba de metal de sempre, de {CACAMBA_M3}. Quem leva e busca é a gente, no nosso
            caminhão. Você não passa por intermediário.
          </p>

          <dl className="mt-9 divide-y divide-white/10 border-y border-white/10">
            {SPECS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] sm:grid-cols-[11rem_1fr] gap-4 py-3.5">
                <dt className="font-head text-[0.68rem] font-bold uppercase tracking-[0.14em] text-cream/50">{k}</dt>
                <dd className="font-head font-semibold text-[0.9rem] text-cream tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
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

const STEPS = [
  ['01', 'Chama no WhatsApp', 'Fala onde é a obra e o que você vai jogar fora.'],
  ['02', 'A gente combina tudo', 'Passa o preço e o dia da entrega na hora.'],
  ['03', 'A caçamba chega', 'A gente leva até o local no dia combinado.'],
  ['04', 'Depois a gente busca', 'Encheu ou acabou o prazo? Você avisa e a gente tira.'],
]

function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-cream">
      <Container className="py-20 sm:py-24 lg:py-28">
        <Reveal className="max-w-2xl">
          <Kicker>Como funciona</Kicker>
          <h2 className="mt-4 font-display uppercase text-charcoal leading-[0.98] text-[2.3rem] sm:text-[3rem]">
            Como pedir a caçamba
          </h2>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
            Não tem visita técnica nem proposta demorada. Você chama no WhatsApp e a gente
            resolve por lá.
          </p>
        </Reveal>

        <div className="mt-12 lg:mt-14 grid lg:grid-cols-[0.62fr_1.38fr] gap-10 lg:gap-14 items-end">
          {/* Mascote — apoiada na base, ajuda a explicar */}
          <div className="relative hidden lg:block w-[62%] max-w-[190px] mx-auto lg:mx-0">
            <div className="absolute inset-x-3 -bottom-1 h-3 rounded-[50%] bg-charcoal/20 blur-md" aria-hidden />
            <img
              src="/mascote/rainha-whatsapp.webp"
              alt="A Rainha do Entulho no celular, atendendo pelo WhatsApp"
              width="210" height="422"
              loading="lazy" decoding="async"
              className="relative w-full h-auto object-contain drop-shadow-[0_14px_20px_rgba(0,0,0,0.2)]"
            />
          </div>

          {/* Etapas */}
          <ol className="divide-y divide-line border-y border-line">
            {STEPS.map(([n, title, text], i) => (
              <Reveal as="li" key={n} delay={i * 70} className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 py-6">
                <span className="font-display text-[2.3rem] sm:text-[2.9rem] leading-none text-red/25 tabular-nums">{n}</span>
                <div className="pt-1">
                  <h3 className="font-head font-extrabold text-[1.05rem] text-charcoal uppercase tracking-[0.02em]">{title}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-soft">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

/* ================================================================
   POR QUE A RAINHA — diferenciais reais, tipográfico
   ================================================================ */

const DIFERENCIAIS = [
  ['Negócio de família', 'Você fala com quem trabalha na empresa, não com atendente de central.'],
  ['O preço a gente combina antes', 'Você sabe quanto vai pagar no WhatsApp, antes da caçamba chegar.'],
  ['Você escolhe o prazo', 'Fica com a caçamba por uma semana ou por um mês. A retirada é quando você avisar.'],
  ['A caçamba e o caminhão são nossos', 'A gente não repassa pra terceiro. Quem entrega e busca é a Rainha do Entulho.'],
]

function PorQue() {
  return (
    <section id="porque" className="relative overflow-hidden bg-charcoal text-cream">
      {/* coroa como assinatura discreta — aparece só aqui */}
      <img
        src="/brand/crown.png" alt="" aria-hidden
        className="pointer-events-none absolute -left-16 -bottom-14 w-[22rem] opacity-[0.05] select-none"
      />
      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16">
          <Reveal className="lg:border-r lg:border-white/10 lg:pr-12">
            <Kicker light>A empresa</Kicker>
            <h2 className="mt-4 font-display uppercase leading-[0.96] text-[2.4rem] sm:text-[3.1rem]">
              Quem é a<br />Rainha do Entulho
            </h2>
            <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-cream/70">
              É uma empresa de Uruaçu que aluga caçamba e faz retirada de entulho. A caçamba e o
              caminhão são nossos, e quem atende é a própria família.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 border border-white/15 px-4 py-2.5">
              <span className="h-2 w-2 bg-red" aria-hidden />
              <span className="font-head text-[0.72rem] font-bold uppercase tracking-[0.14em] text-cream/70">
                CNPJ {CNPJ}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {DIFERENCIAIS.map(([title, text]) => (
                <div key={title} className="py-6 grid sm:grid-cols-[16rem_1fr] gap-2 sm:gap-6">
                  <dt className="font-display uppercase text-[1.1rem] text-gold-light leading-tight">{title}</dt>
                  <dd className="text-[0.95rem] leading-relaxed text-cream/70">{text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
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
    <section className="bg-cream">
      <Container className="py-16 sm:py-20 lg:py-24 grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16">
        <Reveal>
          <Kicker>Dúvidas</Kicker>
          <h2 className="mt-4 font-display uppercase text-charcoal leading-[0.98] text-[2.1rem] sm:text-[2.6rem]">
            Perguntas<br />frequentes
          </h2>
          <p className="mt-4 text-[0.92rem] text-ink-soft">
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
    <section id="contato" className="relative overflow-hidden bg-red text-cream">
      <div className="h-1 edge-gold opacity-90" aria-hidden />
      <Container className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 items-end">
        <div className="py-16 sm:py-20 lg:py-24">
          <Reveal>
            <Kicker light>Fala com a gente</Kicker>
            <h2 className="mt-4 font-display uppercase leading-[0.94] text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem]">
              Precisou de caçamba?<br />
              <span className="text-gold-light">Chama a Rainha.</span>
            </h2>
            <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-cream/85">
              Manda uma mensagem que a gente já passa o preço e combina a entrega.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
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

        {/* Mascote convidando — apoiada na base da seção */}
        <Reveal delay={120} className="relative hidden sm:block">
          <div className="relative mx-auto lg:ml-auto lg:mr-0 w-[62%] sm:w-[54%] lg:w-[86%] max-w-[300px]">
            <div className="absolute inset-x-6 bottom-1 h-4 rounded-[50%] bg-black/25 blur-lg" aria-hidden />
            <img
              src="/mascote/rainha-apresentando.webp"
              alt="A Rainha do Entulho chamando você pra falar no WhatsApp"
              width="308" height="436"
              loading="lazy" decoding="async"
              className="relative w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
            />
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
      <Container className="py-14 grid gap-10 md:grid-cols-[1.6fr_1fr_1.3fr]">
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
