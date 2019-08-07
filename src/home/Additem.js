import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { List, Checkbox } from 'react-native-paper';

import ExpandableItemComponent from './ExpandableItemComponent'
import { CONTENT } from '../Data';
import styles from './Additem.style';

export default class Additem extends React.Component {

  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      listDataSource: CONTENT,
      totalquantity: 0,
      totalprice: 0,
      username: null,
      showBar: false,
    };
  }

  _renderBar() {
    if (this.state.totalquantity > 0) {
      return (
        <View style={styles.row}>
          <View style={styles.boxPrice}>
            <Text style={styles.textTitle}>
              Total Price
            </Text>
            <Text style={styles.textPrice}>
              Rp {this.state.totalprice}
            </Text>
          </View>
          <View style={styles.boxReview}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewOrder')}>
              <Text style={{
                color: 'white',
                paddingLeft: 10
              }}> Proceed to Pay >> </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  componentDidMount() {
    this._loadData();
  }

  _loadData = async () => {
    const value = await AsyncStorage.getItem('firstname');
    console.log("user", value);
    this.setState({ username: value });
  }

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array[index]['isExpanded'] = !array[index]['isExpanded'];
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };

  onUpdateQuantity = (val) => {
    console.log(typeof val);
    console.log("valq", val);
    this.setState({ totalquantity: val });
  }

  onUpdateTotal = (val) => {
    console.log("valt", val);
    this.setState({ totalprice: val });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sect1}>
          <Text style={styles.textSect1} onText>Halo, {this.state.username} </Text>
          <Text style={styles.textSect1}>Saldo Wallet anda </Text>
        </View>

        <View style={[styles.box, styles.box2]}>
          <ScrollView>
            {this.state.listDataSource.map((item, key) => (
              <ExpandableItemComponent
                key={item.packet}
                onClickFunction={this.updateLayout.bind(this, key)}
                item={item}
                updateTotal={this.onUpdateTotal}
                updateQuantity={this.onUpdateQuantity}
              />
            ))}
          </ScrollView>
        </View>
        {this._renderBar()}
      </View>
    );
  }
}