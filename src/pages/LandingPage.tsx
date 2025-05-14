
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Heart, 
  Calendar, 
  MessageCircle, 
  BookOpen,
  Shield, 
  Users, 
  Handshake,
  Star
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-2">
              C<span className="text-accent">P</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">CoParent</h1>
          </div>
          <Link to="/auth">
            <Button variant="outline" className="hidden sm:inline-flex">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Simplifique a <span className="text-primary">coparentalidade</span> e foque no que mais importa
              </h1>
              <p className="text-xl text-gray-600">
                Gerencie em conjunto a vida dos seus filhos com tranquilidade, transparência e organização, mesmo à distância.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/auth">
                  <Button size="lg" className="w-full sm:w-auto">
                    Começar agora
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Saber mais
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <AspectRatio ratio={16 / 10} className="overflow-hidden rounded-2xl shadow-xl bg-white">
                <img
                  src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e41?auto=format&fit=crop&q=80"
                  alt="Coparentalidade feliz"
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher o CoParent?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Criamos a solução completa que pais e mães separados precisam para uma gestão compartilhada harmoniosa da vida de seus filhos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="text-primary" />}
              title="Calendário Compartilhado"
              description="Organize compromissos, visitas e atividades em um calendário sincronizado para ambos os responsáveis."
            />
            <FeatureCard
              icon={<Users className="text-primary" />}
              title="Perfis das Crianças"
              description="Mantenha informações importantes como documentos médicos, atividades escolares e preferências dos seus filhos."
            />
            <FeatureCard
              icon={<MessageCircle className="text-primary" />}
              title="Comunicação Focada"
              description="Troque mensagens de forma organizada e relacionada aos assuntos dos seus filhos."
            />
            <FeatureCard
              icon={<BookOpen className="text-primary" />}
              title="Documentos Importantes"
              description="Armazene e compartilhe documentos escolares, médicos e legais em um local seguro."
            />
            <FeatureCard
              icon={<Heart className="text-accent" />}
              title="Despesas Compartilhadas"
              description="Gerencie e divida as despesas dos filhos com transparência e sem conflitos."
            />
            <FeatureCard
              icon={<Shield className="text-accent" />}
              title="Segurança e Privacidade"
              description="Seus dados estão protegidos e acessíveis apenas para os responsáveis autorizados."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">O que nossos usuários dizem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Famílias reais que transformaram a coparentalidade com nossa plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="O CoParent transformou nossa comunicação. Agora conseguimos focar no bem-estar do nosso filho sem os conflitos de antes."
              author="Ana C."
              role="Mãe de 2 filhos"
            />
            <TestimonialCard
              quote="Como pai que mora em outra cidade, o CoParent me permite participar ativamente da vida escolar e médica dos meus filhos."
              author="Ricardo M."
              role="Pai de 1 filho"
            />
            <TestimonialCard
              quote="As funções de agenda e despesas compartilhadas reduziram 90% dos nossos desentendimentos sobre a criação dos nossos filhos."
              author="Juliana e Pedro"
              role="Pais de 3 filhos"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Comece a simplificar sua coparentalidade hoje</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Crie sua conta gratuita agora e experimente uma nova forma de compartilhar a criação dos seus filhos.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-primary">
              Criar conta gratuita
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-2">
                  C<span className="text-accent">P</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">CoParent</h3>
              </div>
              <p className="text-gray-600">
                Facilitando a gestão compartilhada da vida das crianças desde 2023.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Calendário</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Despesas</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Documentos</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Mensagens</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Sobre nós</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Blog</a></li>
                <li><Link to="/privacy-policy" className="text-gray-600 hover:text-primary">Privacidade</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Termos de uso</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contato</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Suporte</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Ajuda</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Feedback</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>© 2025 CoParent. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const TestimonialCard = ({ quote, author, role }: { 
  quote: string; 
  author: string; 
  role: string 
}) => {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex mb-4">
          <Star className="text-accent fill-accent w-5 h-5" />
          <Star className="text-accent fill-accent w-5 h-5" />
          <Star className="text-accent fill-accent w-5 h-5" />
          <Star className="text-accent fill-accent w-5 h-5" />
          <Star className="text-accent fill-accent w-5 h-5" />
        </div>
        <p className="text-gray-600 italic flex-grow">{quote}</p>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="font-bold text-gray-900">{author}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
