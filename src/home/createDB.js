import React from 'react';
import { View } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'OrderDatabase.db' });

export default class createDB extends React.Component {

    constructor(props) {
      super(props);
      db.transaction(function(txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='order'",
          [],
          function(tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS order', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS order(order_id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), packet VARCHAR(20), price VARCHAR(10))',
                []
              );
            }
          }
        );
      });
    }

}