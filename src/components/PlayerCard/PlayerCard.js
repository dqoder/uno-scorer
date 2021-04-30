import classes from './PlayerCard.module.css'

import styled from 'styled-components'

const Container = styled.div`
    font-size: 3rem;
    font-weight: normal;
    // margin:auto;
    font-family:monospace;
    color:brown;
    font-weight: bold;
    position : absolute;
    bottom: 10px;
    left: calc(50% - 10px);
`


const Heading = styled.div`
    font-size: x-large;
    // font-weight: bold;
    font-style:italic;
    margin:auto;
    font-family:monospace;
    // color:brown;
    margin-bottom:20px;
    overflow-x: hidden;
    text-overflow:ellipsis;
`

export default function PlayerCard(props) {
    const style = {
        // border: '2px solid black'
        borderColor: "black",
        transform: 'scale(1.15)',
        zIndex: '5'
    }

    return (
        <li className={`${classes.CardStruct}`} style={props.chance ? style : null}>
            <Heading>{props.name}</Heading>
            <Container>{props.score}</Container>
        </li>
    )
}