import './TogglePanel.css'
import ArchiveGrowthChart from './ArchiveGrowthChart'
import FiscalYearCountsPanel from './FiscalYearCountsPanel'
import { useState } from 'react'


export default function TogglePanel({query}) {
  const [visibleComponent, setVisibleComponent] = useState('chart')

  function toggleVisible() {
    if (visibleComponent === 'chart') {
      setVisibleComponent('table')
    } else {
      setVisibleComponent('chart')
    }
  }

  return(
    <div>
      <button onClick={toggleVisible} disabled={visibleComponent === 'chart'? true : false}>Growth Chart</button>
      <button onClick={toggleVisible} disabled={visibleComponent === 'table'? true : false}>Fiscal Year Table</button>
      {visibleComponent === 'chart' ? <ArchiveGrowthChart query={query} /> : null }
      {visibleComponent === 'table' ?<FiscalYearCountsPanel query={query} /> : null }
    </div>
  )
}
