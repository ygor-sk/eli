import {renderFloor} from "./app/render";
import {np_1, np_2} from "./app/floors";

export enum Screen {
    NP_1,
    NP_2,
    NP_3,
}

export function Content(props: { screen: Screen }) {
    switch (props.screen) {
        case Screen.NP_1:
            return renderFloor(np_1)
        case Screen.NP_2:
            return renderFloor(np_2);
        case Screen.NP_3:
            return <>NP_3</>;
    }
}