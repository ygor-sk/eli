import {Screen} from "./Content";

export function Menu(props: { setScreen: ((value: (((prevState: Screen) => Screen) | Screen)) => void) }) {
    return <>
        <div><a onClick={() => props.setScreen(Screen.NP_1)}>1.np</a></div>
        <div><a onClick={() => props.setScreen(Screen.NP_2)}>2.np</a></div>
        <div><a onClick={() => props.setScreen(Screen.NP_3)}>3.np</a></div>
    </>
}