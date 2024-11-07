import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

const Animate = ({children}: {children: ReactNode}) => {
  const item = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    show: {
      opacity: 1,
      y: [15, 0],
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div variants={item}>
      {children}
    </motion.div>
  )
}

export default Animate