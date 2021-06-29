import React,{useState,useEffect} from 'react';
import { View, StyleSheet ,Text,Alert} from 'react-native'
import { Card, Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { useCard } from '../config/context';
import Head from "./header";
import { auth,database } from '../config/firebase';
import Rating from './rating';
export default function Dinner({navigation}) {
  const {data,rate,setRate}=useCard();


  const handleaddtocart = (product) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setRate(true)
        const key=database.ref("/Food").push().key;
   database.ref("/Food").child('orders/'+auth.currentUser.uid).child(key).update({
       key:key,
       price:product.price,
       name:product.name,
       description:product.description,
       type:product.type,
       quantity:1,
      imageURL: product.imageURL,
        }).then(()=>{
          console.log("success");
        }).catch((err)=>{
          Alert.alert(err)
        })
      }
       else {
        setRate(false)
        navigation.navigate('login');
      }
    });
  };

  

      const food= data.filter(data => data.type === "Lunch");
      console.log('food',food)
    return (
        <>
 <Head/>
        <View style={styles.container}>
            <ScrollView>
        <View style={styles.main}>
          <Text style={styles.breakfast}>Lunch</Text>
           {food.map((item,index)=>{
               return(
                <Card 
                key={index}
                containerStyle={{ paddingTop:20, paddingBottom:20,elevation:10,marginTop:30,paddingLeft: 10, paddingRight:10,borderRadius:15}} >
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Divider />
                    <Card.Image style={{ borderRadius: 10, width: 250,height:200 }} source={{uri:item.imageURL}}></Card.Image>
                    <Text style={styles.description}>Description: {item.description}</Text>
                    <Text style={styles.price}>Price: {item.price} PKR</Text>
                    <Rating uid={rate===true?auth.currentUser.uid:null} pid={item.key}/>
                    <Button
                        buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                        title='AddtoCart'
                        onPress={()=>handleaddtocart(item)} 
                    />
                </Card>
               )
           })}
       
           
      
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
    },
    description:{
      width:250,
      marginTop:20
    }
    
   
});
