export interface Floor {
    rooms: Room[];
}

export interface Room {
    id: string
    name: string,
    nameOffset?: {
        horizontal?: number,
        vertical?: number,
    }
    width: number,
    height: number,
    left: number,
    top: number,
    leftBottomCorner?: Corner,
    rightBottomCorner?: Corner,
    leftTopCorner?: Corner,
    rightTopCorner?: Corner,
    leftWall?: WallItem[],
    rightWall?: WallItem[],
    topWall?: WallItem[],
    bottomWall?: WallItem[],
    ceilingItems?: CeilingItem[]
}

export interface Corner {
    width: number,
    height: number
}

export type WallItem = Blinder | Frame | PirSensor | WallLight | Special | RawCable;

export interface Blinder {
    type: "Blinder"
    name: string
    position: number
    size: number
}

export const blinder = (name: string, position: number, size: number): Blinder =>
    ({type: "Blinder", name, position, size})

export interface Frame {
    type: "Frame",
    position: number
    items: FrameItem[]
    offset?: number
}

export const frame = (position: number, items: FrameItem[], offset?: number): Frame =>
    ({type: "Frame", position, items, offset})

export type FrameItem = KnxControl | Socket | Lan | Tunnel;

type KnxType = 1 | 2 | 4 | 6 | 8;

export interface KnxControl {
    type: "KnxControl"
    name: string
    knxType: KnxType
}

export const knxSwitch = (name: string, knxType: KnxType): KnxControl =>
    ({type: "KnxControl", name, knxType})

export interface Socket {
    type: "Socket"
}

export const socket = (): Socket => ({type: "Socket"})

export interface Lan {
    type: "Lan"
}

export const lan = (): Lan => ({type: "Lan"})

export interface Tunnel {
    type: "Tunnel"
}

export const tunnel = (): Tunnel => ({type: "Tunnel"})

export interface CeilingItem {
    type: "Bulb" | "Point" | "Sensor",
    circuit: string,
    left: number,
    top: number,
}

export const bulb = (circuit: string, left: number, top: number): CeilingItem => ({type: "Bulb", left, top, circuit})
export const point = (circuit: string, left: number, top: number): CeilingItem => ({type: "Point", left, top, circuit})
export const sensor = (circuit: string, left: number, top: number): CeilingItem => ({
    type: "Sensor",
    left,
    top,
    circuit
})

export interface PirSensor {
    type: "PirSensor",
    name: string,
    position: number,
}

export const pirSensor = (name: string, position: number): PirSensor =>
    ({type: "PirSensor", name, position})

export interface WallLight {
    type: "WallLight",
    name: string,
    position: number,
    offset?: number,
    mirror?: boolean
}

export const wallLight = (name: string, position: number, mirror?: boolean, offset?: number): WallLight =>
    ({type: "WallLight", name, position, offset, mirror})

export interface Special {
    type: "Special",
    position: number,
    name: string,
    offset?: number
}

export const special = (position: number, name: string, offset?: number): Special =>
    ({type: "Special", position, name, offset})

export interface RawCable {
    type: "RawCable",
    position: number,
    note?: string
}

export const rawCable = (position: number, note?: string): RawCable => ({type: "RawCable", position, note})
