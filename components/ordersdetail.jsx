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
    return (
        <>
 <Head/>
        <View style={styles.container}>
            <ScrollView>
        <View style={styles.main}>
          <Text style={styles.breakfast}>Detail</Text>
           {!!Object.keys(alldata).length &&
           <Card 
                containerStyle={{borderRadius:30}} >
                    <Text style={styles.description}>Delievery Address:{alldata.address} </Text>
                    <Text style={styles.description}>Total Price:{alldata.total}PKR </Text>
                    {Object.keys(alldata?.product).map((prodKey) => (
                          <Card 
                          key={prodKey}
                          containerStyle={{ paddingTop:20, paddingBottom:20}} >
                              <Card.Title>{alldata?.product[prodKey].name} </Card.Title>
                              <Card.Divider />
                              <Card.Image style={{ borderRadius: 50, width: 250,height:200 }} source={{uri:alldata?.product[prodKey].imageURL}}></Card.Image>
                              <Text style={styles.description}>Description: {alldata?.product[prodKey].description}</Text>
                              <Text style={styles.price}>Price: {alldata?.product[prodKey].price} PKR</Text>
                              <Text style={styles.price}>Quantity: {alldata?.product[prodKey].quantity}</Text>
                          </Card>
                    ))} 
                </Card>                     
    }
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
