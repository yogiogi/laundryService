import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import Additem from './home/Additem';
import Profile from './pages/Profile';
import editProfile from './pages/editProfile';
import About from './pages/About';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ReviewOrder from './reviewOrder/ReviewOrder';
import Maps from './maps/petalokasi';
// import Order from './pages/order';
import authloading from './pages/AuthLoadingScreen';
import forget from './auth/forgetPassword';

import SideMenu from './home/SideMenu';
import stackNav from './home/stacknav';
import { Icon } from 'native-base';
import Payment from './payment/payment';
import mapViw from './maps/MapScreen';

const AppStack = createStackNavigator({
  Home: {
    screen: Additem,
    navigationOptions: { header: null }
  },
})

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'SignIn',
      header: null
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'SignUp',
      header: null
    }
  },
  Forget: {
    screen: forget,
    navigationOptions: { header: null }
  },
  Profile: {
    screen: Profile,
    navigationOptions: { header: null }
  },

  editProfile: {
    screen: editProfile,
    navigationOptions: { header: null }
  }
})

const DashboardStackNavigator = createStackNavigator(
  {
    App: AppStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  DashboardStack: {
    screen: DashboardStackNavigator,
    navigationOptions: { header: null }
  }
}, {
    contentComponent: SideMenu,
    drawerPosition: 'left',
  });

const switchNav = createSwitchNavigator(
  {
    AuthLoad: authloading,
    Auth: AuthStack,
    Appdrawer: { screen: AppDrawerNavigator },
  }, {
    initialRouteName: 'AuthLoad'
  }
)

const FitureStack = createStackNavigator({
  switchNav: {
    screen: switchNav,
    navigationOptions: { header: null }
  },
  About: About,
  ReviewOrder: ReviewOrder,
  Maps: Maps,
  Payment: Payment,
})

const AppContainer = createAppContainer(FitureStack);
export default AppContainer;