import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import marker from '../assets/marker.png';

const latitudeDelta = 0.025
const longitudeDelta = 0.025

class petalokasi extends React.Component {
  state = {
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: 25.1948475,
      longitude: 55.2682899
    }
  }

  onRegionChange = region => {
    this.setState({
      region
    })
  }

  render() {
    const { region } = this.state

    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChange}
        />
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>
        <SafeAreaView style={styles.footer}>
          <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }
});

export default petalokasi;