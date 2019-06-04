import React, { Component } from 'react';
import {
  View, FlatList, ScrollView, Text, Button, StyleSheet, Image, ListView, ActivityIndicator,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';

import UIStepper from 'react-native-ui-stepper';
import { CONTENT, taskItem } from '../Data';
import styles from './ExpandableItem.style';

function getIndexByProperty(data, key, value) {
  for (var i = 0; i < data.length; i++) {
    if (data[i][key] == value) {
      return i;
    }
  }
  return -1;
}

export default class ExpandableItemComponent extends Component {
  state = {
    CONTENT,
  }
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
      value: 0,
      totalcost: 0,
    };
  }

  valueChanged(packet, task, price, value) {
    console.log("packet ", packet);
    console.log("task ", task);
    console.log("price ", price);
    console.log("value ", value);

    const nextValue = Number(value.toFixed(2));
    this.setState({ value: nextValue });
    console.log("value ", value);
    this.state.totalcost = value;
    console.log("totalcost ", this.state.totalcost);

    this.addItem(packet, task, price, value);
  }

  addItem(packet, task, price, quantity) {
    var totalQuantity = 0;
    var totalPrice = 0;

    var updatedValue = {
      packet: packet,
      task: task,
      price: price,
      quantity: quantity
    };

    var index = getIndexByProperty(taskItem.data, 'task', task);
    taskItem.data[index] = updatedValue;
    console.log("task index", index);

    for (var i = 0; i < taskItem.data.length; i++) {
      totalQuantity += taskItem.data[i].quantity;
      totalPrice += taskItem.data[i].price;

      console.log('total', totalQuantity)
      console.log('prprice', totalPrice)
    }

    this.props.updateQuantity(totalQuantity);
    this.props.updateTotal(totalPrice);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={styles.headerText}>{this.props.item.packet}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: '#fff',
          }}>
          {this.props.item.category.map((item, key) => (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'column' }} >
                <Text>{item.task}</Text>
                <Text>{item.display}</Text>
              </View>
              <View style={{ height: 50, flexDirection: 'row', alignItems: 'baseline' }} >
                <UIStepper
                  displayValue
                  onValueChange={(value) => this.valueChanged(this.props.item.packet, item.task, value * parseInt(item.price), value)}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

