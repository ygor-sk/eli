import {
    Blinder,
    CeilingItem,
    Corner,
    Floor,
    Frame,
    NameOffset,
    PirSensor,
    RawCable,
    Room,
    Special,
    WallItem,
    WallLight
} from "./types";
import React, {ReactNode} from "react";

export const BOX_SIZE = 14;
const NESTED_BOX_MARGIN = 2;

enum Wall {
    Top,
    Bottom,
    Left,
    Right
}

enum Orientation {
    Vertical,
    Horizontal,
}

interface BoxProps {
    children?: ReactNode,
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
    width: number,
    height: number,
    background: string,
    className?: string,
    borderLeft?: boolean,
    borderRight?: boolean,
    borderTop?: boolean,
    borderBottom?: boolean,
}

function orientation(wall: Wall): Orientation {
    switch (wall) {
        case Wall.Top:
            return Orientation.Horizontal;
        case Wall.Bottom:
            return Orientation.Horizontal;
        case Wall.Left:
            return Orientation.Vertical;
        case Wall.Right:
            return Orientation.Vertical;
    }
}

function Box(props: BoxProps) {
    function resolveBorder(border?: boolean) {
        return border === undefined || border ? "1px solid black" : "1px solid white";
    }

    return <div
        className={props.className}
        style={{
            position: "absolute",
            background: props.background,
            borderLeft: resolveBorder(props.borderLeft),
            borderRight: resolveBorder(props.borderRight),
            borderTop: resolveBorder(props.borderTop),
            borderBottom: resolveBorder(props.borderBottom),
            left: props.left,
            right: props.right,
            top: props.top,
            bottom: props.bottom,
            width: props.width,
            height: props.height,
            display: "grid",
            textAlign: "center",
            alignItems: "center",
        }}>
        {props.children}
    </div>
}

interface NestedBoxProps {
    children: ReactNode,
    background: string,
    level: number,
    index: number,
    orientation: Orientation,
}


function NestedBox(props: NestedBoxProps) {
    const margin = props.level * NESTED_BOX_MARGIN;
    const size = BOX_SIZE - 2 * margin;

    function bottom() {
        switch (props.orientation) {
            case Orientation.Vertical:
                return BOX_SIZE * props.index + margin - 1;
            case Orientation.Horizontal:
                return margin - 1;
        }
    }

    function left() {
        switch (props.orientation) {
            case Orientation.Vertical:
                return margin - 1;
            case Orientation.Horizontal:
                return BOX_SIZE * props.index + margin - 1;
        }
    }

    return <Box width={size} height={size} left={left()} bottom={bottom()} background={props.background}>
        {props.children}
    </Box>
}


export function renderFloor(floor: Floor) {
    return (
        <div style={{position: "relative", margin: 60}}>
            {
                floor.rooms.map(room => renderRoom(room))
            }
        </div>
    );
}

function nameOffsetStyle(nameOffset?: NameOffset): any {
    const horizontal = nameOffset?.horizontal || 0;
    const vertical = nameOffset?.vertical || 0;
    return {
        paddingLeft: horizontal > 0 ? horizontal : undefined,
        paddingBottom: vertical > 0 ? vertical : undefined,
        paddingRight: horizontal < 0 ? -horizontal : undefined,
        paddingTop: vertical < 0 ? -vertical : undefined,
    };
}

function renderRoom(room: Room) {
    return <Box
        left={room.left} top={room.top} width={room.width} height={room.height}
        background={"grey"} className={room.name}
    >
        <div className="room-name" style={nameOffsetStyle(room.nameOffset)}>
            {room.id} / {room.name}
        </div>
        {renderWallItems(Wall.Left, room.leftWall)}
        {renderWallItems(Wall.Right, room.rightWall)}
        {renderWallItems(Wall.Top, room.topWall)}
        {renderWallItems(Wall.Bottom, room.bottomWall)}
        {renderCorner(true, false, room, room.leftBottomCorner)}
        {renderCorner(false, false, room, room.rightBottomCorner)}
        {renderCorner(true, true, room, room.leftTopCorner)}
        {renderCorner(false, true, room, room.rightTopCorner)}
        {renderCeilingItem(room.ceilingItems)}
    </Box>;
}

function renderCorner(isLeft: boolean, isTop: boolean, room: Room, corner?: Corner) {
    if (corner === undefined) {
        return <></>;
    }
    const left = isLeft ? 0 : room.width - corner.width;
    const top = isTop ? 0 : room.height - corner.height;

    return <Box
        left={left - 1} top={top - 1} width={corner.width} height={corner.height}
        background={"white"}
        borderLeft={!isLeft} borderRight={isLeft}
        borderTop={!isTop} borderBottom={isTop}
    />
}

function renderWallItems(wall: Wall, wallItems?: WallItem[]) {
    return (wallItems || []).map(wallItem => {
        switch (wallItem.type) {
            case "Frame":
                return renderFrame(wall, wallItem);
            case "Blinder":
                return renderBlinder(wall, wallItem)
            case "PirSensor":
                return renderPyrSensor(wall, wallItem)
            case "WallLight":
                return renderWallLight(wall, wallItem)
            case "Special":
                return renderSpecial(wall, wallItem)
            case "RawCable":
                return renderRawCable(wall, wallItem)
        }
    })
}

