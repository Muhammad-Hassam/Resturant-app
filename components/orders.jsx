import React from 'react';
import { View, StyleSheet, StatusBar ,Text} from 'react-native'
import { Card, Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

import {Header} from 'react-native-elements';

// import { auth } from "../config/firebase";

export default function Orders({navigation}) {
 

    // const handleStudent = () => {
    //     if (auth===true){
    //     navigation.navigate('StudentDashboard')
    //     }
    //     else{
    //     navigation.navigate('Login')
    //     }
    // } 
    // const handleComapny = () => {
    //         navigation.navigate('CompanyLoginForm')
    // }
    // const handleAdmin= () => {
    //         navigation.navigate('AdminLogin')
    // }


    return (
        <>
        <Header
        style={{paddingTop:30}}
  leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
  centerComponent={{ text: 'Resturant App', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
        <View style={styles.container}>
            <ScrollView>
        <View style={styles.main}>
          <Text style={styles.breakfast}>BreakFast</Text>
            <Card 
            containerStyle={{ paddingTop:20, paddingBottom:20, paddingLeft: 10, paddingRight:10,borderRadius:30 }} >
                <Card.Title>Sushi</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 50, width: 200 }} source={require('../assets/breakfast.png')}></Card.Image>
                <Text style={styles.price}>Price: 3700Rs</Text>
                <Text style={{textAlign:'center'}}>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                    title='+'
                    // onPress={handleStudent} 
                />
                <Text style={{fontSize:50}}>1</Text>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10 ,paddingLeft:10, paddingRight:10 }}
                    title='-'
                    // onPress={handleStudent} 
                />
                </Text>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                    title='AddtoCart'
                    // onPress={handleStudent} 
                />
            </Card>
           
      
        </View>
        </ScrollView>
        </View>
        </>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
      marginTop:20,
      marginBottom:20,
     alignItems: 'center',
    justifyContent: 'center',
    },
    breakfast:{
      fontSize:30,
      textDecorationLine:'underline',  
    },
    price:{
       textAlign:'left',
       marginTop:20,
       marginBottom:10,
    }
    
   
});
