import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import App from './src/js/scenes/Main/AppOld'

class WeVote extends Component{
  render(){
    return(
      <App/>
      );
  }
}

AppRegistry.registerComponent('WeVoteReactNative', () => App);
