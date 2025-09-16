import * as React from 'react'

import styles from './style.module.scss'

interface CardProps {
  src: string
}

export const Card = ({ src }: CardProps) => (
  <span className={styles.card}>
    <img className={styles.card__blur} src={src} alt="" />
    <img className={styles.card__img} src={src} alt="" />
  </span>
)
