import classes from './GameOver.module.css'
import Card from '../UI/Card'
import Button from '../UI/Button'
import PlayerList from '../playerList/PlayerList';

import { DragDropContext } from "react-beautiful-dnd";

const styleActionButton = {
    width: '180px',
    background: 'violet',

}




export default function GameOver(props) {
    let players = props.playerList
    players = players.sort((p1, p2) => p2.score - p1.score)


    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>GAME OVER</h2>
                <div style={{ marginTop: '20px' }}>
                    <span style={{ fontSize: 'large', fontWeight: 'bold' }}>{`${players[0].name} `}</span>
                    <span style={{ fontSize: 'large' }}>WON</span>
                </div>
            </header>
            <div className={classes.content}>

                <DragDropContext onDragEnd={() => {/*This is not supposed to be draggable, but Player.js (used as child of PlayerList.js) uses Draggable / dropppable => gives error */ }} >
                    <PlayerList playerList={players} forGameOver={true} />
                </DragDropContext>
            </div>
            <footer className={`${classes.actions} ${classes['actions-at-middle']}`}>
                <Button
                    onClick={props.onConfirm}
                    style={styleActionButton}>New Game</Button>
            </footer>
        </Card >
    )
}