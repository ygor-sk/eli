export interface Floor {
    rooms: Room[];
}

export type NameOffset = {
    horizontal?: number,
    vertical?: number,
};

export interface Room {
    id: string
    name: string,
    nameOffset?: NameOffset
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
    mirror?: boolean,
    options: {
        buried: boolean,
        installed: boolean
    }
}

export const frame = (position: number, items: FrameItem[], offset?: number, mirror?: boolean, options?: Frame["options"]): Frame =>
    ({
        type: "Frame", position, items, offset, mirror,
        options: Object.assign({buried: true, installed: true}, options)
    })

export type FrameItem = KnxControl | Socket | Lan | Tunnel;

export interface KnxControl {
    type: "KnxControl"
    name: string
    knxType: 1 | 2 | 4 | 6 | 8
    nameOffset?: NameOffset,
    options: {
        installedHardware: boolean,
        installedCover: boolean,
    }
}

export const knxSwitch = (name: string, knxType: KnxControl["knxType"], nameOffset?: NameOffset, options?: Partial<Socket["options"]>): KnxControl =>
    ({
        type: "KnxControl",
        name, knxType, nameOffset,
        options: Object.assign({installedHardware: true, installedCover: true}, options)
    })

export interface Socket {
    type: "Socket",
    options: {
        ip: "IP20" | "IP44",
        voltage: 220 | 400,
        installedHardware: boolean,
        installedCover: boolean,
    }
}

export const socket = (options?: Partial<Socket["options"]>): Socket => ({
    type: "Socket",
    options: Object.assign({
        ip: "IP20",
        voltage: 220,
        installedHardware: true,
        installedCover: true
    }, options)
})

console.log(socket({voltage: 400, installedCover: false}))

export interface Lan {
    name: string
    type: "Lan"
}

export const lan = (name: string): Lan => ({type: "Lan", name})

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
