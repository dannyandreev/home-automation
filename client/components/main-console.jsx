import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Tab, Tabs, AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppContext from '../lib/app-context';
import TestButton from './test-button';
import makeGraph from './graph'

function TabPanel(props) {
  const { children, value, index } = props;
  if(index===0){
    return (
      <div>
        {
          value === index ? makeGraph() : ''
        }
      </div>
    );
  } else if (index === 1) {
    return (
      <div>
        {
          value === index ? <h1 className="text-mint">{children}</h1> : ''
        }
      </div>
    );
  } else if (index === 2) {
    return (
      <div>
        {
          value === index ? <h1 className="text-mint">{children}</h1> : ''
        }
      </div>
    );
  }


}

export default class MainConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    console.log(value)
    this.setState({value: value})
    return(value)
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Graph" index={0}/>
            <Tab label="Control" index={1}/>
            <Tab label="View" index={2}/>
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>Graph</TabPanel>
        <TabPanel value={this.state.value} index={1}>Control</TabPanel>
        <TabPanel value={this.state.value} index={2}>View</TabPanel>
      </div>
    );
  }
}

MainConsole.contextType = AppContext;
