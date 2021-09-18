/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { UTLabel } from '@widergy/energy-ui';
import { connect } from 'react-redux';

import logo from 'app/assets/logoBlanco.png';

import styles from './styles.module.scss';

class MessagesBar extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <UTLabel bold large white>
          {this.props.message}
        </UTLabel>
        <img alt="logo" src={logo} className={styles.logo} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ message: state.operationsRecord.messagesRecord.message });

export default connect(mapStateToProps)(MessagesBar);
