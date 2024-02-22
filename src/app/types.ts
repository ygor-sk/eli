export interface Floor {
    name: 1 | 2 | 3
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
    options: {
        offset: number
        mirror: boolean,
        buried: boolean,
        installed: boolean
    }
}

export const frame = (position: number, items: FrameItem[], options?: Partial<Frame["options"]>): Frame =>
    ({
        type: "Frame", position, items,
        options: Object.assign({offset: 0, mirror: false, buried: true, installed: true}, options)
    })

export type FrameItem = KnxControl | Socket | Lan | Tunnel;

export interface KnxControl {
    type: "KnxControl"
    name: string
    knxType: 1 | 2 | 4 | 6 | 8
    options: {
        installed: boolean,
    }
}

export const knxSwitch = (name: string, knxType: KnxControl["knxType"], options?: Partial<KnxControl["options"]>): KnxControl =>
    ({
        type: "KnxControl",
        name, knxType,
        options: Object.assign({installed: true}, options)
    })

export interface Socket {
    type: "Socket",
    hardware: SocketHardware,
    cover: SocketCover
}

export interface SocketHardware {
    type: "SocketHardware",
    options: {
        installed: boolean,
    }
}

export interface SocketCover {
    type: "SocketCover",
    options: {
        ip: "IP20" | "IP44",
        installed: boolean,
    }
}

export const socket = (options?: { ip?: SocketCover["options"]["ip"], installedHardware?: boolean, installedCover?: boolean }): Socket => ({
    type: "Socket",
    hardware: {
        type: "SocketHardware",
        options: {
            installed: options?.installedHardware === undefined ? true : options?.installedHardware
        }
    },
    cover: {
        type: "SocketCover",
        options: {
            ip: options?.ip === undefined ? "IP20" : options?.ip,
            installed: options?.installedHardware === undefined ? true : options?.installedHardware,
        }
    },
})

export interface Lan {
    name: string
    type: "Lan",
    options: {
        missing: boolean
    }
}

export const lan = (name: string, options?: Partial<Lan["options"]>): Lan =>
    ({type: "Lan", name, options: Object.assign({missing: false}, options)})

export interface Tunnel {
    type: "Tunnel"
}

export const tunnel = (): Tunnel => ({type: "Tunnel"})

export interface CeilingItem {
    type: "Bulb" | "Point" | "Sensor" | "Smoke",
    circuit: string,
    left: number,
    top: number,
    options: {
        installed: boolean
    }
}

export const bulb = (circuit: string, left: number, top: number): CeilingItem =>
    ({type: "Bulb", left, top, circuit, options: {installed: true}})
export const point = (circuit: string, left: number, top: number): CeilingItem =>
    ({type: "Point", left, top, circuit, options: {installed: true}})
export const sensor = (circuit: string, left: number, top: number, options?: Partial<CeilingItem["options"]>): CeilingItem =>
    ({type: "Sensor", left, top, circuit, options: Object.assign({installed: true}, options)})
export const smoke = (circuit: string, left: number, top: number, options?: Partial<CeilingItem["options"]>): CeilingItem =>
    ({type: "Smoke", left, top, circuit, options: Object.assign({installed: true}, options)})


export interface PirSensor {
    type: "PirSensor",
    name: string,
    position: number,
    options: {
        installed: boolean
    }
}

export const pirSensor = (name: string, position: number, options?: Partial<PirSensor["options"]>): PirSensor =>
    ({type: "PirSensor", name, position, options: Object.assign({installed: true}, options)})

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
    options: {
        installed: boolean,
        offset: number
    }
}

export const special = (name: string, position: number, options?: Partial<Special["options"]>): Special =>
    ({
        type: "Special", position, name,
        options: Object.assign({installed: true, offset: 0}, options)
    })

export interface RawCable {
    type: "RawCable",
    note: string
    position: number,

}

export const rawCable = (position: number, name: string): RawCable => ({type: "RawCable", position, note: name})
