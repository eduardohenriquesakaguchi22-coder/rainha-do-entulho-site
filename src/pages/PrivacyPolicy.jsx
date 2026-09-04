import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
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

        <h1 className="font-display uppercase text-charcoal leading-[1.02] text-3xl sm:text-4xl mb-3">Política de Privacidade</h1>
        <p className="font-body text-ink-soft text-sm mb-10">Última atualização: agosto de 2026</p>

        <div className="space-y-8 font-body text-[15px] leading-relaxed text-ink">
          <section>
            <h2 className="font-head font-extrabold text-charcoal text-xl mb-2">O que a gente coleta</h2>
            <p>
              Quando você preenche o formulário de contato ou chama a gente no WhatsApp, coletamos nome,
              telefone/WhatsApp, e-mail (se você informar), endereço ou bairro, e a mensagem ou fotos que
              você enviar sobre o serviço que precisa.
            </p>
          </section>

          <section>
            <h2 className="font-head font-extrabold text-charcoal text-xl mb-2">Pra que usamos</h2>
            <p>
              Usamos esses dados só pra combinar a entrega e a retirada do seu container — data, endereço,
              modalidade (semanal ou mensal) e valor. Não vendemos nem compartilhamos seus dados com
              terceiros pra fins de marketing.
            </p>
          </section>

          <section>
            <h2 className="font-head font-extrabold text-charcoal text-xl mb-2">Como guardamos</h2>
            <p>
              Suas informações ficam guardadas só o tempo necessário pra atender você e cumprir obrigações
              legais (como emissão de nota, se aplicável). Você pode pedir a exclusão dos seus dados a
              qualquer momento chamando no WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="font-head font-extrabold text-charcoal text-xl mb-2">Fale com a gente</h2>
            <p>
              Dúvida sobre seus dados? Chama direto no WhatsApp{' '}
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
