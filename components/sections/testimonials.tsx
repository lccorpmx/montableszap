import { SectionHeading } from "@/components/section-heading"
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel"
import { testimonials } from "@/lib/content"

export function Testimonials() {
  return (
    <section aria-labelledby="testimonios-title" className="border-t border-white/5 py-16 sm:py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          id="testimonios-title"
          title="Lo que dicen nuestros clientes"
          description="Entregas reales, clientes reales"
        />
        <TestimonialsCarousel items={testimonials} className="mt-10" />
      </div>
    </section>
  )
}
