import {
    Blinder,
    CeilingItem,
    Corner,
    Floor,
    Frame,
    FrameItem,
    PyrSensor,
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
        {/*<div style={{position: "absolute", right: "15px"}}>{props.children}</div>*/}
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

function renderRoom(room: Room) {
    return <Box
        left={room.left} top={room.top} width={room.width} height={room.height}
        background={"grey"} className={room.name}
    >
        <div className="room-name" style={{
            paddingLeft: room.nameOffset?.horizontal,
            paddingBottom: room.nameOffset?.vertical
        }}>
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
            case "PyrSensor":
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
            return {...size, top: -offset, left: position}
        case Wall.Bottom:
            return mirror ?
                {...size, bottom: -size.height - 4 -offset, left: position} :
                {...size, bottom: -offset, left: position};
        case Wall.Left:
            return mirror ?
                {...size, bottom: position, left: -size.width -4 -offset} :
                {...size, bottom: position, left: -offset};
        case Wall.Right:
            return {...size, bottom: position, right: -offset}
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
            return {top: BOX_SIZE + 4, left: -4}
        case Wall.Bottom:
            return {bottom: BOX_SIZE, left: -4}
        case Wall.Left:
            return {left: BOX_SIZE + 4}
        case Wall.Right:
            return {right: BOX_SIZE + 4}
    }
}

function renderFrame(wall: Wall, frame: Frame) {
    const props = rectangleProps(wall, frame.position, BOX_SIZE, frame.items.length * BOX_SIZE, frame.offset);
    return <Box {...props} background={"yellow"}>
        {renderFrameItems(orientation(wall), frame.items)}
    </Box>;
}

function renderFrameItems(orientation: Orientation, items: FrameItem[]) {
    return items.map((frameItem, index) =>
        <NestedBox
            level={1}
            index={index}
            background={"lightblue"}
            orientation={orientation}
        >
            {renderFrameItem(frameItem)}
        </NestedBox>)
}

function renderFrameItem(frameItem: FrameItem) {
    switch (frameItem.type) {
        case "Socket":
            return "E";
        case "KnxControl":
            return `${frameItem.name}:${frameItem.knxType}`;
        case "Lan":
            return "L";
        case "Tunnel":
            return "T";
    }
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

function renderBlinder(wall: Wall, blinder: Blinder) {
    const props = rectangleProps(wall, blinder.position, BOX_SIZE, blinder.size, BOX_SIZE + 4);
    return <Box {...props} background={"red"}>{blinder.circuit}</Box>
}

function renderPyrSensor(wall: Wall, pyrSensor: PyrSensor) {
    const props = rectangleProps(wall, pyrSensor.position, BOX_SIZE, BOX_SIZE);
    return <Box {...props} background={"brown"}>P</Box>
}

function renderWallLight(wall: Wall, wallLight: WallLight) {
    return renderWallItem(wall, wallLight, "pink");
}

function renderSpecial(wall: Wall, special: Special) {
    const props = rectangleProps(wall, special.position, BOX_SIZE, BOX_SIZE, special.offset);
    return <Box {...props} background={"aqua"}>{special.name}</Box>
}

function renderRawCable(wall: Wall, rawCable: RawCable) {
    const props = rectangleProps(wall, rawCable.position, BOX_SIZE, BOX_SIZE);
    return <Box {...props} background={"darkGreen"}>e{rawCable.note ? `(${rawCable.note})` : ""}</Box>
}

function renderWallItem(wall: Wall, wallItem: { circuit: string, position: number, mirror?: boolean, offset?: number }, background: string) {
    const rProps = rectangleProps(wall, wallItem.position, BOX_SIZE, BOX_SIZE, wallItem.offset, wallItem.mirror);
    const tProps = textProps(wall, wallItem.mirror);
    return <Box {...rProps} background={background}>
        <div style={{position: "absolute", ...tProps}}>{wallItem.circuit}</div>
    </Box>
}

