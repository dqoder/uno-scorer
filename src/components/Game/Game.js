// import PlayerCard from "../PlayerCard/PlayerCard"
import { useState, useRef } from 'react'

import Card from "../UI/Card";
import Button from '../UI/Button'

import classes from './Game.module.css'
import ReactDOM from 'react-dom'
import OptionRight from "../OptionRight";

import styled from 'styled-components'

const TableContainer = styled.div`
    overflow:hidden;
    &>table{
        margin: auto;
        border-collapse: collapse;
    }

    &>table :is(td,th) {
        padding: 0px 10px;
    }
    &>table th{
        background: black;
        color:white;
        
        border-top-left-radius: 10px;
    }

    &>table th:last-child{
        border-top-left-radius: 0px;
        border-top-right-radius: 10px ;
    }

    &>table > tbody{
        border: 2px solid black;
        border-top: none; 
    }

    .active-player{
        background: greenyellow;
    }


`





const GAME_WINNING_POINT = 500;

const chanceSkipped = ['No card/skipped']
const strList09 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const strListOther = [
    'Skip Card', 'Reverse', 'Draw 2', 'Wild Card', 'Wild Draw 4', 'Shuffle Hands'
]

const getValue = (str) => {
    if (strList09.includes(str)) return Number(str)
    switch (str) {
        case 'Skip Card':
        case 'Reverse':
        case 'Draw 2': return 20;
        case 'Shuffle Hands': return 40;
        case 'Wild Card':
        case 'Wild Draw 4': return 50;
        default: return 0;
    }
}

const buttonStyle = {
    margin: '18px auto',
    display: 'block',
    width: 'fit-content',
    padding: '3px 30px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 'large',
    background: 'limegreen',
}




export default function Game(props) {
    const totalNumberOfPlayer = props.playerList.length
    const FOUR_N = totalNumberOfPlayer;
    const [turn, setTurn] = useState(props.gameState.turn)
    const [positiveInc, setPositiveInc] = useState(props.gameState.posInc)
    const [playerData, setPlayerDate] = useState(props.playerList.map(obj => { return { ...obj } }))

    const selectRef = useRef();




    /**
     * logic: this function update prop.playerList
     * state is not transferred upward (to MainBody.js) here
     * but in this function -- changeTurn is called
     *  so that turn STATE is changed --> Game.js re-rendered.
     *  so props.player.score which is changed in this fxn is update
     *  w/o passing it upward.
     *  
     * player data (updated score would be passed on ROUND OVER event) [NOT HERE]
     */
    const updateScoreAndTurn = () => {
        const curScore = getValue(selectRef.current.value)

        const newScore = curScore + playerData[turn].score

        setPlayerDate(oldList => {
            const newList = oldList.map(obj => { return { ...obj } })
            newList[turn].score += curScore
            return newList
        })


        if (newScore >= GAME_WINNING_POINT) {
            props.onGameOver(playerData, turn, newScore);
        }

        const lastCard = selectRef.current.value
        // changeTurn(lastCard)
        if (lastCard == null) throw new TypeError('not a card')


        if (lastCard === 'Reverse') {
            // in case only 2 players are playing: chance is not changed.
            if (totalNumberOfPlayer > 2) {
                setTurn(prevTurn => (FOUR_N + prevTurn + (positiveInc ? -1 : 1)) % totalNumberOfPlayer);
            }
            setPositiveInc(prev => !prev)
        }

        else if (['Skip Card', 'Draw 2', 'Wild Draw 4'].includes(lastCard)) {
            // in case only 2 players are playing: chance is not changed.
            if (totalNumberOfPlayer > 2) {
                setTurn(prevTurn => (FOUR_N + prevTurn + (positiveInc ? 2 : -2)) % totalNumberOfPlayer);
            } else if (totalNumberOfPlayer === 2) {
                setPositiveInc(prev => !prev)   //no effect but 
                // called so thag Game.js get re-rendered and props/score get updated.
            }
        } else if (['No card/skipped', 'Shuffle Hands', 'Wild Card'].includes(lastCard) ||
            Number(lastCard) < 10) {
            setTurn(prevTurn => (FOUR_N + prevTurn + (positiveInc ? 1 : -1)) % totalNumberOfPlayer);

        } else {
            throw new TypeError('not a valid card')
        }
        selectRef.current.value = 'No card/skipped';

    }

    const listOfCards = chanceSkipped.concat(strList09).concat(strListOther).map(
        card => <option key={`card_${card}`}>{card}</option>
    )


    const Select = (
        <>
            <label className={classes.Label} htmlFor='sel-card'>
                <b>
                    {playerData[turn].name}
                </b>
                {`'s turn`}
            </label>
            <select id='sel-card' className={classes.selectCard} ref={selectRef}> {listOfCards} </select>
        </>
    )

    const informAppJs = (BUTTON_NAME) => {
        return (function () {

            // saving playerData
            props.onModalClick(playerData, { turn, Inc: positiveInc })


            if (BUTTON_NAME === 'QUIT') {
                props.onQuit()
            } else if (BUTTON_NAME === 'ROUND_OVER') {
                props.onRoundOver()
            }

        })
    }


    return (
        <>
            {ReactDOM.createPortal(<OptionRight onClick={informAppJs('QUIT')}>Quit</OptionRight>, document.getElementById('menu'))}
            { ReactDOM.createPortal(<OptionRight onClick={informAppJs('ROUND_OVER')}>Round Over</OptionRight>, document.getElementById('menu'))}

            <Card>
                <TableContainer>
                    <table >
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                playerData.map((p, i) =>
                                    <tr key={p.id} className={turn === i ? "active-player" : ""}>
                                        <td>{p.name}</td>
                                        <td>{p.score}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </TableContainer>
            </Card>
            {
                <Card>
                    {Select}
                    {<Button style={buttonStyle} onClick={updateScoreAndTurn}>Select</Button>}
                </Card>
            }
        </>
    )
}