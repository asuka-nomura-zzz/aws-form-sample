'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1},
}

export default function Template({ children }: { children: ReactNode}) {
  return (
    <motion.div
      className="site-wrapper"
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{
        type: "lienar",
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  )

}