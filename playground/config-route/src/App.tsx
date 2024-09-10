import { type PropsWithChildren } from 'react'
import { ConfigurableRouter } from 'react-configurable-router'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { routes } from './routes'
import './App.css'

const RouteAnimation = ({ children }: PropsWithChildren) => {
  const location = useLocation()

  return (
    <AnimatePresence mode={'wait'} initial={false}>
      <motion.div
        key={location.pathname}
        initial={{
          translateX: 10,
          opacity: 0,
        }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: -10, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ConfigurableRouter
        routes={routes}
        render={(children) => <RouteAnimation>{children}</RouteAnimation>}
      ></ConfigurableRouter>
    </BrowserRouter>
  )
}

export default App
