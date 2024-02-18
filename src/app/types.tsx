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

export type WallItem = Window | Frame;

export interface Window {
    type: "Window"
    offset: number
    blinder: boolean
}

export interface Frame {
    type: "Frame",
    offset: number
    items: FrameItem[]
}

export type FrameItem = Switch | Socket;

export interface Switch {
    type: "Switch"
    buttons: 1 | 2 | 4 | 6 | 8
}

export interface Socket {
    type: "Socket"
}

export interface Light {
    type: "Light",
    circuit: string,
    left: number,
    bottom: number,
}

