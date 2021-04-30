import classes from './Player.module.css'
import { Draggable } from 'react-beautiful-dnd'


export default function Player(props) {
    const forGameOver = props.forGameOver ?? false
    if (!forGameOver)
        return (
            <Draggable key={props.id} draggableId={`${props.id}`} index={props.index}>
                {provided => (
                    <li
                        className={`${classes.PlayerStruct} ${classes.MovableListElem}`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {props.name}
                    </li>
                )
                }
            </Draggable>
        )

    return (
        <li className={`${classes.PlayerStruct} ${classes['for-game-over']}`}>
            <div>{props.name}</div>
            <div>{`${props.score}`}</div>
        </li>
    )
}