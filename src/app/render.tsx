import {Corner, Floor, Frame, FrameItem, Light, Room, WallItem, Window} from "./types";
import React, {ReactNode} from "react";

const BOX_SIZE = 60;
const NESTED_BOX_MARGIN = 4;

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
            alignItems: "center"
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
                return BOX_SIZE * props.index + margin;
            case Orientation.Horizontal:
                return margin;
        }
    }

    function left() {
        switch (props.orientation) {
            case Orientation.Vertical:
                return margin;
            case Orientation.Horizontal:
                return BOX_SIZE * props.index + margin;
        }
    }

    return <Box width={size} height={size} left={left()} bottom={bottom()} background={props.background}>
        {props.children}
    </Box>
}


export function renderFloor(floor: Floor) {
    return (
        <div style={{position: "relative", margin: 20}}>
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
        <div className="room-name">{room.id} / {room.name}</div>
        {renderWallItems(Wall.Left, room.leftWall)}
        {renderWallItems(Wall.Right, room.rightWall)}
        {renderWallItems(Wall.Top, room.topWall)}
        {renderWallItems(Wall.Bottom, room.bottomWall)}
        {renderCorner(true, false, room, room.leftBottomCorner)}
        {renderCorner(false, false, room, room.rightBottomCorner)}
        {renderCorner(true, true, room, room.leftTopCorner)}
        {renderCorner(false, true, room, room.rightTopCorner)}
        {renderLights(room.lights)}
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
            case "Window":
                return renderWindow(wallItem)
        }
    })
}

function renderFrame(wall: Wall, frame: Frame) {
    type Size = { width: number, height: number }
    type FrameBoxProps = Size & {
        left?: number, right?: number,
        top?: number, bottom?: number,
    };

    function size(): Size {
        switch (orientation(wall)) {
            case Orientation.Horizontal:
                return {width: frame.items.length * BOX_SIZE, height: BOX_SIZE}
            case Orientation.Vertical:
                return {width: BOX_SIZE, height: frame.items.length * BOX_SIZE}
        }
    }

    function calculateProps(): FrameBoxProps {
        switch (wall) {
            case Wall.Top:
                return {...size(), top: 0, left: frame.offset}
            case Wall.Bottom:
                return {...size(), bottom: 0, left: frame.offset}
            case Wall.Left:
                return {...size(), bottom: frame.offset, left: 0}
            case Wall.Right:
                return {...size(), bottom: frame.offset, right: 0}
        }
    }

    return <Box {...calculateProps()} background={"yellow"}>
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
        case "Switch":
            return "K";
    }
    // return <Box
    //     width={BOX_SIZE} height={BOX_SIZE}
    //     background={"lightgreen"}
    // >
    //     {frameItem.type}
    // </Box>
}

function renderLights(lights?: Light[]) {
    return (lights || []).map(light => {
        return <Box
            left={light.left - BOX_SIZE / 2} bottom={light.bottom - BOX_SIZE / 2}
            width={BOX_SIZE} height={BOX_SIZE}
            background={"green"}>
            {light.circuit}
        </Box>
    })
}

function renderWindow(window: Window) {
    return <Box
        left={-20 - BOX_SIZE} bottom={window.offset} width={BOX_SIZE} height={BOX_SIZE}
        background={"lightgreen"}
    >
        {window.type} / {window.blinder}
    </Box>
}
