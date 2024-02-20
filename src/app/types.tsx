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

export type WallItem = Blinder | Frame | PyrSensor | WallLight | Special | RawCable;

export interface Blinder {
    type: "Blinder"
    circuit: string
    position: number
    size: number
}

export const blinder = (circuit: string, position: number, size: number): Blinder =>
    ({type: "Blinder", circuit, position, size})

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
    knxType: KnxType
}

export const knxSwitch = (knxType: KnxType): KnxControl => ({type: "KnxControl", knxType})

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

export interface PyrSensor {
    type: "PyrSensor",
    position: number,
}

export const pyrSensor = (position: number): PyrSensor => ({type: "PyrSensor", position})

export interface WallLight {
    type: "WallLight",
    circuit: string,
    position: number,
    offset?: number
}

export const wallLight = (circuit: string, position: number, offset?: number): WallLight =>
    ({type: "WallLight", circuit, position, offset})

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
