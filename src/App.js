import React from 'react';
import ZoomWars from './zoom-wars-plain.svg';
import Yaml from 'yaml'
import './App.css';

class App extends React.Component {
  state = {
    players: []
  }

  constructor(props) {
    super(props)
    this.fetchPlayers()
  }

  fetchPlayers = () => {
    fetch('https://ponelat.github.io/zoom-wars/players.yaml')
      .then( r => r.text())
      .then(Yaml.parse)
      .then(players => {
        players.sort((a,b) => b.count - a.count)
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
      winningScore = players[0].count

    return (
      <div className="App">
        <header className="App-header">
          <img src={ZoomWars} className="App-logo" alt="logo" />

          <hr className="divider"/>

          <table className="players">
            { players.map(({name, count}, i) => (
              <tr className={ count === winningScore ? "winning" : ""}
                key={name}>
                <td>{name}</td>
                <td>{count}</td>
              </tr>
            ))}
          </table>
        </header>
      </div>
    );
  }
}

export default App;
