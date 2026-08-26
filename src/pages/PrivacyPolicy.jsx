import { Link } from 'react-router-dom'
import { ArrowLeft, Truck } from 'lucide-react'

export default function PrivacyPolicy() {
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

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-3">Política de Privacidade</h1>
        <p className="text-muted text-sm mb-10">Última atualização: agosto de 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-ink/90">
          <section>
            <h2 className="font-display font-bold text-xl mb-2">O que a gente coleta</h2>
            <p>
              Quando você preenche o formulário de contato ou chama a gente no WhatsApp, coletamos nome,
              telefone/WhatsApp, e-mail (se você informar), endereço ou bairro, e a mensagem ou fotos que
              você enviar sobre o serviço que precisa.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">Pra que usamos</h2>
            <p>
              Usamos esses dados só pra combinar a entrega e a retirada do seu container — data, endereço,
              modalidade (semanal ou mensal) e valor. Não vendemos nem compartilhamos seus dados com
              terceiros pra fins de marketing.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">Como guardamos</h2>
            <p>
              Suas informações ficam guardadas só o tempo necessário pra atender você e cumprir obrigações
              legais (como emissão de nota, se aplicável). Você pode pedir a exclusão dos seus dados a
              qualquer momento chamando no WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">Fale com a gente</h2>
            <p>
              Dúvida sobre seus dados? Chama direto no WhatsApp (62) 98232-2955.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
