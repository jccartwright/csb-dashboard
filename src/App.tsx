import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <HeaderPanel></HeaderPanel>
      <SidePanel></SidePanel>
      <MapPanel></MapPanel>
      <LineGraphPanel></LineGraphPanel>
      <FooterPanel></FooterPanel>
    </div>
  )
}

export default App

function HeaderPanel() {
  const baseClass = 'HeaderPanel'
  
  return (
    <div className={baseClass}>
      <header><h2>HEADER</h2></header>
    </div>
  )
}

function SidePanel() {
  const baseClass = 'SidePanel'

  return (
    <div className={baseClass}>
      <h2>SIDEPANEL</h2>
    </div>
  )
}

function MapPanel() {
  const baseClass = 'MapPanel'
  
  return (
    <div className={baseClass}>
      <h2>MAPPANEL</h2>
    </div>
  )
}

function LineGraphPanel() {
  const baseClass = 'LineGraphPanel'

  return (
    <div className={baseClass}>
      <h2>LINEGRAPHPANEL</h2>
    </div>
  )
}

function FooterPanel() {
  const baseClass = 'FooterPanel'

  return (
    <div className={baseClass}>
      <footer><h2>FOOTER</h2></footer>
    </div>
  )
}