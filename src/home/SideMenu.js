import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle} onPress={this.navigateToScreen('Profile')}>
              User Profile
            </Text>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Order')}>
                Order
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('about')}>
                about
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={styles.navItemStyle} onPress={this._logout}>
            Log Out
          </Text>
        </View>
      </View>
    );
  }

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;