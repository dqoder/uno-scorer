import Button from './UI/Button'

export default function OptionRight(props) {
    return (
        <li>
            <Button
                onClick={props.onClick}
                style={props.style}
            >
                {props.children}
            </Button>
        </li>
    )
}