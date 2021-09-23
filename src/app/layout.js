import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'redux/store';
import { CALCULATOR, RECORD, SURVEY } from 'constants/routes';

import MessagesBar from './components/MessagesBar';
import Topbar from './components/Topbar';
import Record from './screens/Record';
import Calculator from './screens/Calculator';
import Survey from './screens/Survey';
import styles from './styles.module.scss';

const App = () => (
  <div className={styles.wrapper}>
    <Topbar />
    <div className={styles.container}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={CALCULATOR} component={Calculator} />
          <Route exact path={RECORD} component={Record} />
          <Route exact path={SURVEY} component={Survey} />
          <Route render={() => <Redirect to={CALCULATOR} />} />
        </Switch>
      </ConnectedRouter>
    </div>
    <MessagesBar />
  </div>
);

export default App;
