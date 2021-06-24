import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Text,Alert} from 'react-native'
import { Card, Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Head from './header';
import { useCard } from "../config/context";
import {database} from '../config/firebase'


export default function Home({navigation}) {
  const {data,setdata}=useCard();


  useEffect(() => {
    database.ref("/Food").child('items').on('value', snapshot => {
      if(snapshot.exists()){
      setdata(Object.values((snapshot.val())))
      }
      else{
      setdata([])
      }
    })
}, [])
    const handlebreakfast = () => {
        
        navigation.navigate('Breakfast')
    } 
    const handleLunch = () => {
            navigation.navigate('Lunch')
    }
    const handleDinner= () => {
            navigation.navigate('Dinner')
    }
   


    return (
        <>
  <Head/>
        <View >

            <ScrollView>
        <View style={styles.main}>
          
            <Card 
            containerStyle={{ paddingTop:20, paddingBottom:20,borderRadius:30 }} >
                <Card.Title>Breakfast</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 50, width: 260,height:260 }} source={require('../assets/breakfast.png')}></Card.Image>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                    title='Breakfast'
                    onPress={handlebreakfast} 
                    />
            </Card>
         
            <Card 
             containerStyle={{ paddingTop:20, paddingBottom:20,borderRadius:30 }} >
                <Card.Title>Lunch</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 50, width: 260,height:260 }} source={require('../assets/lunch.png')}></Card.Image>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10  }}
                    title='Lunch'
                    onPress={handleLunch}
                    />
                    
            </Card>

            <Card 
             containerStyle={{ paddingTop:20, paddingBottom:20, paddingLeft: 10, paddingRight:10,borderRadius:30, marginBottom:70 }} >
                <Card.Title>Dinner</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 50, width: 260,height:260 }} source={require('../assets/dinner.png')}></Card.Image>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10  }}
                    title='Dinner'
                    onPress={handleDinner}
                    />
                    
            </Card>
           
          
      
        </View>
        </ScrollView>

        </View>
        </>
    );
}
const styles = StyleSheet.create({
 
    main: {
      marginTop:20,
      marginBottom:20,
     alignItems: 'center',
    justifyContent: 'center',
    },
    
   
});
