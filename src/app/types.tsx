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
    lights?: Light[]
}

export interface Corner {
    width: number,
    height: number
}

export type WallItem = Blinder | Frame | PyrSensor | WallLight | Special | RawCable;

export interface Blinder {
    type: "Blinder"
    position: number,
    size: number,
}

export const blinder = (position: number, size: number): Blinder => ({type: "Blinder", position, size})

export interface Frame {
    type: "Frame",
    position: number
    items: FrameItem[]
    offset?: number
}

export const frame = (position: number, items: FrameItem[], offset?: number): Frame =>
    ({type: "Frame", position, items, offset})

export type FrameItem = Switch | Socket | Lan | Tunnel;

export interface Switch {
    type: "Switch"
    buttons: 1 | 2 | 4 | 6 | 8
}

export const knxSwitch = (buttons: 1 | 2 | 4 | 6 | 8): Switch => ({type: "Switch", buttons})

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

export interface Light {
    type: "Bulb" | "Point",
    circuit: string,
    left: number,
    top: number,
}

export const bulb = (circuit: string, left: number, top: number): Light => ({type: "Bulb", left, top, circuit})
export const point = (circuit: string, left: number, top: number): Light => ({type: "Point", left, top, circuit})

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
}

export const special = (position: number, name: string): Special => ({type: "Special", position, name})

export interface RawCable {
    type: "RawCable",
    position: number,
}

export const rawCable = (position: number): RawCable => ({type: "RawCable", position})
