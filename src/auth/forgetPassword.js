import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from './Login.styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class forgetPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
        }
    }

    render() {
        return (
            <View
                behavior="padding"
                style={styles.Wrapper}>
                <Text style={styles.text} onText>Forgot Password </Text>
                <TextInput
                    placeholder='Email'
                    underlineColorAndroid='white'
                    placeholderTextColor='white'
                    keyboardType='email-address'
                    style={styles.inputField}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TouchableOpacity onPress={() => this._forget()}>
                    <Text style={{ color: 'white', marginTop: 10 }}>Reset Password</Text>
                </TouchableOpacity>
            </View>
        )
    }

    validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _forget = async () => {
        this.setState({
            loading: true
        });

        if (this.state.email.trim().length == 0) {
            Alert.alert('Please enter email');
        } else if (this.validateEmail(this.state.email) == false) {
            Alert.alert('Please enter valid email');
        } else {
            await fetch('http://10.0.2.2:3000/api/auth/forgot', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // body : 
                body: JSON.stringify({
                    email: this.state.email,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        loading: false
                    }, () => {
                        console.log("response", response);
                        if (response.code == 200) {
                            Alert.alert(
                                'Alert',
                                'Your request has been sent',
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            AsyncStorage.setItem('code', response.code);
                                            AsyncStorage.setItem('message', response.message);

                                            const resetAction = StackActions.reset({
                                                index: 0,
                                                key: null,
                                                actions: [NavigationActions.navigate({ routeName: 'switchNav' })],
                                            });
                                            this.props.navigation.dispatch(resetAction);
                                        }
                                    },
                                ],
                                { cancelable: false },
                            );
                        } else {
                            this.setState({ spinner: false });
                            setTimeout(() => {
                                Alert.alert('Warning', 'Email is not registered');
                            }, 100);
                        }
                    }
                    );

                }).done();
        }
    }
}