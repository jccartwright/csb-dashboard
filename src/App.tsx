import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MapPanel from './MapPanel'
import MetricsPanel from './MetricsPanel'
import SidePanel from './SidePanel'
import ProvidersPanel from './ProvidersPanel'
import ArchiveGrowthChart from './ArchiveGrowthChart'
import FiscalYearCountsPanel from './FiscalYearCountsPanel'
import TogglePanel from './TogglePanel'
import { useState, useEffect, ReactNode } from 'react'
import './App.css'
import { HexbinDataType, SummaryDataType } from './types'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  UseQueryResult
} from '@tanstack/react-query'
// import logo from './IHO_Logo_60px.png'
import logo from './IHO_Logo_85px.png'

const queryClient = new QueryClient()

function fetchCsbStatistics() {
  return fetch('https://order-pickup.s3.amazonaws.com/csb_statistics.json').then( res => res.json() )
}

function fetchH3Counts() {
  return fetch('https://order-pickup.s3.amazonaws.com/csb_counts_by_h3.json').then( res => res.json() )
}

interface Props {
  children: ReactNode
}


function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [summaryData, setSummaryData] = useState<SummaryDataType>();

  const csbStatisticsQuery = useQuery(['csbStatistics'], () => fetchCsbStatistics() )
  const h3CountsQuery = useQuery(['h3Counts'], () => fetchH3Counts() )

  return (
    <div className="App">
      <HeaderPanel></HeaderPanel>
      <SidePanel>
        <MetricsPanel query={csbStatisticsQuery} />
        <hr/>
        <ProvidersPanel query={csbStatisticsQuery} />
        <hr/>
        <TogglePanel query={csbStatisticsQuery} />
      </SidePanel>
      <MapPanel query={h3CountsQuery}></MapPanel>
      {/* <LineGraphPanel query={csbStatisticsQuery}></LineGraphPanel> */}
      <FooterPanel></FooterPanel>
    </div>
  )
}

export default App

// function HeaderPanel({query}: {query:UseQueryResult}) {
function HeaderPanel() {
    const baseClass = 'HeaderPanel'

  return (
    <div className={baseClass}>
       {/* <img src={logo} height='60px' align='left'></img> */}
      <header>
        <h2>Crowdsourced Bathymetry Pointstore Dashboard</h2>
      </header>
    </div>
  )
}


function LineGraphPanel({query}) {
  const baseClass = 'LineGraphPanel'

  return (
    <div className={baseClass}>
      <h2>LINEGRAPHPANEL</h2>
      { query?.isLoading ? <h3>loading data...</h3> : '' }
      { query?.isError ? <p>Error: {query.error.message}</p> : '' }
      {/* { query?.data ? <h3>{query.data['counts_by_h3'].length} hexbins loaded</h3> : '' } */}
    </div>
  )
}




function FooterPanel() {
  const baseClass = 'FooterPanel'

  return (
    <div className={baseClass}>
      <footer></footer>
    </div>
  )
}