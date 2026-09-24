import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './MorphingCard.css'

export interface DockedAvatarProps {
  /** Must match the layoutId used on the <MorphingCard> it hands off from. */
  layoutId: string
  avatar: ReactNode
  visible: boolean
  size?: number
  className?: string
}

/**
 * Where the avatar "lands" after a <MorphingCard> closes. Mount this wherever
 * the settled avatar should live in the page (e.g. beside a heading further
 * down); Framer Motion animates the handoff automatically via the shared layoutId.
 */
export function DockedAvatar({ layoutId, avatar, visible, size = 96, className }: DockedAvatarProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          layoutId={layoutId}
          className={['docked-avatar', className].filter(Boolean).join(' ')}
          style={{ width: size, height: size, borderRadius: size }}
        >
          <div className="morph-card__layer">{avatar}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
