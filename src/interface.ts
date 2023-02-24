export interface Coord {
    x: number
    y: number
}

export interface BaseMappingData {
    id: string
    name: string
}

export interface Area extends BaseMappingData{
    coords: Coord
}

export interface MappingData extends Omit<Area, "coord"> {}
