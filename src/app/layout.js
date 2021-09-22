import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'redux/store';
import { CALCULATOR, RECORD, SURVEY } from 'constants/routes';

import MessagesBar from './components/MessagesBar';
import Topbar from './components/Topbar';
import RecordLayout from './screens/Record';
import CalculatorLayout from './screens/Calculator';
import SurveyLayout from './screens/Survey';
import styles from './styles.module.scss';

const App = () => (
  <div>
    <div className={styles.wrapper}>
      <Topbar />
      <div className={styles.container}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path={CALCULATOR} component={CalculatorLayout} />
            <Route exact path={RECORD} component={RecordLayout} />
            <Route exact path={SURVEY} component={SurveyLayout} />
            <Route render={() => <Redirect to={CALCULATOR} />} />
          </Switch>
        </ConnectedRouter>
      </div>
    </div>
    <MessagesBar />
  </div>
);

export default App;
