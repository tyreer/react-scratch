import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { battle } from '../../utils/api';
import Loading from '../Loading/Loading';
import Player from '../Player/Player';
import RateError from '../RateError/RateError';

export default class Results extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const playerNames = queryString.parse(this.props.location.search);

    battle([
      playerNames.playerOneName,
      playerNames.playerTwoName,
    ])
      .then((players) => {
        if (players === null) {
          return this.setState({
            error: 403,
            loading: false,
          });
        }

        return this.setState({
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false,
        });
      });
  }

  render() {
    const {
      error, winner, loser, loading,
    } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <RateError />
      );
    }

    return (
      <div>
        <Player
          label="Winner"
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label="Loser"
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );
  }
}
