import Button from '../components/ui/Button'
import { scrollToId } from '../utils/helpers'

export default function HeroSection({ hero }) {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-[78vh] sm:min-h-[88vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(34,20,25,0.52), rgba(34,20,25,0.52)), url('${hero.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      <div className="section-wrap py-14 sm:py-20 text-white w-full">
        <div className="max-w-xl">
          <p className="uppercase tracking-[0.18em] text-[0.95rem] sm:text-sm mb-4 text-rose-100 leading-relaxed">
            Homemade • Palava Phase 2
          </p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[0.95] mb-4">
            {hero.brandName}
          </h1>

          <p className="text-2xl sm:text-xl md:text-2xl font-semibold mb-4 leading-snug">
            {hero.tagline}
          </p>

          <p className="text-lg sm:text-base md:text-lg text-rose-50/95 leading-8 sm:leading-7 max-w-lg">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-4 max-w-md">
            <Button
              className="w-full sm:w-auto justify-center"
              onClick={() => window.open(`https://wa.me/91${hero.whatsapp}`, '_blank')}
            >
              Order on WhatsApp
            </Button>

            <Button
              variant="secondary"
              className="w-full sm:w-auto justify-center"
              onClick={() => scrollToId('menu')}
            >
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}