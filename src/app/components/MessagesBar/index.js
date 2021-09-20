/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { UTLabel } from '@widergy/energy-ui';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

const MessagesBar = ({ message }) => {
  const [showMessage, setshowMessage] = useState(false);

  useEffect(() => {
    setshowMessage(true);
  }, [message]);

  useEffect(() => {
    if (showMessage) setTimeout(() => setshowMessage(false), 4000);
  }, [showMessage]);

  return (
    <div className={showMessage ? styles.showMessage : styles.hiddenMessage}>
      <UTLabel bold large white>
        {message}
      </UTLabel>
    </div>
  );
};

const mapStateToProps = state => ({ message: state.operationsRecord.messagesRecord.message });

export default connect(mapStateToProps)(MessagesBar);
