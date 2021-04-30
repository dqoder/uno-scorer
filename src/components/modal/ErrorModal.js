import React from 'react';
import ReactDOM from 'react-dom';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './Modal.module.css';

import Backdrop from './Backdrop'

import ModalOverlay from './Modal'



const ErrorModal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />,
                document.getElementById('overlay-root')
            )}
        </>
    );
};

export default ErrorModal;
