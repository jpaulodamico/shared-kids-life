
import React from "react";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "O CoParent transformou nossa comunicação. Agora conseguimos focar no bem-estar do nosso filho sem os conflitos de antes.",
      author: "Ana C.",
      role: "Mãe de 2 filhos"
    },
    {
      quote: "Como pai que mora em outra cidade, o CoParent me permite participar ativamente da vida escolar e médica dos meus filhos.",
      author: "Ricardo M.",
      role: "Pai de 1 filho"
    },
    {
      quote: "As funções de agenda e despesas compartilhadas reduziram 90% dos nossos desentendimentos sobre a criação dos nossos filhos.",
      author: "Juliana e Pedro",
      role: "Pais de 3 filhos"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">O que nossos usuários dizem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Famílias reais que transformaram a coparentalidade com nossa plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
