import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Head from './header'
import { database } from "../config/firebase";
import { useEffect, useState } from 'react';
import {useCard} from '../config/context';


export default function Adminorders({ navigation }) {
  const {theme}=useCard();
  const [data, setdata] = useState({})
  const [allOrders, setALlOrders] = useState([])

  useEffect(() => {
    database.ref('/Food').child('Orders').on('value', snapshot => {
      let temp = []
      if (snapshot.exists()) {
        setdata(snapshot.val());
        let orders = snapshot.val()
        Object.keys(orders).map(key => Object.keys(orders[key]).map(indOrderKey => temp.push(orders[key][indOrderKey])))
        setALlOrders(temp)
      }
      else {
        setdata({})
      }
    })
    return () => {
      console.log("cleanup")
      setALlOrders([])
    }
  }, [])

  const handleupdate = (data) => {
    database.ref('/Food').child('Orders' + "/" + data.userid + "/" + data.key).update({
      status: 'Delivered',
    })
  }

  const alldata = allOrders.filter((data) => data.status === "Proceed to Rider" && data.status !== "Proceed to kitchen" && data.status !== "Delivered" && data.status !== "Not Delivered")

  return (
    <>
      <Head />
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={theme===false?styles.breakfast:styles.breakfasttheme}>Rider Orders</Text>
            {alldata.map((prod, index) => (
              <ListItem style={{ marginTop: 20 }} key={index}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }} >
                  <View style={{ flex: 0.7 }}>
                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => navigation.navigate('Orderdetails', { alldata: prod })}>
                      <ListItem.Content >
                        <ListItem.Title>{prod.userName}</ListItem.Title>
                        <View style={styles.subtitleView}>
                          <Text style={styles.ratingText}>{prod.status}</Text>
                          <Text style={styles.ratingText}>{prod.date}</Text>
                        </View>
                      </ListItem.Content>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 0.3 }}>
                    <Button
                      buttonStyle={{ borderRadius: 10, marginTop: 20 }}
                      title="Delivered"
                      onPress={() => handleupdate(prod)}
                    />
                  </View>
                </View>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  main: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakfast:{
    fontSize:30,
    textDecorationLine:'underline', 
    textAlign:'center',
    marginTop:20, 
  },
    breakfasttheme:{
      color:'#fff',
      fontSize:30,
    textAlign:'center',
      textDecorationLine:'underline',  
    },
  price: {
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 10,
  }


});
