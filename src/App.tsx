import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MapPanel from './MapPanel'
import { useState, useEffect } from 'react'
import './App.css'
import { HexbinDataType, SummaryDataType } from './types'



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryDataType>();

  // one-time setup
  useEffect(() => {
    const abortController = new AbortController();
   
    setIsLoading(true);
    // TODO better handling of errors fetching JSON files
    Promise.all([
     fetch('https://order-pickup.s3.amazonaws.com/csb_statistics.json', { signal: abortController.signal }).then(response => response.json()),
     fetch('https://order-pickup.s3.amazonaws.com/csb_counts_by_h3.json', { signal: abortController.signal }).then(response => response.json())
    ]).then(responses => {
      setSummaryData(Object.assign(responses[0], responses[1]))
    }).finally(() => {
      setIsLoading(false);
    }) 
    // abort any request running at time component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="App">
      <HeaderPanel></HeaderPanel>
      <SidePanel></SidePanel>
      { summaryData ?
        <MapPanel hexbins={summaryData['counts_by_h3']}></MapPanel>
        :
        <h2>data loading...</h2>
      }
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