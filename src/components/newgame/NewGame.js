import PlayerList from '../playerList/PlayerList';
import Button from '../UI/Button'
import Card from '../UI/Card';
import NewPlayer from './NewPlayer';

import { useState } from 'react'
import buttonStyles from '../UI/Button.module.css'

import { DragDropContext } from 'react-beautiful-dnd'


export default function NewGame(props) {
    const [players, setPlayers] = useState(props.playerList?.map(data => { return { ...data } }) ?? [])



    const playerAddHandler = (newName) => {
        if (typeof (newName) !== 'string') {
            throw new TypeError('newName should be string')
        }
        setPlayers(prevArr => [{ name: newName, score: 0, id: Math.random() }, ...prevArr])
    }


    const onDragEnd = result => {
        const { destination, source } = result;

        if (!destination) {
            setPlayers(oldPlayerList => {
                const copyOfOldPlayerList = oldPlayerList.map(data => { return { ...data } })
                copyOfOldPlayerList.splice(source.index, 1)

                return copyOfOldPlayerList;
            })
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
            <NewPlayer playerCount={players.length} onPlayerAdd={playerAddHandler} />

            <DragDropContext onDragEnd={onDragEnd} >
                <PlayerList playerList={players} />
            </DragDropContext>


            <Card style={{ backgroundColor: 'transparent', boxShadow: '0 0 0 0' }}>
                <Button
                    className={buttonStyles['begin-button']}
                    onClick={() => {
                        props.onChangeState(players)
                    }}
                    disabled={!(players.length > 1 && players.length <= 10)}
                >Start new game</Button>
            </Card>

        </>
    )
}