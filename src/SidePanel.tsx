import './SidePanel.css'

// export default function SidePanel({children}: Props) {
export default function SidePanel({children}) {
  const baseClass = 'SidePanel'
  // console.log(query?.data)
  // if (query.data) { console.log(`data: {query.data}`) }

  return (
    <div className={baseClass}>
      {children}      
    </div>
  )
}