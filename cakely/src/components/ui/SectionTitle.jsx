export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-xl mb-8 md:mb-10">
      {eyebrow && (
        <p className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-2">
          {eyebrow}
        </p>
      )}

      {/* <h2 className="text-[1.8rem] sm:text-[2rem] md:text-[2.8rem] font-heading text-slate-900 mb-3 leading-[1.05]"> */}
        <h2 className="font-heading text-[1.5rem] sm:text-[1.75rem] md:text-[2.1rem] lg:text-[2.4rem] xl:text-[2.6rem] leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-600 text-base sm:text-md md:text-md leading-8 sm:leading-7">

          {subtitle}
        </p>
      )}
    </div>
  )
}