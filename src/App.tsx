import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MapPanel from './MapPanel'
import MetricsPanel from './MetricsPanel'
import SidePanel from './SidePanel'
import ProvidersPanel from './ProvidersPanel'
import ArchiveGrowthChart from './ArchiveGrowthChart'
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

const barChartData = [{"year":2017,"provider":"Orange Force Marine","total":0,"percentage_of_archive":0},{"year":2017,"provider":"MacGregor","total":0,"percentage_of_archive":0},{"year":2017,"provider":"PGS","total":0,"percentage_of_archive":0},{"year":2017,"provider":"AquaMap","total":0,"percentage_of_archive":0},{"year":2017,"provider":"Rosepoint","total":55939906,"percentage_of_archive":100},{"year":2017,"provider":"M2Ocean","total":0,"percentage_of_archive":0},{"year":2017,"provider":"GLOS","total":0,"percentage_of_archive":0},{"year":2017,"provider":"Anonymous","total":0,"percentage_of_archive":0},{"year":2017,"provider":"FarSounder","total":0,"percentage_of_archive":0},{"year":2017,"provider":"Navico C-MAP","total":0,"percentage_of_archive":0},{"year":2018,"provider":"Orange Force Marine","total":0,"percentage_of_archive":0},{"year":2018,"provider":"MacGregor","total":0,"percentage_of_archive":0},{"year":2018,"provider":"PGS","total":0,"percentage_of_archive":0},{"year":2018,"provider":"AquaMap","total":0,"percentage_of_archive":0},{"year":2018,"provider":"Rosepoint","total":86531977,"percentage_of_archive":100},{"year":2018,"provider":"M2Ocean","total":0,"percentage_of_archive":0},{"year":2018,"provider":"GLOS","total":0,"percentage_of_archive":0},{"year":2018,"provider":"Anonymous","total":0,"percentage_of_archive":0},{"year":2018,"provider":"FarSounder","total":0,"percentage_of_archive":0},{"year":2018,"provider":"Navico C-MAP","total":0,"percentage_of_archive":0},{"year":2019,"provider":"Orange Force Marine","total":0,"percentage_of_archive":0},{"year":2019,"provider":"MacGregor","total":0,"percentage_of_archive":0},{"year":2019,"provider":"PGS","total":0,"percentage_of_archive":0},{"year":2019,"provider":"AquaMap","total":0,"percentage_of_archive":0},{"year":2019,"provider":"Rosepoint","total":177686727,"percentage_of_archive":99},{"year":2019,"provider":"M2Ocean","total":0,"percentage_of_archive":0},{"year":2019,"provider":"GLOS","total":0,"percentage_of_archive":0},{"year":2019,"provider":"Anonymous","total":0,"percentage_of_archive":0},{"year":2019,"provider":"FarSounder","total":1394295,"percentage_of_archive":1},{"year":2019,"provider":"Navico C-MAP","total":0,"percentage_of_archive":0},{"year":2020,"provider":"Orange Force Marine","total":0,"percentage_of_archive":0},{"year":2020,"provider":"MacGregor","total":55344300,"percentage_of_archive":13},{"year":2020,"provider":"PGS","total":1110,"percentage_of_archive":0},{"year":2020,"provider":"AquaMap","total":0,"percentage_of_archive":0},{"year":2020,"provider":"Rosepoint","total":382146535,"percentage_of_archive":87},{"year":2020,"provider":"M2Ocean","total":0,"percentage_of_archive":0},{"year":2020,"provider":"GLOS","total":0,"percentage_of_archive":0},{"year":2020,"provider":"Anonymous","total":0,"percentage_of_archive":0},{"year":2020,"provider":"FarSounder","total":1406185,"percentage_of_archive":0},{"year":2020,"provider":"Navico C-MAP","total":0,"percentage_of_archive":0},{"year":2021,"provider":"Orange Force Marine","total":0,"percentage_of_archive":0},{"year":2021,"provider":"MacGregor","total":55344300,"percentage_of_archive":8},{"year":2021,"provider":"PGS","total":15766744,"percentage_of_archive":2},{"year":2021,"provider":"AquaMap","total":0,"percentage_of_archive":0},{"year":2021,"provider":"Rosepoint","total":663248321,"percentage_of_archive":90},{"year":2021,"provider":"M2Ocean","total":0,"percentage_of_archive":0},{"year":2021,"provider":"GLOS","total":0,"percentage_of_archive":0},{"year":2021,"provider":"Anonymous","total":0,"percentage_of_archive":0},{"year":2021,"provider":"FarSounder","total":1406185,"percentage_of_archive":0},{"year":2021,"provider":"Navico C-MAP","total":13983,"percentage_of_archive":0},{"year":2022,"provider":"Orange Force Marine","total":0,"percentage_of_archive":0},{"year":2022,"provider":"MacGregor","total":55344300,"percentage_of_archive":6},{"year":2022,"provider":"PGS","total":26540825,"percentage_of_archive":3},{"year":2022,"provider":"AquaMap","total":0,"percentage_of_archive":0},{"year":2022,"provider":"Rosepoint","total":769057454,"percentage_of_archive":89},{"year":2022,"provider":"M2Ocean","total":128995,"percentage_of_archive":0},{"year":2022,"provider":"GLOS","total":8355428,"percentage_of_archive":1},{"year":2022,"provider":"Anonymous","total":0,"percentage_of_archive":0},{"year":2022,"provider":"FarSounder","total":1406185,"percentage_of_archive":0},{"year":2022,"provider":"Navico C-MAP","total":13983,"percentage_of_archive":0},{"year":2023,"provider":"Orange Force Marine","total":303896,"percentage_of_archive":0},{"year":2023,"provider":"MacGregor","total":55344300,"percentage_of_archive":6},{"year":2023,"provider":"PGS","total":27505628,"percentage_of_archive":3},{"year":2023,"provider":"AquaMap","total":1729769,"percentage_of_archive":0},{"year":2023,"provider":"Rosepoint","total":801260710,"percentage_of_archive":89},{"year":2023,"provider":"M2Ocean","total":128995,"percentage_of_archive":0},{"year":2023,"provider":"GLOS","total":8946692,"percentage_of_archive":1},{"year":2023,"provider":"Anonymous","total":146633,"percentage_of_archive":0},{"year":2023,"provider":"FarSounder","total":2778223,"percentage_of_archive":0},{"year":2023,"provider":"Navico C-MAP","total":13983,"percentage_of_archive":0}]
function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [summaryData, setSummaryData] = useState<SummaryDataType>();

  const csbStatisticsQuery = useQuery(['csbStatistics'], () => fetchCsbStatistics() )
  const h3CountsQuery = useQuery(['h3Counts'], () => fetchH3Counts() )

  /*
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
  */

  return (
    <div className="App">
      <HeaderPanel></HeaderPanel>
      <SidePanel>
        <MetricsPanel query={csbStatisticsQuery} />
        <hr/>
        <ProvidersPanel query={csbStatisticsQuery} />
        <hr/>
        <ArchiveGrowthChart data={barChartData} />
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
      <header><h2>HEADER</h2></header>
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
      <footer><h2>FOOTER</h2></footer>
    </div>
  )
}