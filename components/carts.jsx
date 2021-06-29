import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native'
import { Card, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { auth, database } from '../config/firebase';
import Head from './header';
import { useCard } from '../config/context';

export default function ({navigation}) {

    const [data, setdata] = useState([]);
    let [totalPrice, setPrice] = useState(0);
    const {total,setTotal,theme}=useCard();
    let i = 0;
    const datahandler=()=>{
        database.ref("/Food").child('orders/' + auth.currentUser.uid).on('value', snapshot => {
            if (snapshot.exists()) {
                setdata(Object.values((snapshot.val())))
                {
                    Object.keys(snapshot.val()).forEach((product) => {
                      const price = parseInt(snapshot.val()[product].price);
                      const quantity = parseInt(snapshot.val()[product].quantity);
                      i += price * quantity;
                    });
                  }
                  setPrice(i);
            }
            else {
                setdata([])
            }
        })
    }
    useEffect(() => {
       datahandler()
        return()=>{
            console.log("cleanup");
        }
    }, [])
    const quanityDec = (product) => {
        if (product.quantity === 1) {
            database.ref("/Food").child('orders/' + auth.currentUser.uid).child(product.key)
            .update({
              quantity: 1,
            });
        } else {
          let count = product.quantity - 1;
          database.ref("/Food").child('orders/' + auth.currentUser.uid).child(product.key)
            .update({
              quantity: count,
            });
        }
        datahandler()
      };
    
      const quanityInc = (product) => {
        let count = product.quantity + 1;
        database.ref("/Food").child('orders/' + auth.currentUser.uid).child(product.key)
          .update({
            quantity: count,
          });
          datahandler()
      };
 
      const handlecheckOut=()=>{
          setTotal(totalPrice);
          navigation.navigate("CheckOut")
      }

      const handleRemove=(key)=>{
        database.ref("/Food").child('orders/' + auth.currentUser.uid).child(key).remove();
      }
if(data.length>0){
    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <Head/>
                    <View style={styles.main}>
                        <Text style={theme===false?styles.breakfast:styles.breakfasttheme}>Carts</Text>
                        {data.map((item,index)=>{
                            return(
                                <Card
                                key={index}
                                containerStyle={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 10, paddingRight: 10, borderRadius: 30 }} >
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Divider />
                                <Card.Image style={{ borderRadius: 50, width: 250,height:200 }} source={{uri:item.imageURL}}></Card.Image>
                                <Text style={{marginTop:10}}><Text style={{fontWeight:'bold'}}>Order for:</Text> {item.type}</Text>
                        <Text style={styles.description}><Text style={{fontWeight:'bold'}}>Description:</Text> {item.description}</Text>
                        <Text><Text style={{fontWeight:'bold'}}>Price:</Text> {item.price} PKR</Text> 
                                <Text style={{ textAlign: 'center',marginTop:3 }}>
                                <Button
                                        buttonStyle={{ borderRadius: 10, marginTop: 10, paddingLeft: 11, paddingRight: 11,marginRight:10, }}
                                        title='-'
                                        onPress={()=>quanityDec({
                                            key:item.key,
                                            quantity:item.quantity,
                                        })} 
                                    /> 
                                    <Text style={{ fontSize: 40}}>{item.quantity}</Text>
                                      <Button
                                        buttonStyle={{ borderRadius: 10, marginTop: 10,paddingLeft: 10, paddingRight: 10,marginLeft:10, }}
                                        title='+'
                                    onPress={()=>quanityInc({
                                        key:item.key,
                                        quantity:item.quantity,
                                    })} 
                                    />
                                </Text>
                                <Button
                                    buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                                    title='Remove'
                                onPress={()=>handleRemove(item.key)} 
                                />
                            </Card>
                            )

                        })}
                    </View>
                    <View>
                        <Card
                        containerStyle={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 10, paddingRight: 10, borderRadius: 30,marginBottom:15 }} >
                        <Text style={{textAlign:'center',fontWeight:'bold'}}>TotalPrice: {totalPrice}</Text>
                        <Button
                                        buttonStyle={{ borderRadius: 10, marginTop: 10,paddingLeft: 20, paddingRight: 20 }}
                                        title='Check Out'
                                    onPress={handlecheckOut} 
                                    />
                                    </Card>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
else{
    return(
        <>
            <Head />
        <View  style={{ justifyContent: 'center',
       alignItems: 'center',
       flex:1}}>
    <Text style={{fontWeight:'bold', fontSize:40,color:"gray"}}>No Carts Available</Text>
        </View>
        </>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        marginTop: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    breakfast: {
        fontSize: 30,
        textDecorationLine: 'underline',
    },
    price: {
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 10,
    },
    breakfasttheme:{
        color:'#fff',
        fontSize:30,
        textDecorationLine:'underline',  
      },
    description:{
        width:250,
      }


});
