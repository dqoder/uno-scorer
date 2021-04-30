

import PlayerList from '../playerList/PlayerList';
import Button from '../UI/Button'
import Card from '../UI/Card';

import OptionRight from '../OptionRight'
import buttonStyles from '../UI/Button.module.css'

import { useState } from 'react'
import ReactDOM from 'react-dom'

import { DragDropContext } from 'react-beautiful-dnd'


export default function NewGame(props) {
    const [players, setPlayers] = useState(props.playerList?.map(data => { return { ...data } }) ?? [])


    const informAppJs = () => {

        // saving playerData
        props.onModalClick(players, { turn: 0, posInc: true })

        props.onQuit()
    }

    const onDragEnd = result => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableID &&
            destination.index === source.index) {
            return;
        }

        setPlayers(oldPlayerList => {
            const copyOfOldPlayerList = oldPlayerList.map(data => { return { ...data } })
            const removed = copyOfOldPlayerList.splice(source.index, 1)
            copyOfOldPlayerList.splice(destination.index, 0, removed[0])

            return copyOfOldPlayerList;
        })

    }


    return (
        <>
            {ReactDOM.createPortal(<OptionRight onClick={informAppJs}>Quit</OptionRight>, document.getElementById('menu'))}
            <Card >
                <div style={{ textAlign: 'center', fontSize: 'x-large', fontWeight: 'bold' }}>Re-arrange players</div>
            </Card>

            <DragDropContext onDragEnd={onDragEnd} >
                <PlayerList playerList={players} />
            </DragDropContext>


            <Card style={{ backgroundColor: 'transparent', boxShadow: '0 0 0 0' }}>
                <Button
                    className={buttonStyles['begin-button']}
                    onClick={() => {
                        props.onBeginNewRound(players)
                    }}
                >Begin next round</Button>
            </Card>

        </>
    )
}