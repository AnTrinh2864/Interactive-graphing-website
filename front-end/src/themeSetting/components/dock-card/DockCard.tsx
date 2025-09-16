import * as React from 'react'
import { animated, useIsomorphicLayoutEffect, useSpringValue } from '@react-spring/web'

import { useMousePosition } from '../hooks/useMousePosition'
import { useWindowResize } from '../hooks/useWindowResize'
import { useDock } from '../dock/DockContext'

import styles from './style.module.scss'

interface DockCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const INITIAL_WIDTH = 48

export const DockCard: React.FC<DockCardProps> = ({ children, onClick, isActive }) => {
  const cardRef = React.useRef<HTMLButtonElement>(null!)

  // track the element’s center X
  const [elCenterX, setElCenterX] = React.useState<number>(0)

  // spring values
  const size = useSpringValue(INITIAL_WIDTH, {
    config: { mass: 0.1, tension: 320 },
  })

  const opacity = useSpringValue(0)
  const y = useSpringValue(0, {
    config: { friction: 29, tension: 238 },
  })

  const dock = useDock()

  // resize effect to compute center position
  useWindowResize(() => {
    const { x } = cardRef.current.getBoundingClientRect()
    setElCenterX(x + INITIAL_WIDTH / 2)
  })

  // expand when hovered + mouse moves
  useMousePosition(
    {
      onChange: ({ value }) => {
        const mouseX = value.x
        if (dock.width > 0) {
          const transformedValue =
            INITIAL_WIDTH + 36 * Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) ** 12
          if (dock.hovered) {
            size.start(transformedValue)
          }
        }
      },
    },
    [elCenterX, dock]
  )

  // reset size when not hovered
  useIsomorphicLayoutEffect(() => {
    if (!dock.hovered) {
      size.start(INITIAL_WIDTH)
    }
  }, [dock.hovered])

  // animation state
  const timesLooped = React.useRef(0)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const isAnimating = React.useRef(false)

  // bounce animation handler
  const runBounceAnimation = () => {
    if (!isAnimating.current) {
      isAnimating.current = true
      opacity.start(0.5)
      timesLooped.current = 0

      y.start(-INITIAL_WIDTH / 2, {
        loop: () => {
          if (3 === timesLooped.current++) {
            timeoutRef.current = setTimeout(() => {
              opacity.start(0)
              y.set(0)
              isAnimating.current = false
              timeoutRef.current = undefined
            }, 2000)
            y.stop()
          }
          return { reverse: true }
        },
      })
    } else {
      // premature exit
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      opacity.start(0)
      y.start(0)
      isAnimating.current = false
    }
  }

  // cleanup
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // combined click
  const handleClick = () => {
    runBounceAnimation()
    onClick?.() // call parent handler if provided
  }

 return (
    <div className={styles["dock-card-container"]}>
      <animated.button
        ref={cardRef}
        className={`${styles["dock-card"]} ${isActive ? styles.active : ""}`}
        onClick={() => {
          handleClick();
          onClick?.();
        }}
        style={{
          width: size,
          height: size,
          y,
        }}
      >
        {children}
      </animated.button>
      <animated.div className={styles["dock-dot"]} style={{ opacity }} />
    </div>
  );
}
