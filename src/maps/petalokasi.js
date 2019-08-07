import React, { Component } from 'react';
import { AppRegistry, Image, SafeAreaView, StyleSheet, View, Dimensions, Text, Button, TouchableOpacity } from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import marker from '../assets/marker.png';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoder';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.025;
const LONGITUDE_DELTA = 0.025;
const API_KEY = 'AIzaSyDVXqACBgleqMnzaGA7E5cgl0T5_54LqzU';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

class petalokasi extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapMargin: 1,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      address: null
    };
  }

  setMargin = () => {
    this.setState({ mapMargin: 15 });
  }

  componentDidMount() {
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        });
      }
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  onRegionChange = region => {
    this.setState({
      region
    })
  }

  onGoBack = (someDataFromModal) => {
    console.log(someDataFromModal);
  }

  geolocation(lat, lng) {
    console.log(lat);
    console.log(lng);
    var loc = {
      lat: lat,
      lng, lng
    };

    Geocoder.geocodePosition(loc).then(res => {
      this.setState({
        address: res[0].formattedAddress
      })

      console.log(res[0].formattedAddress);
      return res[0].formattedAddress;
    })
      .catch(err => console.log(err))
  }

  // getAddress(lat, long) {
  //   let apiKey = 'myKey'
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${long}&key=${apiKey}`)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       const address = responseJson.results[0].formatted_address;
  //       this.setState({ address })
  //     });
  // }

  render() {
    return (
      <View style={styles.map}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1, marginTop: this.state.mapMargin }}
          onMapReady={this.setMargin}
          showsUserLocation={true}
          showsMyLocationButton={true}
          Region={this.state.region}
          onRegionChange={region => this.setState({ region })}
          onRegionChangeComplete={region => this.setState({ region })}
        />
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>
        <SafeAreaView style={styles.footer}>
          <Text style={styles.region}>
            {this.geolocation(this.state.region.latitude, this.state.region.longitude)}
          </Text>
        </SafeAreaView>

        <View style={styles.bottomView} >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewOrder', { text: this.state.address } )}>
            <Text style={styles.textStyle}>Save Location</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  markerFixed: {
    flex: 1,
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
    position: 'absolute',
    bottom: 0
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  },
  boxReview: {
    flex: 1,
    backgroundColor: '#82D4E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  textStyle: {
    color: '#fff',
    fontSize: 22
  }
});

export default petalokasi;