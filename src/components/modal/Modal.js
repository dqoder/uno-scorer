import React from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './Modal.module.css';


const styleActionButton = {
    width: '80px',
    background: 'violet',

}


const Modal = (props) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button
                    onClick={props.onConfirm}
                    style={styleActionButton}>Yes</Button>
                <Button onClick={props.onCancel} style={styleActionButton}>No</Button>
            </footer>
        </Card >
    );
};

export default Modal;