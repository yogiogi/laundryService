import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import { Text } from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from './Login.styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View
                behavior="padding"
                style={styles.Wrapper}>

                <TextInput
                    placeholder='email'
                    underlineColorAndroid='white'
                    placeholderTextColor='#82D4E3'
                    style={styles.inputField}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    placeholder='password'
                    underlineColorAndroid='white'
                    placeholderTextColor='#82D4E3'
                    secureTextEntry={true}
                    style={styles.inputField}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />

                <View style={styles.ButtonContainer}>
                    <TouchableOpacity onPress={() => this._signin()}>
                        <Text style={{ color: 'white', marginTop: 10 }}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                            <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Forget')}>
                            <Text style={{ color: 'white', marginTop: 10, textAlign: 'right', fontSize: 12 }}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _signin = () => {
        this.setState({
            loading: true
        });

        if (this.state.email.trim().length == 0) {
            Alert.alert('Please enter email');
        } else if (this.validateEmail(this.state.email) == false) {
            Alert.alert('Please enter valid email');
        } else if (this.state.password.trim().length == 0) {
            Alert.alert('Please enter password');
        } else {
            fetch('http://10.0.2.2:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // body : 
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        loading: false
                    }, async () => {
                        console.log("response", response);
                        if (response.code == 200) {
                            console.log("oke passing");
                            await AsyncStorage.setItem('logged', '1');
                            this.props.navigation.navigate('App');
                            await AsyncStorage.setItem('person', (response.data.user.id).toString());
                            await AsyncStorage.setItem('email', response.data.user.email);
                            await AsyncStorage.setItem('firstname', response.data.user.firstname);
                            await AsyncStorage.setItem('lastname', response.data.user.lastname);
                            await AsyncStorage.setItem('created_at', response.data.user.created_at);

                            await AsyncStorage.setItem('token', response.data.token);
                            console.log("TOKEN ", response.data.token);

                            const resetAction = StackActions.reset({
                                index: 0,
                                key: null,
                                actions: [NavigationActions.navigate({ routeName: 'screen' })],
                            });
                            this.props.navigation.dispatch(resetAction);
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
}