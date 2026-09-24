import { useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import './MorphingCard.css'

export interface MorphingCardProps {
  /** Shared id used to hand this element off to a <DockedAvatar> with the same id. */
  layoutId: string
  /** Content shown while collapsed (the "avatar" state). */
  avatar: ReactNode
  /** Content shown while open (the "expanded" state). */
  expanded: ReactNode
  /** Diameter of the collapsed avatar, in px. */
  avatarSize?: number
  /** Size of the fully expanded card, in px. */
  expandedWidth?: number
  expandedHeight?: number
  /** How much scroll distance (in viewport heights) the whole open/close cycle consumes. */
  scrollHeight?: number
  /** Fires whenever the card finishes settling back into its avatar shape (both directions). */
  onSettleChange?: (settled: boolean) => void
  className?: string
}

/**
 * A scroll-driven morphing card: it rests as a small circular avatar, opens into
 * a large expanded card as the user scrolls into its section, holds, then closes
 * back down to the avatar shape as they keep scrolling — Framer Motion's
 * `layoutId` is what a matching <DockedAvatar> later reads to pick up the shape.
 */
export function MorphingCard({
  layoutId,
  avatar,
  expanded,
  avatarSize = 96,
  expandedWidth = 360,
  expandedHeight = 640,
  scrollHeight = 320,
  onSettleChange,
  className,
}: MorphingCardProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [settled, setSettled] = useState(false)

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  // Phase breakpoints across the 0 -> 1 scroll range of the stage.
  const sizeStops = [0, 0.14, 0.42, 0.62, 0.9, 1]

  const width = useTransform(
    scrollYProgress,
    sizeStops,
    [avatarSize, avatarSize, expandedWidth, expandedWidth, avatarSize, avatarSize],
  )
  const height = useTransform(
    scrollYProgress,
    sizeStops,
    [avatarSize, avatarSize, expandedHeight, expandedHeight, avatarSize, avatarSize],
  )
  const radius = useTransform(
    scrollYProgress,
    sizeStops,
    [avatarSize, avatarSize, 32, 32, avatarSize, avatarSize],
  )

  const contentStops = [0, 0.14, 0.24, 0.78, 0.9, 1]
  const avatarOpacity = useTransform(scrollYProgress, contentStops, [1, 1, 0, 0, 1, 1])
  const expandedOpacity = useTransform(scrollYProgress, contentStops, [0, 0, 1, 1, 0, 0])

  const borderRadius = useMotionTemplate`${radius}px`

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.985 && !settled) {
      setSettled(true)
      onSettleChange?.(true)
    } else if (v < 0.97 && settled) {
      setSettled(false)
      onSettleChange?.(false)
    }
  })

  return (
    <div ref={stageRef} className={['morph-stage', className].filter(Boolean).join(' ')} style={{ height: `${scrollHeight}vh` }}>
      <div className="morph-stage__sticky">
        {!settled && (
          <motion.div className="morph-card" layoutId={layoutId} style={{ width, height, borderRadius }}>
            <motion.div className="morph-card__layer" style={{ opacity: avatarOpacity }}>
              {avatar}
            </motion.div>
            <motion.div className="morph-card__layer" style={{ opacity: expandedOpacity }}>
              {expanded}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
