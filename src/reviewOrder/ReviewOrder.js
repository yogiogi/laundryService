import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    UIManager,
    Platform
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import styles from './ReviewOrder.style';
import { taskItem } from '../Data';

export default class ReviewOrder extends Component {
    constructor() {
        super()
        this.state = {
            date: "15-05-2018",
            address: '',
            notes: '',
            notesOrder: '',
            detailOrder: '',
            listDataSource: taskItem,
        };
        console.log("taskItem ", taskItem);
    }

    componentDidMount() {
        const data = this.state.listDataSource.data.filter(item => item.quantity > 0)
        console.log("data ", data);
    }

    render() {
        return (
            <ScrollView style={[styles.container]}>
                <View style={[styles.boxHeader]}>
                    <Text style={styles.textHeader}>Pickup Location</Text>
                </View>
                <View style={[styles.boxDetail]}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                        <Text style={styles.textAlamat}
                            value={this.state.address}
                        >
                        </Text>
                    </TouchableOpacity>
                    <TextInput style={[styles.InputNotes]}
                        placeholder="notes"
                        value={this.state.notes}
                        onChangeText={notes => this.setState({ notes })}
                    />
                </View>
                <View style={[styles.boxHeader]}>
                    <Text style={styles.textHeader}>Your Orders</Text>
                </View>
                <View style={[styles.boxDetail]}>
                    <ScrollView>
                        {this.state.listDataSource.data
                            .filter((item) => item.quantity > 0)
                            // .filter((item) => item.packet)
                            .map((item, key) => (
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={styles.detailList} >
                                        <Text>{item.task}</Text>
                                        <Text>{item.quantity}</Text>
                                    </View>
                                    <View>
                                        <TextInput style={[styles.InputNotes]}
                                            placeholder="notes"
                                            value={this.state.notesOrder}
                                            onChangeText={notesOrder => this.setState({ notesOrder })}
                                        />
                                    </View>
                                </View>
                            ))}
                    </ScrollView>
                </View>
                <View style={[styles.boxHeader]}>
                    <Text style={[styles.textHeader]}>Pickup Schedule</Text>
                    <Text style={styles.textHeaderSub}>Pickup time</Text>
                </View>
                <View style={[styles.boxDetail]}>
                    <DatePicker
                        date={this.state.date} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate="01-01-2016"
                        maxDate="31-12-2030"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36

                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                </View>
                <View style={[styles.boxHeader]}>
                    <Text style={styles.textHeaderSub}>Delivery time</Text>
                </View>
                <View style={[styles.boxDetail]}>
                    <DatePicker
                        date={this.state.date} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate="01-01-2016"
                        maxDate="31-12-2030"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36

                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                </View>
                <View style={[styles.boxHeader]}>
                    <Text style={styles.textHeader}>How do you want to pay?</Text>
                </View>
                <View style={[styles.boxDetail]}>
                    <Text style={styles.textHeader}>Payment Gateway</Text>
                </View>
                <View style={[styles.boxHeader]}>
                    <Text style={styles.textHeader}>Payment Details</Text>
                </View>
                <View style={[styles.boxDetail]}>
                
                </View>
            </ScrollView >
        );
    }
}