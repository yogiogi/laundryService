import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import { openDatabase } from 'react-native-sqlite-storage';
// var db = openDatabase({ name: 'laundryservice.db'});

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._loadData();

        // db.transaction(function (txn) {
        //     txn.executeSql(
        //         "SELECT name FROM sqlite_master WHERE type='table' AND name='order'",
        //         [],
        //         function (tx, res) {
        //             console.log('item:', res.rows.length);
        //             if (res.rows.length == 0) {
        //                 txn.executeSql('DROP TABLE IF EXISTS order', []);
        //                 txn.executeSql(
        //                     'CREATE TABLE IF NOT EXISTS order(order_id INTEGER PRIMARY KEY AUTOINCREMENT,'+ 
        //                     'task VARCHAR(20), packet VARCHAR(20), price VARCHAR(10))',
        //                     []
        //                 );
        //             }
        //         }
        //     );
        // });
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#5c0404" />
                <StatusBar barStyle="default" />
            </View>
        )
    }

    _loadData = async () => {
        const logged = await AsyncStorage.getItem('logged');
        this.props.navigation.navigate(logged !== '1' ? 'Auth' : 'App');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    }
});