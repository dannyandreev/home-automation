import React from 'react';
import Redirect from '../components/redirect';
import TestButton from '../components/test-button';
import MainConsole from '../components/main-console';
import AppContext from '../lib/app-context';


export default class Home extends React.Component {
  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <div>
        {/* <PageContainer> */}
        <MainConsole></MainConsole>
        {/* //</PageContainer> */}
      </div>
    );
  }
}

Home.contextType = AppContext;
