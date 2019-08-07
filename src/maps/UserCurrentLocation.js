import React, { Component } from 'react';

import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, ProviderPropType } from 'react-native-maps';


class UserCurrentLocation extends React.Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  }
  watchID: ?number = null;
  // componentDidMount = () => {
  //   this.getLocation();
  // }

  // getLocation() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const initialPosition = JSON.stringify(position);
  //       this.setState({ initialPosition });
  //     },
  //     (error) => alert(error.message),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );

  // }

  getCurrentPos() {
    navigator.geolocation.clearWatch(this.watchID);

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });
  }

  // componentWillUnmount = () => {

  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boldText}>
          Initial position:
           </Text>

        <Text>
          {this.state.initialPosition}
        </Text>

        <Text style={styles.boldText}>
          Current position:
           </Text>

        <Text>
          {this.state.lastPosition}
        </Text>

        <TouchableOpacity onPress={() => this.getCurrentPos()}>
          <Text>
            Touch me!
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  boldText: {
    fontSize: 30,
    color: 'red',
  }
})
export default UserCurrentLocation;