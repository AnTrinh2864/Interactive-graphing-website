import * as React from 'react'
import { animated, useSpringValue } from '@react-spring/web'
import { clamp } from '@react-spring/shared'

import { useWindowResize } from '../hooks/useWindowResize'

import { DockContext } from './DockContext'

import styles from './style.module.scss'

interface DockProps {
  children: React.ReactNode
}

export const DOCK_ZOOM_LIMIT = [-50, 50]

export const Dock = ({ children }: DockProps) => {
  const [hovered, setHovered] = React.useState(false)
  const [width, setWidth] = React.useState(0)
  const isZooming = false
  const dockRef = React.useRef<HTMLDivElement>(null!)

  const setIsZooming = React.useCallback((value: boolean) => {
    setHovered(isZooming)
  }, [])

  const zoomLevel = useSpringValue(1, {
    onChange: () => {
      setWidth(dockRef.current.clientWidth)
    },
  })

  useWindowResize(() => {
    setWidth(dockRef.current.clientWidth)
  })

  return (
    <DockContext.Provider value={{ hovered, setIsZooming, width, zoomLevel }}>
      <animated.div
        ref={dockRef}
        className={styles.dock}
        onMouseOver={() => {
          if (isZooming) {
            setHovered(true)
          }
        }}
        onMouseOut={() => {
          setHovered(false)
        }}
        style={{
          x: '-50%',
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to(value => clamp(0.5, 2, value)),
        }}>
        {children}
      </animated.div>
    </DockContext.Provider>
  )
}
