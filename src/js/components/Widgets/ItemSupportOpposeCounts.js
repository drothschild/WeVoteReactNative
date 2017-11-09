import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from "react-native";

export default class ItemSupportOpposeCounts extends Component {
  static propTypes = {
    supportProps: PropTypes.object
  };

  constructor (props) {
    super(props);
    this.state = { supportProps: this.props.supportProps };
  }

  componentWillReceiveProps (nextProps){
    this.setState({supportProps: nextProps.supportProps});
  }

  percentageMajority (){
    const {support_count, oppose_count} = this.state.supportProps;
    return Math.round(100 * Math.max(support_count, oppose_count) / (support_count + oppose_count));
  }

  render () {

    if (this.state.supportProps === undefined){
      return null;
    }

    var {support_count, oppose_count, is_support, is_oppose } = this.state.supportProps;
    if (support_count === undefined || oppose_count === undefined || is_support === undefined || is_oppose === undefined){
      return null;
    }

    var barStyle = {
      width: this.percentageMajority() + "%"
    };

    var emptyBarStyle = {
      borderWidth: 0
    };

    var isEmpty = support_count === 0 && oppose_count === 0;

    var isSupportAndOppose = support_count !== 0 && oppose_count !== 0;

    var isMajoritySupport = support_count >= oppose_count;

    var backgroundBarClassName;
    if (isSupportAndOppose && isMajoritySupport) {
      // If there are both support and oppose positions, change the color of the bar background to the minority position
      backgroundBarClassName = "network-positions__bar-well red-bar";
    } else if (isSupportAndOppose && !isMajoritySupport) {
      // If there are both support and oppose positions, change the color of the bar background to the minority position
      backgroundBarClassName = "network-positions__bar-well green-bar";
    } else {
      backgroundBarClassName = "network-positions__bar-well";
    }

    return <View style={{flexDirection: 'row', justifyContent: 'space-between'}} className="network-positions">
      {/*<View className="network-positions__bar-label">
        {!isEmpty ?
          "Positions in your network" :
          "No positions in your network"
        }
      </View>*/}
      <View className="network-positions__support">
        {/* 9/27/16 hack
        <Image source={!isEmpty && isMajoritySupport ? require("../../../img/global/icons/up-arrow-color-icon@2x.png") : require("../../../img/global/icons/up-arrow-gray-icon@2x.png")} className="network-positions__support-icon u-push--xs" width="20" height="20" />
        */}
        <View className="network-positions__count">
          <Text>{!isEmpty ? support_count : null}</Text>
          <Text className="sr-only"> Support</Text>
        </View>
      </View>
      <View className={backgroundBarClassName}>
        { isMajoritySupport ?
          <View className="network-positions__bar network-positions__bar--majority network-positions__bar--support" style={!isEmpty ? barStyle : emptyBarStyle}>
            <Text className="sr-only">{this.percentageMajority()}% Supports</Text>
          </View> :
          <View className="network-positions__bar network-positions__bar--majority network-positions__bar--oppose" style={!isEmpty ? barStyle : emptyBarStyle}>
            <Text className="sr-only">{this.percentageMajority()}% Supports</Text>
          </View>
        }
      </View>

      <View className="network-positions__oppose">
        <View className="network-positions__count u-push--xs">
          {!isEmpty ? oppose_count : null}
          <Text className="sr-only"> Oppose</Text>
        </View>
        {/* 9/27/16 hack

        <Image source={!isEmpty && !isMajoritySupport ? require("../../../img/global/icons/down-arrow-color-icon@2x.png") : require("../../../img/global/icons/down-arrow-gray-icon@2x.png")} className="network-positions__oppose-icon" width="20" height="20" />
        */}
      </View>
    </View>;
  }
}
