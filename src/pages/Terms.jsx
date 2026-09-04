import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        <Link to="/" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-red hover:text-red-dark transition mb-10">
          <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
          Voltar pro site
        </Link>

        <Link to="/" className="flex items-center gap-2.5 mb-8" aria-label="Rainha do Entulho — ir para o início">
          <img src="/brand/crown.png" alt="" width="48" height="36" className="w-9 h-auto" />
          <span className="leading-none">
            <span className="block font-head font-extrabold tracking-tight text-[0.9rem] text-charcoal">
              RAINHA DO ENTULHO
            </span>
            <span className="mt-0.5 block font-head font-semibold text-[0.56rem] tracking-[0.2em] text-gold-dark">
              LOCAÇÃO DE CAÇAMBAS
            </span>
          </span>
        </Link>

        <h1 className="font-display uppercase text-charcoal leading-[1.02] text-3xl sm:text-4xl mb-3">Termos de Uso</h1>
        <p className="font-body text-ink-soft text-sm mb-10">Última atualização: agosto de 2026</p>

        <div className="space-y-8 font-body text-[15px] leading-relaxed text-ink">
          <section>
            <h2 className="font-head font-extrabold text-charcoal text-xl mb-2">Sobre o serviço</h2>
            <p>
              A Rainha do Entulho aluga container de 5m³ pra coleta de entulho e resíduos de obra em
              Uruaçu-GO, dentro do perímetro urbano. Trabalhamos com locação semanal (R$220) e mensal
              (R$750) — não trabalhamos com diária avulsa.
            </p>
          </section>

          <section>
            <h2 className="font-head font-extrabold text-charcoal text-xl mb-2">Entrega e retirada</h2>
            <p>
              A entrega e a retirada do container são combinadas por WhatsApp, conforme disponibilidade.
              O cliente é responsável por garantir acesso ao local combinado na data marcada.
            </p>
          </section>

          <section>
            <h2 className="font-head font-extrabold text-charcoal text-xl mb-2">O que pode ir no container</h2>
            <p>
              O container é destinado a entulho e resíduos de obra/reforma não perigosos. Materiais
              perigosos, químicos ou proibidos por lei não devem ser descartados no container — combine
              com a gente antes se tiver dúvida.
            </p>
          </section>

          <section>
            <h2 className="font-head font-extrabold text-charcoal text-xl mb-2">Pagamento</h2>
            <p>
              O valor da locação é combinado no momento do pedido, conforme a modalidade escolhida
              (semanal ou mensal). Formas de pagamento são combinadas diretamente com a equipe da Rainha do Entulho.
            </p>
          </section>

          <section>
            <h2 className="font-head font-extrabold text-charcoal text-xl mb-2">Fale com a gente</h2>
            <p>
              Dúvida sobre os termos? Chama direto no WhatsApp{' '}
              <a href="https://wa.me/5562982322955" target="_blank" rel="noopener noreferrer" className="font-semibold text-red hover:text-red-dark underline underline-offset-2">
                (62) 98232-2955
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
