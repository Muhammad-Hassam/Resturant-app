import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Text,Alert} from 'react-native'
import { Card, Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from 'react-native-elements';
import { useCard } from '../config/context';
import { color } from 'react-native-elements/dist/helpers';
import { auth } from '../config/firebase';
import Head from './header'


// import { auth } from "../config/firebase";

export default function Admindashboard({navigation}) {
 const [count,setcount]=useState(0)
 const {user,setUser}=useCard();

    const handleadditems = () => {
        navigation.navigate('Additem')
    } 
    const handleallitems=()=>{
      navigation.navigate('Allitems')
    }
    const handleorders= () => {
            navigation.navigate('Adminorders')
    }
    const handlecart=()=>{
        auth.onAuthStateChanged((user) => {
            if(user){
                navigation.navigate('Carts')
            }
            else{
                navigation.navigate('login')
            }
        })
      }

      const loginPage=()=>{ 
        navigation.navigate('login')
  }
    return (
        <>
      <Head/>
        <View >

            <ScrollView>
        <View style={styles.main}>
          <Text style={{fontSize:35,textDecorationLine:"underline"}}>Admin Dashboard</Text>
          <Card 
            containerStyle={{  paddingTop:20, paddingBottom:20,borderRadius:30 }} >
                <Card.Title>All Items</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 50, width: 260,height:260 }} source={require('../assets/allitems.png')}></Card.Image>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                    title='Items'
                    onPress={handleallitems} 
                    />
            </Card>
            <Card 
            containerStyle={{  paddingTop:20, paddingBottom:20,borderRadius:30 }} >
                <Card.Title>Add Items</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 50, width: 260,height:260 }} source={require('../assets/items.png')}></Card.Image>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                    title='Add Items'
                    onPress={handleadditems} 
                    />
            </Card>
         
            <Card 
             containerStyle={{ paddingTop:20, paddingBottom:20,borderRadius:30, marginBottom:70 }} >
                <Card.Title>Orders</Card.Title>
                <Card.Divider />
                <Card.Image style={{ borderRadius: 50, width: 260,height:260 }} source={require('../assets/orders.png')}></Card.Image>
                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10  }}
                    title='Orders'
                    onPress={handleorders}
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
