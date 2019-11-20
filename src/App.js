import React from 'react';
import ZoomWars from './zoom-wars-plain.svg';
import Yaml from 'yaml'
import './App.css';

const example = [{"playerName":"Josh","zoomsWon":"0"},{"playerName":"Barry ( Bob ) ","zoomsWon":"0"}]

class App extends React.Component {
  state = {
    players: []
  }

  constructor(props) {
    super(props)
    this.fetchPlayers()
  }

  fetchPlayers = () => {
    fetch('https://sheetdb.io/api/v1/d2ioykoyz777t')
      .then( r => r.text())
      .then(Yaml.parse)
      .then(players => {
        players.sort((a,b) => b.zoomsWon - a.zoomsWon)
        this.setState({ players, err: '', playerLoading: false })
      })
      .catch(err => {
        this.setState({ err: err+'', playerLoading: false })
      })
  }

  render() {
    const { players } = this.state
    let winningScore
    if(players.length)
      winningScore = players[0].zoomsWon

    return (
      <div className="App">
        <header className="App-header">
          <img src={ZoomWars} className="App-logo" alt="logo" />

          <hr className="divider"/>

          <table className="players">
            { players.map(({playerName, zoomsWon}, i) => (
              <tr className={ zoomsWon === winningScore ? "winning" : ""}
                key={playerName}>
                <td>{playerName}</td>
                <td>{zoomsWon}</td>
              </tr>
            ))}
          </table>
        </header>
      </div>
    );
  }
}

export default App;
