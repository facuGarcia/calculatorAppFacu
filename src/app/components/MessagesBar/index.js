/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import { UTLabel } from '@widergy/energy-ui';
import { connect } from 'react-redux';

import styles from './styles.module.scss';

const MessagesBar = ({ message }) => {
  const [showMessage, setshowMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handler = useCallback(() => setshowMessage(false), []);

  useEffect(() => setshowMessage(true), [message]);

  useEffect(() => {
    if (showMessage) {
      if (timeoutId) window.clearTimeout(timeoutId);
      setTimeoutId(window.setTimeout(handler, 3000));
    }
  }, [showMessage, message]);

  return (
    <div className={`${styles.showMessage} ${!showMessage && styles.hiddenMessage}`}>
      <UTLabel bold large white>
        {message}
      </UTLabel>
    </div>
  );
};

const mapStateToProps = state => ({ message: state.operationsRecord.messagesRecord.message });

export default connect(mapStateToProps)(MessagesBar);
