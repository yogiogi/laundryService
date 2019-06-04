import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import moment from 'moment';

export default class editProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            email: '',
            firstname: '',
            lastname: '',
            origin: '',
            loading: false
        }
    }

    componentWillMount() {
        this._loadData();
    }

    validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _loadData = async () => {
        this.setState({
            loading: true
        });
        this.state.userID = await AsyncStorage.getItem('person');
        console.log("user", this.state.userID);

        await fetch('http://10.0.2.2:3000/api/users/' + this.state.userID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    loading: false
                }, () => {
                    if (response.code == 200) {
                        this.setState({
                            email: response.email,
                            firstname: response.firstname,
                            lastname: response.lastname,
                            created_at: response.created_at.time,
                            updated_at: response.updated_at.time
                        })
                        ToastAndroid.show('Load data successed !', ToastAndroid.SHORT);
                    } else {
                        this.setState({ spinner: false });
                        setTimeout(() => {
                            Alert.alert('Warning', response.message);
                        }, 100);
                    }
                }
                );
            }).done();
    }

    _update = async () => {
        this.setState({
            loading: true
        });

        this.state.userID = await AsyncStorage.getItem('person');
        console.log("user update", this.state.userID);

        if (this.state.email.trim().length == 0) {
            Alert.alert('Please do not enter empty email');
        } else if (this.validateEmail(this.state.email) == false) {
            Alert.alert('Please enter valid email');
        } else {
            const { userID } = this.state;
            const url = `http://10.0.2.2:3000/api/users/${userID}`;
            const headers = {
                'Content-Type': 'application/json',
            };

            const today = this.state.currentDate;
            const day = moment(today).format('dddd');
            const date = moment(today).format('MMMM D, YYYY');

            const formData = {
                email: this.state.email,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                updated_at: moment(new Date()).format("YYYY-MM-DD")
            };

            fetch(url, {
                method: 'PUT',
                headers,
                cache: 'no-cache',
                body: JSON.stringify(formData)
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        loading: false
                    }, async () => {
                        console.log("response", response);
                        if (response.code == 200) {
                            await AsyncStorage.setItem('logged', '1');
                            await AsyncStorage.setItem('email', response.email);
                            await AsyncStorage.setItem('firstname', response.firstname);
                            await AsyncStorage.setItem('lastname', response.lastname);
                            await AsyncStorage.setItem('created_at', response.created_at.time);
                            await AsyncStorage.setItem('updated_at', response.updated_at.time);

                            const resetAction = StackActions.reset({
                                index: 0,
                                key: null,
                                actions: [NavigationActions.navigate({ routeName: 'switchNav' })],
                            });
                            this.props.navigation.dispatch(resetAction);
                            // ToastAndroid.show('Update data successed !', ToastAndroid.SHORT);
                        } else {
                            this.setState({ spinner: false });
                            setTimeout(() => {
                                Alert.alert('Warning', response.message);
                            }, 100);
                        }
                    }
                    );

                }).done();
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View
                behavior="padding"
                style={styles.Wrapper}>
                <Text style={{ fontSize: 23, color: 'white' }}>User Profile</Text>

                <TextInput
                    placeholder='email'
                    underlineColorAndroid='white'
                    placeholderTextColor='white'
                    keyboardType='email-address'
                    style={styles.inputField}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />

                <TextInput
                    placeholder='firstname'
                    underlineColorAndroid='white'
                    placeholderTextColor='white'
                    style={styles.inputField}
                    onChangeText={(firstname) => this.setState({ firstname })}
                    value={this.state.firstname}
                />

                <TextInput
                    placeholder='lastname'
                    underlineColorAndroid='white'
                    placeholderTextColor='white'
                    style={styles.inputField}
                    onChangeText={(lastname) => this.setState({ lastname })}
                    value={this.state.lastname}
                />

                <TouchableOpacity onPress={() => this._update()}>
                    <Text style={{ color: 'white', marginTop: 10 }}>Update</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputField: {
        width: 280,
        color: 'white',
        marginTop: 5
    },
    Wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5c0404'
    },
    text: {
        color: 'blue',
        fontSize: 23
    },
    button: {
        backgroundColor: '#1c313a',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});