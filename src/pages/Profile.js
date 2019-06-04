import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

var moment = require('moment');

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 0,
            email: 'test',
            password: 'test',
            firstname: 'test',
            lastname: 'test',
            loading: false,
        }
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
                    console.log("response", response);
                    if (response.code == 200) {
                        this.setState({
                            email: response.email,
                            password: response.password,
                            firstname: response.firstname,
                            lastname: response.lastname,
                            created_at: response.created_at.time
                        })

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

    componentWillMount() {
        this._loadData();
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View
                behavior="padding"
                style={styles.Wrapper}>
                <Text style={{ fontSize: 23, color: 'white' }}>User Profile</Text>

                <Text
                    keyboardType='email-address'
                    style={{ marginBottom: 20, fontSize: 20, color: 'white' }}>
                    {this.state.email}
                </Text>

                <Text
                    style={{ marginBottom: 20, fontSize: 20, color: 'white' }}>
                    {this.state.firstname}
                </Text>

                <Text
                    style={{ marginBottom: 20, fontSize: 20, color: 'white' }}>
                    {this.state.lastname}
                </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')}>
                    <Text style={{ color: 'white', marginTop: 10 }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={{ color: 'white', marginTop: 10 }}>Cancel</Text>
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