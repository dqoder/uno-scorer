
import classes from './Button.module.css'


export function AddBtn(props) {

    return <button
        style={props.style}
        className={`${classes.AddBtn} ${props.className ?? ''}`}
        onClick={(e) => props.onClick?.call(null, e)}
        disabled={props.disabled}
    > Add</button >
}

export default function Button(props) {


    return <button
        style={props.style}
        className={`${classes.Button} ${props.className ?? ''}`}
        onClick={(e) => props.onClick?.call(null, e)}
        disabled={props.disabled}
    > {props.children}</button >

}