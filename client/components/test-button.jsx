import React from 'react';
import Button from '@material-ui/core/Button';
import AppContext from '../lib/app-context';


export default class TestButton extends React.Component {
  render() {
    return (
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    );
  }
}

TestButton.contextType = AppContext;
