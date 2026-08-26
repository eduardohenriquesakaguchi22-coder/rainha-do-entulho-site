import { Link } from 'react-router-dom'
import { ArrowLeft, Truck } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-ink transition mb-10">
          <ArrowLeft className="h-4 w-4" />
          Voltar pro site
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Truck className="h-5 w-5 text-deep" strokeWidth={2.4} />
          </span>
          <span className="font-display font-bold text-lg">Rainha do Entulho</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-3">Termos de Uso</h1>
        <p className="text-muted text-sm mb-10">Última atualização: agosto de 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-ink/90">
          <section>
            <h2 className="font-display font-bold text-xl mb-2">Sobre o serviço</h2>
            <p>
              A Rainha do Entulho aluga container de 5m³ pra coleta de entulho e resíduos de obra em
              Uruaçu-GO, dentro do perímetro urbano. Trabalhamos com locação semanal (R$220) e mensal
              (R$750) — não trabalhamos com diária avulsa.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">Entrega e retirada</h2>
            <p>
              A entrega e a retirada do container são combinadas por WhatsApp, conforme disponibilidade.
              O cliente é responsável por garantir acesso ao local combinado na data marcada.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">O que pode ir no container</h2>
            <p>
              O container é destinado a entulho e resíduos de obra/reforma não perigosos. Materiais
              perigosos, químicos ou proibidos por lei não devem ser descartados no container — combine
              com a gente antes se tiver dúvida.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">Pagamento</h2>
            <p>
              O valor da locação é combinado no momento do pedido, conforme a modalidade escolhida
              (semanal ou mensal). Formas de pagamento são combinadas diretamente com o Antônio.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">Fale com a gente</h2>
            <p>Dúvida sobre os termos? Chama direto no WhatsApp (62) 98232-2955.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
