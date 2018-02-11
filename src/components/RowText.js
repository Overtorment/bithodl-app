import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import StyledText from './StyledText';
import DateString from './DateString';

const windowDimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  text: {
    fontSize: windowDimensions.width < 330 ? 11 : 13,
    fontWeight: '400',
    lineHeight: 18,
    color: '#8F8E94'
  }
});

export default class RowText extends Component {
  render() {
    const unlockDate = moment.unix(this.props.item.unlockAt);
    const now = moment();

    return (
      <StyledText style={styles.text}>
        { unlockDate <= now ? 'Ended' : 'Until' } <DateString date={unlockDate} style={styles.text} />
      </StyledText>
    );
  }
}

RowText.propTypes = {
  item: PropTypes.object.isRequired
};
