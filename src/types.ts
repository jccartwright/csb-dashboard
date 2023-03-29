export type HexbinDataType = {
  count: number,
  h3: string
}

export type OrderCountType = {
  count: number
  since: string
}

export type SummaryDataType = {
  counts_by_h3: HexbinDataType[]
  counts_by_month: any
  counts_by_provider: any
  max_entry_date: string
  min_entry_date: string
  order_count: OrderCountType
  record_count: string
  report_date: string
}
