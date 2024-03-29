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
import imgSocketIp22 from "./images/socket-ip22.svg";
import imgSocketIp24 from "./images/socket-ip44.svg";
import imgRj45 from "./images/rj45.svg";
import imgKnxSwitch from "./images/knxSwitch.svg";
import imgTunnel from "./images/tunnel.svg";
import imgBulb from "./images/bulb.svg";
import imgPoint from "./images/point.svg";
import imgRawCable from "./images/rawCable.svg";
import imgWallLight from "./images/wallLight.svg";
import imgPirSensor from "./images/pirSensor.svg";
import imgMotionSensor from "./images/motionSensor.svg";
import imgSmokeDetector from "./images/smokeDetector.svg";
import imgSpecial from "./images/special.svg";

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
    background?: string,
    className?: string,
    borderLeft?: boolean,
    borderRight?: boolean,
    borderTop?: boolean,
    borderBottom?: boolean,
}

interface ImageProps {
    path: string,
    rotate: 0 | 90 | 180 | 270
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
        return border ? "1px solid black" : undefined;
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
    background?: string,
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

    return <Box width={size} height={size} left={left()} bottom={bottom()}
                background={props.background}>
        {props.children}
    </Box>
}


export function renderFloor(floor: Floor) {
    return (
        <div className={"main"} style={{position: "relative", margin: 60}}>
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
        background={"grey"}
        borderRight={true} borderLeft={true} borderTop={true} borderBottom={true}
        className={room.name}
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

function textProps(wall: Wall, mirror: boolean, rotate: boolean, installed: boolean): any { // TODO: type
    const effectiveWall = mirror ? mirrorWall(wall) : wall;

    function positionProps() {
        switch (effectiveWall) {
            case Wall.Top:
                return {
                    top: BOX_SIZE + 4,
                    ...(rotate ? {} : {writingMode: "vertical-rl", textOrientation: "mixed"})
                }
            case Wall.Bottom:
                return {
                    bottom: BOX_SIZE + 4,
                    ...(rotate ? {} : {writingMode: "vertical-rl", textOrientation: "mixed"})
                }
            case Wall.Left:
                return {
                    left: BOX_SIZE + 2,
                    ...(rotate ? {writingMode: "vertical-rl", textOrientation: "mixed"} : {})
                }
            case Wall.Right:
                return {
                    right: BOX_SIZE + 2,
                    ...(rotate ? {writingMode: "vertical-rl", textOrientation: "mixed"} : {})
                }
        }
    }

    return {
        ...positionProps(),
        position: "absolute",
        color: installed ? undefined : "darkred",
        textDecoration: installed ? undefined : "underline"
    };
}

function imageProps(wall: Wall, mirror: boolean, path: string): any {
    function rotate(): ImageProps['rotate'] {
        switch (wall) {
            case Wall.Top:
                return mirror ? 0 : 180;
            case Wall.Bottom:
                return mirror ? 180 : 0;
            case Wall.Left:
                return mirror ? 270 : 90;
            case Wall.Right:
                return mirror ? 90 : 270;
        }
    }

    return {
        position: "absolute",
        backgroundImage: `url(${path})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        transform: `rotate(${rotate()}deg)`
    }
}

function renderFrame(wall: Wall, frame: Frame) {
    function renderFrameItems() {
        return frame.items.map((item, index) => {
                function renderFrameItem(image: string, text: string, missingParts: number) {
                    const tProps = textProps(wall, frame.options.mirror, false, missingParts === 0);
                    const iProps = imageProps(wall, frame.options.mirror, image);
                    return <NestedBox
                        level={1}
                        index={index}
                        orientation={orientation(wall)}
                    >
                        <div style={{...iProps}}/>
                        <div style={{...tProps}}>
                            {text}&nbsp;{missingParts ? `(${"?".repeat(missingParts)})` : ""}
                        </div>

                    </NestedBox>
                }

                switch (item.type) {
                    case "Socket":
                        return renderFrameItem(
                            item.cover.options.ip === "IP20" ? imgSocketIp22 : imgSocketIp24,
                            item.hardware.options.name,
                            Number(!item.hardware.options.installed) + Number(!item.cover.options.installed));
                    case "KnxControl":
                        return renderFrameItem(imgKnxSwitch, `${item.name}|${item.knxType}`, Number(!item.options.installed));
                    case "Lan":
                        return renderFrameItem(imgRj45, item.name, Number(item.options.missing));
                    case "Tunnel":
                        return renderFrameItem(imgTunnel, "Tunnel", 0);
                }
            }
        )
    }


    let notBuriedBox = undefined;
    if (!frame.options.buried) {
        const props = rectangleProps(
            wall, frame.position,
            6,
            frame.items.length * BOX_SIZE,
            frame.options.offset, frame.options.mirror
        );
        notBuriedBox =
            <Box {...props} background={frame.options.installed ? undefined : "red"}
                 borderLeft={true} borderRight={true} borderBottom={true} borderTop={true}
            />
        ;
    }

    const props = rectangleProps(
        wall, frame.position,
        BOX_SIZE,
        frame.items.length * BOX_SIZE,
        frame.options.offset - (frame.options.buried ? 0 : 6),
        frame.options.mirror
    );
    return <>
        {notBuriedBox}
        <Box {...props} background={frame.options.installed ? undefined : "red"}
             borderLeft={true} borderRight={true} borderBottom={true} borderTop={true}
        >
            {renderFrameItems()}
        </Box>
    </>;
}

function renderCeilingItem(items?: CeilingItem[]) {
    return (items || []).map(item => {
        function options(): { background?: string, image?: string } {
            switch (item.type) {
                case "Bulb":
                    return {image: imgBulb};
                case "Point":
                    return {image: imgPoint};
                case "Sensor":
                    return {image: imgMotionSensor};
                case "Smoke":
                    return {image: imgSmokeDetector};
            }
        }

        const opt = options();

        const rProps = rectangleProps(Wall.Top, item.left - BOX_SIZE / 2, BOX_SIZE, BOX_SIZE, -item.top + BOX_SIZE / 2, false);
        const tProps = textProps(Wall.Top, false, true, item.options.installed);
        const iProps = opt.image ? imageProps(Wall.Top, false, opt.image) : undefined;
        return <Box {...rProps} background={opt.background}>
            {iProps ? <div style={{...iProps}}/> : undefined}
            <div style={{...tProps}}>{item.circuit}&nbsp;{item.options.installed ? "" : "(?)"}</div>
        </Box>
    })
}

function renderPyrSensor(wall: Wall, pyrSensor: PirSensor) {
    return renderWallItem(wall, BOX_SIZE, BOX_SIZE, {
        ...pyrSensor,
        image: imgPirSensor,
        missing: !pyrSensor.options.installed
    });
}

function renderWallLight(wall: Wall, wallLight: WallLight) {
    return renderWallItem(wall, BOX_SIZE, BOX_SIZE, {
        ...wallLight,
        image: imgWallLight,
    });
}

function renderSpecial(wall: Wall, special: Special) {
    return renderWallItem(wall, BOX_SIZE, BOX_SIZE, {
        ...special,
        image: imgSpecial,
        offset: special.options.offset,
        missing: !special.options.installed
    });
}

function renderRawCable(wall: Wall, rawCable: RawCable) {
    return renderWallItem(wall, BOX_SIZE, BOX_SIZE, {
        ...rawCable,
        image: imgRawCable,
        name: rawCable.note || "",
        offset: rawCable.options.offset
    });
}

function renderBlinder(wall: Wall, blinder: Blinder) {
    return renderWallItem(wall, BOX_SIZE, blinder.size, {
        ...blinder,
        border: true,
        background: "Beige",
        mirror: true,
        rotate: true
    });
}

function renderWallItem(wall: Wall, shortSize: number, longSize: number,
                        options: {
                            name: string; position: number; mirror?: boolean;
                            rotate?: boolean, offset?: number, missing?: boolean,
                            border?: boolean,
                            background?: string,
                            image?: string,
                        }) {
    const rProps = rectangleProps(wall, options.position, shortSize, longSize, options.offset, options.mirror);
    const tProps = textProps(wall, options.mirror || false, options.rotate || false, !options.missing);
    const iProps = options.image ? imageProps(wall, !!options.mirror, options.image) : undefined;
    return <Box {...rProps} background={options.background} borderTop={options.border}
                borderBottom={options.border} borderLeft={options.border} borderRight={options.border} >
        {iProps ? <div style={{...iProps}}/> : undefined}
        <div style={{...tProps}}>{options.name}&nbsp;{options.missing ? "(?)" : ""}</div>
    </Box>
}
