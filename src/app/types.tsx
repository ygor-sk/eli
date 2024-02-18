export interface Floor {
    rooms: Room[];
}

export interface Room {
    id: string
    name: string,
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

export type WallItem = Blinder | Frame;

export interface Blinder {
    type: "Blinder"
    position: number,
    size: number,
}

export interface Frame {
    type: "Frame",
    position: number
    items: FrameItem[]
}

export type FrameItem = Switch | Socket | Lan;

export interface Switch {
    type: "Switch"
    buttons: 1 | 2 | 4 | 6 | 8
}

export interface Socket {
    type: "Socket"
}

export interface Lan {
    type: "Lan"
}

export interface Light {
    type: "Bulb" | "Point",
    circuit: string,
    left: number,
    top: number,
}

