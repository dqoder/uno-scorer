import { Droppable } from "react-beautiful-dnd"
import Card from "../UI/Card"
import Player from "./Player"
import classes from './Player.module.css'



export default function PlayerList(props) {

    if (props.playerList?.length > 0)
        return (
            <Card>
                <Droppable droppableId="player-list">
                    {
                        provided => (
                            <ul
                                className={`${classes.PlayerListStruct}`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {
                                    props.playerList.map((p, index) => {
                                        return (
                                            <Player name={p.name} id={p.id} score={p.score}
                                                forGameOver={props.forGameOver}
                                                index={index} key={p.id} />
                                        )
                                    })
                                }
                                {provided.placeholder}
                            </ul>
                        )
                    }
                </Droppable>
            </Card >
        )

    return <Card><h3 style={{ textAlign: 'center' }}>Add players in order of their turn</h3></Card>


}