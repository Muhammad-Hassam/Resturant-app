import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet ,Text,Alert} from 'react-native'
import { Card, Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { useCard } from '../config/context';
import { auth,database } from '../config/firebase';
import Head from "./header";
export default function Orderdetails({ route }) {
  const {alldata}=route.params;
     const [data,setdata]=useState({})

     useEffect(()=>{
         console.log(alldata.key)
        database.ref('/Food').child('Orders'+'/'+auth.currentUser.uid+'/'+alldata.key).on('value',snapshot=>{
          if(snapshot.exists()){
           setdata(Object.values(snapshot.val()))
          }
          else{
            setdata([])
          }
        })
        return()=>{
          console.log("cleanup")
        }
      },[])
console.log(data)
    return (
        <>
 <Head/>
        <View style={styles.container}>
            <ScrollView>
        <View style={styles.main}>
          <Text style={styles.breakfast}>Detail</Text>
           {!!Object.keys(data).length &&
                Object.keys(data).map((product, index)=>(
    <Card key={product}
                containerStyle={{borderRadius:30}} >
                    <Text style={styles.description}>Delievery Address:{data[product].address} </Text>
                    <Text style={styles.description}>Total Price:{data[product].total}PKR </Text>
                    {Object.keys(data[product].products).map((prod) => (
                          <Card 
                          key={index}
                          containerStyle={{ paddingTop:20, paddingBottom:20}} >
                              <Card.Title>{data[product].products[prod].name} </Card.Title>
                              <Card.Divider />
                              <Card.Image style={{ borderRadius: 50, width: 250,height:200 }} source={{uri:item.imageURL}}></Card.Image>
                              <Text style={styles.description}>Description: {item.description}</Text>
                              <Text style={styles.price}>Price: {item.price} PKR</Text>
          
                          </Card>
                    ))} 
                </Card>
               
                )
               
            
           )}
          
      
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
