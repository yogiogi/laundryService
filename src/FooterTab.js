import React, {Component} from 'react';
import {Footer, FooterTab, Icon, Text, Button} from 'native-base';
import { StyleSheet, Image } from 'react-native';

export default class FooterNav extends Component{
    render(){
        return(
            <Footer>
                <FooterTab style={style.bg}>
                    <Button vertical onPress={()=>this.props.navigation.navigate('yourorder')}>
                        <Text>Order</Text>
                    </Button>
                </FooterTab>
            </Footer>   
        )
    }
}

const style = StyleSheet.create({
    bg:{
        backgroundColor: 'white',
        elevation:1 
    }
})