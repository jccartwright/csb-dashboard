import './FiscalYearCountsPanel.css'


export default function FiscalYearCountsPanel({query}) {
  const data = query.data
  const fy_counts = [...data.fy_counts]
  // augment with growth percentages
  let runningTotal = parseInt(fy_counts[0].count)
  fy_counts.forEach((e, idx) => {
    if (idx) {
      const prevCount = parseInt(fy_counts[idx-1].count)
      const count = parseInt(e.count)
      runningTotal = runningTotal + count
      // const pct = Math.round(((count - prevCount) / prevCount ) * 100)
      const pct = Math.round((count / runningTotal ) * 100)
      e.pct = `${pct}%`
      e.archiveSize = runningTotal
      
    } else {
      e.pct = ''
      e.archiveSize = runningTotal
    }
  })
  

  return(
    // <div className={`FiscalYearCountsPanel ${visible ? "hide-panel": ""}`}>
    <div style={{"color":"whitesmoke"}}>
      <div style={{"fontSize":"larger", "padding":"10px"}}>Counts by Fiscal Year</div>
      { data ?
        <>
        <table style={{"border":"1px solid white", "borderCollapse": "collapse"}}>
          <thead>
            <tr>
              <th style={{"border":"1px solid white", "padding": "5px"}}>Year</th>
              <th style={{"border":"1px solid white", "padding": "5px"}}>Soundings</th>
              <th style={{"border":"1px solid white", "padding": "5px"}}>Growth</th>
              <th style={{"border":"1px solid white", "padding": "5px"}}>Total<br/>Archive</th>
            </tr>
          </thead>
          <tbody>
            {
              data.fy_counts.map( e => {
                return (
                  <tr key={e.label}>
                    <td style={{"border":"1px solid white", "padding": "5px"}}>{e.label}</td>
                    <td style={{"border":"1px solid white"}}>{parseInt(e.count).toLocaleString("en-US")}</td>
                    <td style={{"border":"1px solid white"}}>{e.pct}</td>
                    <td style={{"border":"1px solid white"}}>{e.archiveSize.toLocaleString("en-US")}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </>
        : ''
      }
      { query.isLoading ? <h3>loading data...</h3> : '' }
      { query.isError ? <p>Error: {query.error.message}</p> : '' }
    </div>
  )
}
