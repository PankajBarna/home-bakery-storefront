import SectionTitle from '../components/ui/SectionTitle'
import { Star, ExternalLink } from 'lucide-react'

function ReviewAvatar({ name }) {
  const firstLetter = name?.trim()?.charAt(0)?.toUpperCase() || 'C'

  return (
    <div className="h-14 w-14 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl border border-brand-200 shrink-0">
      {firstLetter}
    </div>
  )
}

function ReviewStars({ rating = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={18}
          className={index < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
        />
      ))}
    </div>
  )
}

export default function ReviewsSection({ reviews }) {
  return (
    <section id="reviews" className="py-16 md:py-20 bg-gradient-to-b from-brand-50 to-white">
      <div className="section-wrap">
        <SectionTitle
          eyebrow="Happy Customers"
          title="Loved across Palava"
          subtitle="Real feedback from cake lovers and repeat customers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-white rounded-[1rem] border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.05)] p-6"
            >
              <div className="flex items-start gap-4">
                <ReviewAvatar name={review.name} />

                <div className="min-w-0">
                  <h3 className="text-[1.2rem] font-semibold text-slate-900 leading-none">
                    {review.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 leading-none">
                    {/* {review.subtitle || review.location} */}
                    {review.location}

                  </p>
                </div>
              </div>

              <blockquote className="mt-6 text-slate-600 text-[1.02rem] leading-8 italic">
                “{review.text}”
              </blockquote>

              <div className="mt-6 flex items-center justify-between">
                <ReviewStars rating={review.rating || 5} />

                <div className="text-xs font-medium text-slate-400">
                  Verified
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}