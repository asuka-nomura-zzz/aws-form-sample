import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

const container = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0,
      staggerChildren: 0.1,
    },
  },
}

export const AnimateCardWrapper = ({ 
  className, 
  children 
}: 
{className?: string, 
  children: ReactNode
}) => {

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      className={`${className}`}
    >
      {children}
    </motion.div>
  )
}