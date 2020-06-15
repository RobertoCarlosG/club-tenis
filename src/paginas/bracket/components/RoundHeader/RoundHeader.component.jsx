import React from 'react';
import PropTypes from 'prop-types';
import './RoundHeader.styles.scss';

const getRoundHeaderText = (round, totalRounds) => {
  if (round === totalRounds) {
    return 'Finales';
  } if (round === totalRounds - 1) {
    return 'Semi-finales';
  }
  return `Ronda ${round}`;
};
const RoundHeader = ({ round, totalRounds }) => (
  <div className={`reacket-round-header 
    ${round === totalRounds ? 'reacket-last-round' : ''}`}
  >
    {getRoundHeaderText(round, totalRounds)}
  </div>
);

RoundHeader.propTypes = {
  round: PropTypes.number.isRequired,
  totalRounds: PropTypes.number.isRequired,
};

export default RoundHeader;
