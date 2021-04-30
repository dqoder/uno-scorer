import classes from './NewPlayer.module.css'
import { AddBtn } from '../UI/Button'
import Card from '../UI/Card';

import { useRef } from 'react'



export default function NewPlayer(props) {
    const addBtnDisable = props.playerCount >= 10;
    const inputRef = useRef();





    const onClickHandler = e => {
        e.preventDefault();
        const inputValue = inputRef.current.value
        if (inputValue === '') {
            return;
        }

        props.onPlayerAdd(inputValue);
        inputRef.current.value = ''
    }

    return (
        <Card style={{ marginBottom: '30px' }}>
            <form className={classes['new-player-form']}>
                <label htmlFor='new-player'>Name</label>
                <input
                    ref={inputRef}
                    id='new-player'
                    type='text'
                    placeholder="player's name"
                    maxLength="25"
                />
                <AddBtn onClick={onClickHandler} disabled={addBtnDisable} style={{ backgroundColor: "greenyellow" }} />
            </form>
        </Card>
    )
}