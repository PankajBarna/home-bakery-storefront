export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-xl mb-8 md:mb-10">
      {eyebrow && (
        <p className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">
          {eyebrow}
        </p>
      )}

      <h2 className="text-[2.4rem] sm:text-[2.8rem] md:text-[3.25rem] font-heading text-slate-900 mb-3 leading-[1.05]">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-600 text-lg sm:text-base md:text-lg leading-8 sm:leading-7">
          {subtitle}
        </p>
      )}
    </div>
  )
}