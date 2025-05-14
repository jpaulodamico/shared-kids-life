
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-muted/50 p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto bg-background rounded-lg shadow-sm p-6 md:p-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/auth">
              <ArrowLeft className="mr-2" size={16} />
              Voltar
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Política de Privacidade</h1>
        </div>

        <div className="prose prose-sm md:prose-base max-w-none">
          <p className="text-muted-foreground mb-4">
            Última atualização: 14 de Maio de 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introdução</h2>
            <p>
              Bem-vindo à Política de Privacidade do CoParent. Esta política descreve como coletamos, usamos e compartilhamos suas informações pessoais quando você usa nosso aplicativo de co-parentalidade.
            </p>
            <p>
              Por favor, leia esta política cuidadosamente para entender nossas práticas em relação aos seus dados e como os trataremos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Informações que Coletamos</h2>
            <p>
              Para fornecer nossos serviços, coletamos os seguintes tipos de informações:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Informações da conta:</strong> Quando você se registra, coletamos seu nome, endereço de e-mail e informações de autenticação.
              </li>
              <li>
                <strong>Informações de perfil:</strong> Informações que você fornece sobre você e seus filhos para melhorar a experiência de co-parentalidade.
              </li>
              <li>
                <strong>Informações de comunicação:</strong> Mensagens, documentos compartilhados e outras comunicações entre co-pais.
              </li>
              <li>
                <strong>Informações de uso:</strong> Dados sobre como você interage com nosso aplicativo e serviços.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Como Usamos suas Informações</h2>
            <p>
              Utilizamos suas informações para os seguintes fins:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer, manter e melhorar nossos serviços de co-parentalidade.</li>
              <li>Facilitar a comunicação entre co-pais e gerenciar calendários compartilhados.</li>
              <li>Administrar despesas compartilhadas e registros de documentos.</li>
              <li>Enviar notificações importantes relacionadas à sua conta e ao bem-estar das crianças.</li>
              <li>Proteger a segurança e integridade de nossos serviços.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Compartilhamento de Informações</h2>
            <p>
              Compartilhamos suas informações apenas nas seguintes circunstâncias:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Com co-pais:</strong> Informações que você escolhe compartilhar explicitamente com o co-pai através do aplicativo.
              </li>
              <li>
                <strong>Fornecedores de serviços:</strong> Empresas que nos ajudam a fornecer nossos serviços (armazenamento, processamento de pagamentos, etc.).
              </li>
              <li>
                <strong>Cumprimento legal:</strong> Quando necessário para cumprir obrigações legais ou ordens judiciais.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança para proteger suas informações pessoais contra acesso, alteração ou divulgação não autorizados. Essas medidas incluem criptografia, controle de acesso e auditorias regulares de segurança.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Seus Direitos</h2>
            <p>
              Você tem vários direitos em relação aos seus dados pessoais, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Direito de acessar seus dados pessoais.</li>
              <li>Direito de corrigir dados imprecisos.</li>
              <li>Direito de excluir seus dados (sujeito a obrigações legais).</li>
              <li>Direito de ser informado sobre como seus dados são processados.</li>
              <li>Direito de limitar o processamento dos seus dados.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pessoais pelo tempo necessário para fornecer nossos serviços ou conforme exigido por lei. Quando não tivermos mais uma finalidade legítima para processar suas informações pessoais, excluiremos ou anonimizaremos os dados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Se fizermos alterações significativas, notificaremos você por e-mail ou através de uma notificação em nosso aplicativo. Recomendamos que você revise esta política regularmente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Contato</h2>
            <p>
              Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre nossas práticas de dados, entre em contato conosco em:
            </p>
            <p className="mt-2">
              <strong>E-mail:</strong> privacy@coparent.app<br />
              <strong>Endereço:</strong> Av. Paulista, 1000, São Paulo - SP, 01310-100, Brasil
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
