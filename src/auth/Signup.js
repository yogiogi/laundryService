import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordConfirm: '',
            loading: false,
        }
    }

    validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _signup = async () => {
        this.setState({
            loading: true
        });

        const { password, passwordConfirm } = this.state;


        if (this.state.email.trim().length == 0) {
            Alert.alert('Please do not enter empty email');
        } else if (this.validateEmail(this.state.email) == false) {
            Alert.alert('Please enter valid email');
        } else if (this.state.firstname == false) {
            Alert.alert('Please do not enter empty firstname');
        } else if (this.state.lastname == false) {
            Alert.alert('Please do not enter empty lastname');
        } else if (this.state.password.trim().length < 5) {
            Alert.alert('Password minimum is 5');
        } else if (this.state.password.trim().length == 0) {
            Alert.alert('Please do not enter empty password');
        } else if (password !== passwordConfirm) {
            alert("Passwords don't match");
        } else if (this.state.passwordConfirm.trim().length < 5) {
            Alert.alert('Password minimum is 5');
        } else if (this.state.passwordConfirm.trim().length == 0) {
            Alert.alert('Please do not enter empty password confirmation')
        } else {
            await fetch('http://10.0.2.2:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // body : 
                body: JSON.stringify({
                    email: this.state.email,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    password: this.state.password,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        loading: false
                    }, () => {
                        console.log("response", response);
                        if (response.code == 201) {
                            setTimeout(() => {
                                Alert.alert('Done', response.message);
                            }, 100);

                            const resetAction = StackActions.reset({
                                index: 0,
                                key: null,
                                actions: [NavigationActions.navigate({ routeName: 'switchNav' })],
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

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View
                behavior="padding"
                style={styles.Wrapper}>
                <Text style={{ fontSize: 23, color: 'white' }}>Sign up</Text>

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

                <TextInput
                    placeholder='password'
                    underlineColorAndroid='white'
                    placeholderTextColor='white'
                    secureTextEntry={true}
                    style={styles.inputField}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />

                <TextInput
                    placeholder='password confirmation'
                    underlineColorAndroid='white'
                    placeholderTextColor='white'
                    secureTextEntry={true}
                    style={styles.inputField}
                    onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
                    value={this.state.passwordConfirm}
                />
                {/* {
                    this.state.passwordConfirm.length === this.state.password || (
                        this.state.passwordConfirm === this.state.password || (
                            <Text style={{ color: 'red', fontSize: 10 }}>error password</Text>
                        ))
                } */}

                <TouchableOpacity onPress={() => this._signup()}>
                    <Text style={{ color: 'white', marginTop: 10 }}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{ color: 'white', marginTop: 10 }}>Login</Text>
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
        backgroundColor: '#82D4E3'
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