import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Text,Alert} from 'react-native'
import { Card, Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Head from './header';
import {useCard} from "../config/context";
import {database,auth} from '../config/firebase';
import Rating from './rating';


export default function Home({navigation}) {
  const {data,setdata,rate,setRate}=useCard();
  const [login,setLogin]=useState(false)

  useEffect(() => {
    database.ref("/Food").child('items').on('value', snapshot => {
      if(snapshot.exists()){
      setdata(Object.values((snapshot.val())))
      }
      else{
      setdata([])
      }
    })
    auth.onAuthStateChanged((user)=>{
        if(user){
          setRate(true);
        }
        else{
            setRate(false);
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
            containerStyle={{ paddingTop:20, paddingBottom:20,borderRadius:15,elevation:10 }} >
                <Card.Title>Breakfast</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 10, width: 260,height:260 }} source={require('../assets/breakfast2.jpg')}></Card.Image>
                <Rating uid={rate===true?auth.currentUser.uid:null} pid='breakfast'/>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                    title='Menu'
                    onPress={handlebreakfast} 
                    />
            </Card>
            <Card 
             containerStyle={{ paddingTop:20,marginTop:30, paddingBottom:20,borderRadius:15,elevation:10}} >
                <Card.Title>Lunch</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 10, width: 260,height:260 }} source={require('../assets/lunch2.jpg')}></Card.Image>
                <Rating uid={rate===true?auth.currentUser.uid:null} pid='lunch'/>

                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10  }}
                    title='Menu'
                    onPress={handleLunch}
                    /> 
            </Card>
            <Card 
             containerStyle={{ paddingTop:25,marginTop:30, paddingBottom:20, paddingLeft: 10,elevation:10, paddingRight:10,borderRadius:15, marginBottom:80 }} >
                <Card.Title>Dinner</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 10, width: 260,height:260 }} source={require('../assets/dinner2.jpg')}></Card.Image>
                <Rating uid={rate===true?auth.currentUser.uid:null} pid='dinner'/>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10  }}
                    title='Menu'
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
