import React, { useState } from 'react'
import NewGame from './components/newgame/NewGame'
import Game from './components/Game/Game'
import RearrangePlayers from './components/PlayerCard/RearrangePlayers'


import './App.css';
import reactDom from 'react-dom';
import OptionRight from './components/OptionRight';
import Backdrop from './components/modal/Backdrop'
import Modal from './components/modal/Modal';
import GameOver from './components/modal/GameOver'
import Help from './components/modal/Help'

import RoundOver from './components/modal/RoundOver'
const GAME_WINNING_POINT = 500;


const FIXED_PL = [/* { name: "rishu", score: 0, id: 10 }, { name: "rikku", score: 0, id: 1 } */]


function App() {
  const [playerList, setPlayerList] = useState(FIXED_PL)

  const [activity, setActivity] = useState({ prev: 'null', cur: 'NEW_GAME' })

  const [gameState, setGameState] = useState({ turn: 0, posInc: true })


  const createNewGame = (newPlayerList) => {
    setActivity(prevActivity => {
      return {
        prev: prevActivity.cur,
        cur: 'GAME'
      }
    })
    setPlayerList(newPlayerList)
    setGameState({ turn: 0, posInc: true })
  }



  const showQuitModal = () => {
    setActivity(prevActivity => {
      return {
        prev: prevActivity.cur,
        cur: 'QUIT'
      }
    })
  }

  const showRoundOverModal = () => {
    setActivity(prevActivity => {
      return {
        prev: prevActivity.cur,
        cur: 'ROUND_OVER'
      }
    })
  }

  const cancelModal = () => {
    setActivity(prevActivity => {
      return {
        prev: 'null',
        cur: prevActivity.prev
      }
    })
  }


  const onRoundOver = (addToScore, toThisPlayer) => {
    setActivity({ prev: 'null', cur: 'PLAYER_REARRANGE' })

    setPlayerList(oldList => {
      const copyOfData = oldList.map(data => { return { ...data } })
      copyOfData[toThisPlayer].score += addToScore
      if (copyOfData[toThisPlayer].score >= GAME_WINNING_POINT) {
        // saveGameData(copyOfData, {turn: 0, posInc:true})
        setGameState({ turn: 0, posInc: true })
        setActivity({ prev: 'ROUND_OVER', cur: 'GAME_OVER' })
        // return copyOfData;
      }
      return copyOfData
    })
  }

  const onGameQuit = () => {
    setPlayerList(oldList => oldList.map(player => {
      return { ...player, score: 0 }
    }))

    setActivity({ prev: 'null', cur: 'NEW_GAME' })

  }




  const saveGameData = (playerData, newGameState) => {
    setPlayerList(playerData.map(data => { return { ...data } }))
    newGameState = newGameState ?? gameState
    setGameState(newGameState)
  }

  const onClickHelpBtn = (STATE) => {
    if (STATE !== 'HELP') {

      return () => setActivity(prevActivity => {
        return { prev: prevActivity.cur, cur: 'HELP' }
      })
    }

    return () => setActivity(prevActivity => {
      return { prev: 'HELP', cur: prevActivity.prev }
    })
  }


  let renderThis;
  switch (activity.cur) {
    case 'NEW_GAME':
      renderThis = <NewGame
        onChangeState={createNewGame}
        playerList={playerList}
      />;
      break;
    case "QUIT":
      renderThis = reactDom.createPortal(
        <Modal
          title="quit"
          message="Do you wish to quit this game?"
          onConfirm={onGameQuit}
          onCancel={cancelModal}
        />, document.getElementById('overlay-root'))
      break;
    case "ROUND_OVER":
      renderThis = reactDom.createPortal(
        <RoundOver
          title="round over"
          message="This round is finished. Sum of the remaining dealt cards is to be added in the last round winner's score."
          onConfirm={onRoundOver}
          onCancel={cancelModal}
          playerList={playerList}
        />, document.getElementById('overlay-root'))
      break;
    case "GAME":
      renderThis = <Game
        playerList={playerList}
        gameState={gameState}
        onRoundOver={showRoundOverModal}
        onQuit={showQuitModal}
        onModalClick={saveGameData}
        onGameOver={(finalData, winnerIndex, lastTurnPlayerScore) => {
          finalData[winnerIndex].score = lastTurnPlayerScore;
          saveGameData(finalData, { turn: 0, posInc: true })
          setActivity({ prev: 'GAME', cur: 'GAME_OVER' })
        }}
      />
      break;
    case "PLAYER_REARRANGE":
      renderThis = <RearrangePlayers
        onBeginNewRound={(newOrder) => {
          saveGameData(newOrder, { turn: 0, posInc: true })
          setActivity({
            prev: "PLAYER_REARRANGE", cur: "GAME"
          })
        }}
        playerList={playerList}
        onModalClick={saveGameData}
        onQuit={showQuitModal}
      ></RearrangePlayers>
      break;
    case 'GAME_OVER':
      renderThis = reactDom.createPortal(<GameOver
        playerList={playerList}
        onConfirm={onGameQuit}
      />, document.getElementById('overlay-root'))
      break;
    case 'HELP':
      renderThis = <Help></Help>
      break;
    default:
      throw new Error("NO DEFAULT CASE")
    // break;
  }


  return (
    <div>
      {reactDom.createPortal(<OptionRight onClick={onClickHelpBtn(activity.cur)}      >{activity.cur !== 'HELP' ? '?' : '←'}</OptionRight>, document.getElementById('menu'))}
      {renderThis}
      {['QUIT', 'ROUND_OVER', 'GAME_OVER'].includes(activity.cur) && reactDom.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}

    </div>

  )
}

export default App;
