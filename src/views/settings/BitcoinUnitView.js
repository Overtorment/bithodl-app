import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveSettings } from '../../actions';
import headerStyles from '../../styles/headerStyles';
import BackButton from '../../components/BackButton';
import SettingsGroup from '../../components/SettingsGroup';
import SettingsOption from '../../components/SettingsOption';
import SettingsDescription from '../../components/SettingsDescription';
import StrongText from '../../components/StrongText';
import BaseSettingsView from './BaseSettingsView';
import config from '../../config';

@connect((state) => ({
  settings: state.settings
}))
export default class BitcoinUnitView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Bitcoin display unit',
    headerStyle: headerStyles.header,
    headerTitleStyle: headerStyles.title,
    headerLeft: (<BackButton onPress={() => { navigation.goBack(); }} />)
  });

  constructor(props) {
    super(...arguments);

    this.state = {
      unit: props.settings.bitcoin.unit
    };
  }

  componentWillUnmount() {
    this._save();
  }

  _save() {
    const dispatch = this.props.dispatch;
    const unit = this.state.unit || config.bitcoin.unit;

    dispatch(saveSettings({
      bitcoin: { unit }
    }));
  }

  _onSelect(unit) {
    this.setState({ unit });
  }

  render() {
    return (
      <BaseSettingsView>
        <SettingsGroup>
          <SettingsOption name='BTC' value={this.state.unit} onSelect={this._onSelect.bind(this)} />
          <SettingsOption name='mBTC' value={this.state.unit} onSelect={this._onSelect.bind(this)} isLastItem={true} />
        </SettingsGroup>

        <SettingsDescription>
          Choose the unit in which bitcoin amounts should be displayed.
        </SettingsDescription>
        <SettingsDescription>
          <StrongText>BTC</StrongText> is one bitcoin and will be displayed as ₿.
        </SettingsDescription>
        <SettingsDescription>
          <StrongText>mBTC</StrongText> is one thousandth of a bitcoin and will be displayed as m₿.
        </SettingsDescription>
      </BaseSettingsView>
    );
  }
}

BitcoinUnitView.propTypes = {
  settings: PropTypes.object,
  dispatch: PropTypes.func,
  navigation: PropTypes.any
};
