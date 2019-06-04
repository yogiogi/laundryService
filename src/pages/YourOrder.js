import React, { Component } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Image, Button, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import UIStepper from 'react-native-ui-stepper';
// import { List, Checkbox } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Thumbnail } from 'native-base';

export default class YourOrder extends React.Component{
  constructor(){
    super();
    this.state = {
        cucikeringgosok: 10000,
        cucikeringkipat: 7000,
        jasasetrika: 3000,
        koperbesar: 120000,
        koper: 90000,
        loading: false
    }
}

  setValue = (value) => {
    // do something with value
  }
  
  handleCount(){

  }

    render() {
      return (
        <View>
            <Collapse style={{borderBottomWidth:1,borderTopWidth:1}}>
              <CollapseHeader style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#E6E6E6'}}>
                <View style={{width:'25%',alignItems:'center'}}>
                  {/* <Thumbnail source={{''}} /> */}
                </View>
                <View>
                  <Text>Daily Kiloan</Text>
                </View>
              </CollapseHeader>
              <CollapseBody style={{flexDirection:'column', backgroundColor:'#powderblue'}}>
              {/* cuci kering gosok */}
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1,flexDirection:'column'}} >
                        <Text placeholder='cucigosok'>Cuci Kering Gosok</Text>
                        <Text style={styles.welcome}>10.000/kg</Text>
                  </View>
                  <View style={{height: 50, flexDirection:'row', alignItems:'baseline'}} >
                        <UIStepper
                            displayValue  
                            onValueChange={(value) => { this.setValue(value) }}
                        />
                  </View>
                </View>
                {/* Cuci kering lipat */}
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1,flexDirection:'column'}} >
                        <Text placeholder='cucilipat'>Cuci Kering Lipat</Text>
                        <Text style={styles.welcome}>7.000/kg</Text>
                  </View>
                  <View style={{height: 50, flexDirection:'row', alignItems:'baseline'}} >
                        <UIStepper
                            displayValue  
                            onValueChange={(value) => { this.setValue(value) }}
                        />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1,flexDirection:'column'}} >
                        <Text placeholder='jasasetrika'>Jasa Setrika</Text>
                        <Text style={styles.welcome}>3.000/kg</Text>
                  </View>
                  <View style={{height: 50, flexDirection:'row', alignItems:'baseline'}} >
                        <UIStepper
                            displayValue  
                            onValueChange={(value) => { this.setValue(value) }}
                        />
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
            {/* Bags & Shoes */}
            <Collapse style={{borderBottomWidth:1,borderTopWidth:1}}>
              <CollapseHeader style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#E6E6E6'}}>
                <View style={{width:'25%',alignItems:'center'}}>
                  {/* <Thumbnail source={{''}} /> */}
                </View>
                <View>
                  <Text>Bags & Shoes</Text>
                </View>
              </CollapseHeader>
              <CollapseBody style={{flexDirection:'column', backgroundColor:'#powderblue'}}>
              {/* cuci kering gosok */}
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1,flexDirection:'column'}} >
                        <Text placeholder='koperbesar'>Koper Besar</Text>
                        <Text style={styles.welcome}>120.000/kg</Text>
                  </View>
                  <View style={{height: 50, flexDirection:'row', alignItems:'baseline'}} >
                        <UIStepper
                            displayValue  
                            onValueChange={(value) => { this.setValue(value) }}
                        />
                  </View>
                </View>
                {/* Cuci kering lipat */}
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1,flexDirection:'column'}} >
                        <Text placeholder='koper'>Koper</Text>
                        <Text style={styles.welcome}>90.000/kg</Text>
                  </View>
                  <View style={{height: 50, flexDirection:'row', alignItems:'baseline'}} >
                        <UIStepper
                            displayValue  
                            onValueChange={(value) => { this.setValue(value) }}
                        />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1,flexDirection:'column'}} >
                        <Text placeholder='koperkecil'>Koper Kecil</Text>
                        <Text style={styles.welcome}>60.000/kg</Text>
                  </View>
                  <View style={{height: 50, flexDirection:'row', alignItems:'baseline'}} >
                        <UIStepper
                            displayValue  
                            onValueChange={(value) => { this.setValue(value) }}
                        />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1,flexDirection:'column'}} >
                        <Text placeholder='sandal'>Sandal</Text>
                        <Text style={styles.welcome}>15.000/kg</Text>
                  </View>
                  <View style={{height: 50, flexDirection:'row', alignItems:'baseline'}} >
                        <UIStepper
                            displayValue  
                            onValueChange={(value) => { this.setValue(value) }}
                        />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1,flexDirection:'column'}} >
                        <Text placeholder='sepatu'>Sepatu Nylon, Canvas, Rubber</Text>
                        <Text style={styles.welcome}>35.000/kg</Text>
                  </View>
                  <View style={{height: 50, flexDirection:'row', alignItems:'baseline'}} >
                        <UIStepper
                            displayValue  
                            onValueChange={(value) => { this.setValue(value) }}
                        />
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
          </View>        
      );
    }
}

const styles = StyleSheet.create ({
    contentContainer: {
        paddingVertical: 20
      }
   })