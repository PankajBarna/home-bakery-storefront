import { useMemo } from 'react'
import { Heart, Sparkles, Star } from 'lucide-react'

const iconSet = [Star, Heart, Sparkles]

function getRandom(min, max) {
  return Math.random() * (max - min) + min
}

export default function DecorativePattern({ count = 40 }) {
  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const Icon = iconSet[i % iconSet.length]

      return {
        id: i,
        Icon,
        top: `${getRandom(4, 96)}%`,
        left: `${getRandom(2, 98)}%`,
        size: getRandom(22, 32),
        rotate: getRandom(-25, 25),
        opacity: getRandom(0.08, 0.22),
        duration: `${getRandom(4, 8)}s`,
        delay: `${getRandom(0, 4)}s`,
      }
    })
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item) => {
        const { id, Icon, top, left, size, rotate, opacity, duration, delay } = item

        return (
          <Icon
            key={id}
            className="absolute text-pink-300"
            style={{
              top,
              left,
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotate(${rotate}deg)`,
              opacity,
              animation: `floaty ${duration} ease-in-out ${delay} infinite`,
            }}
          />
        )
      })}
    </div>
  )
}