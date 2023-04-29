import './MetricsPanel.css'

export default function MetricsPanel({query}) {
  const baseClass = 'MetricsPanel'
  
  const data = query.data

  return (
    <div className={baseClass}>
      { data ?
        <>
        <p>Report Date: <span className='emphasis'>{data['report_date']}</span></p>
        <p>Total Count: <span className='emphasis'>{parseInt(data['record_count']).toLocaleString("en-US")}</span></p>
        <p>Archive Dates:<br/><span className='emphasis'>{data['min_entry_date']} to {data['max_entry_date']}</span></p>
        <p><span className='emphasis'>{data.order_count.count}</span> orders in the last 30 days</p>
        </>
        : ''
      }
      { query.isLoading ? <h3>loading data...</h3> : '' }
      { query.isError ? <p>Error: {query.error.message}</p> : '' }
    </div>
  )
}