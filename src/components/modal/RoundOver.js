import React from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './Modal.module.css';

import styled from 'styled-components'

import { useRef } from 'react'

const styleActionButton = {
    width: '80px',
    background: 'violet',
}

const Container = styled.div`
    margin: auto;
    // background: lime;
    display: grid;
    width: 90%;
    margin-bottom: 20px;
    
    grid-template: '1fr 1fr';
    gap: 5px;
    &>input{
        // margin-left:auto;
        // width : 50px;
        text-align: center;
    }
    &>input::-webkit-outer-spin-button,
    &>input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &>input[type=number] {
        -moz-appearance: textfield;
    }

    &>select{
        margin-left:auto;
        text-align: right;
        background:inherit;
        border:none;
        border-bottom: 2px solid black;
        outline:none;
        width: 100%;
    }
`




const Modal = (props) => {
    const inputRef = useRef();
    const selRef = useRef();

    const onPressAdd = () => {
        let inputNum = Number(inputRef.current.value)
        let selValue = Number(selRef.current.value)

        if (inputNum < 1000 && inputNum >= 0)
            props.onConfirm(inputNum, selValue)

        console.log({ selValue, inputNum })

    }

    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <p>{props.message}</p>

            <Container>
                <label htmlFor="winner-round">Round winner</label>
                <select id="winner-round" ref={selRef}>
                    {props.playerList.map((p, i) => <option key={p.id} value={i}>{p.name}</option>)}
                </select>
                <label htmlFor="surplus">Sum</label>
                <input ref={inputRef} name="surplus" id="surplus" type="number" min="0" max={999} />
            </Container>

            <footer className={classes.actions}>
                <Button
                    onClick={onPressAdd}
                    style={styleActionButton}>Add</Button>
                <Button onClick={props.onCancel} style={styleActionButton}>Cancel</Button>
            </footer>
        </Card >
    );
};

export default Modal;