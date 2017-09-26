import React from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import SignIn from '../scenes/More/SignIn';
import Ballot from '../scenes/Ballot/Ballot';

const TabIcon = ({ selected, tabBarLabel }) => {
  return (
    <Text style={{color: selected ? 'white' :'grey'}} size={44}>{tabBarLabel}</Text>
  );
};


const App = () => {

  return (
    <Router>
      <Scene key="root">
        {/* Tab Container */}
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#515151', }}>
          <Scene key="signin"
                 hideNavBar
                 tabBarLabel={"Sign In"}
                 component={SignIn}
                 icon={TabIcon}
                 initial/>
          <Scene key="ballot"
                 hideNavBar
                 tabBarLabel={"Ballot"}
                 icon={TabIcon}
                 component={Ballot} />
        </Scene>
      </Scene>
    </Router>
  );
};


export default App;