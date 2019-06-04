import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class Home extends Component{
    logout(){
        var {dispatch, navigate} = this.props.navigation;
        const reset = NavigationActions.reset({
            index:0,
            key:null,
            actions:[
                NavigationActions.navigate({
                    routeName:'SignedOut'
                })
            ]
        });
        dispatch(reset);
    }

    render(){
    return(
        <View>
            <Text>Halaman satu</Text>
            <TouchableOpacity onPress={this.logout.bind(this)}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )}
}