type AbsolutePosition = {
    left?: number, right?: number,
    top?: number, bottom?: number,
}

type RectangleSize = { width: number, height: number }

type RectangleProps = AbsolutePosition & RectangleSize;

function rectangleProps(wall: Wall, position: number, shortSize: number, longSize: number,
                        offset: number = 0, mirror: boolean = false): RectangleProps {
    function calculateSize(): RectangleSize {
        switch (orientation(wall)) {
            case Orientation.Horizontal:
                return {width: longSize, height: shortSize}
            case Orientation.Vertical:
                return {width: shortSize, height: longSize}
        }
    }

    const size = calculateSize();

    switch (wall) {
        case Wall.Top:
            return mirror ?
                {...size, top: -size.height - 4 - offset, left: position} :
                {...size, top: -offset, left: position}
        case Wall.Bottom:
            return mirror ?
                {...size, bottom: -size.height - 4 - offset, left: position} :
                {...size, bottom: -offset, left: position};
        case Wall.Left:
            return mirror ?
                {...size, bottom: position, left: -size.width - 4 - offset} :
                {...size, bottom: position, left: -offset};
        case Wall.Right:
            return mirror ?
                {...size, bottom: position, right: -size.width - 4 - offset} :
                {...size, bottom: position, right: -offset};
    }
}

function mirrorWall(wall: Wall): Wall {
    switch (wall) {
        case Wall.Top:
            return Wall.Bottom;
        case Wall.Bottom:
            return Wall.Top;
        case Wall.Left:
            return Wall.Right;
        case Wall.Right:
            return Wall.Left;
    }
}

function textProps(wall: Wall, mirror: boolean = false): AbsolutePosition {
    const effectiveWall = mirror ? mirrorWall(wall) : wall;
    switch (effectiveWall) {
        case Wall.Top:
            return {top: BOX_SIZE + 4, left: -2}
        case Wall.Bottom:
            return {bottom: BOX_SIZE, left: -2}
        case Wall.Left:
            return {left: BOX_SIZE + 2}
        case Wall.Right:
            return {right: BOX_SIZE + 2}
    }
}

function renderFrame(wall: Wall, frame: Frame) {
    function renderFrameItem(index: number, background: string, text?: string) {
        const tProps = textProps(wall, frame.mirror);
        return <NestedBox
            level={1}
            index={index}
            background={background}
            orientation={orientation(wall)}
        >
            <div style={{position: "absolute", ...tProps}}>{text}</div>
        </NestedBox>
    }

    function renderFrameItems() {
        return frame.items.map((item, index) => {
                switch (item.type) {
                    case "Socket":
                        return renderFrameItem(index, "lightblue");
                    case "KnxControl":
                        return renderFrameItem(index, "purple", `${item.name}|${item.knxType}`);
                    case "Lan":
                        return renderFrameItem(index, "gray", item.name);
                    case "Tunnel":
                        return renderFrameItem(index, "white", "");
                }
            }
        )
    }

    const props = rectangleProps(wall, frame.position, BOX_SIZE, frame.items.length * BOX_SIZE, frame.offset, frame.mirror);
    return <Box {...props} background={"yellow"}>
        {renderFrameItems()}
    </Box>;
}

function renderCeilingItem(items?: CeilingItem[]) {
    return (items || []).map(item => {
        function background() {
            switch (item.type) {
                case "Bulb":
                    return "yellow";
                case "Point":
                    return "orange";
                case "Sensor":
                    return "gold";
            }
        }

        return <Box
            left={item.left - BOX_SIZE / 2} top={item.top - BOX_SIZE / 2}
            width={BOX_SIZE} height={BOX_SIZE}
            background={background()}>
            <div style={{position: "absolute", top: -BOX_SIZE + 4, left: -4}}>{item.circuit}</div>
        </Box>
    })
}

function renderPyrSensor(wall: Wall, pyrSensor: PirSensor) {
    return renderWallItem(wall, "brown", BOX_SIZE, BOX_SIZE, pyrSensor);
}

function renderWallLight(wall: Wall, wallLight: WallLight) {
    return renderWallItem(wall, "pink", BOX_SIZE, BOX_SIZE, wallLight);
}

function renderSpecial(wall: Wall, special: Special) {
    return renderWallItem(wall, "aqua", BOX_SIZE, BOX_SIZE, special);
}

function renderRawCable(wall: Wall, rawCable: RawCable) {
    return renderWallItem(wall, "darkGreen", BOX_SIZE, BOX_SIZE, {...rawCable, name: rawCable.note || ""});
}

function renderBlinder(wall: Wall, blinder: Blinder) {
    return renderWallItem(wall, "red", BOX_SIZE, blinder.size, {...blinder, mirror: true});
}

function renderWallItem(wall: Wall, background: string, shortSize: number, longSize: number,
                        wallItem: { name: string; position: number; mirror?: boolean; offset?: number }) {
    const rProps = rectangleProps(wall, wallItem.position, shortSize, longSize, wallItem.offset, wallItem.mirror);
    const tProps = textProps(wall, wallItem.mirror);
    return <Box {...rProps} background={background}>
        <div style={{position: "absolute", ...tProps}}>{wallItem.name}</div>
    </Box>
}
