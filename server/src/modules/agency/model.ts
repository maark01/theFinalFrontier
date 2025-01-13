export interface Agency {
    id: number
    name: string
    abbrev: string
    foundingYear: number | null
}

export interface Results {
    results: Agency[]
}