import React from 'react';
import { View, StyleSheet, StatusBar ,Text, TouchableOpacity} from 'react-native'
import { ListItem , Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Head from './header'
import { auth, database } from "../config/firebase";
import { useEffect,useState } from 'react';
import { Alert } from 'react-native';

export default function OrderHistory({navigation}) {
   
  const [data,setdata]=useState([])

useEffect(()=>{
  database.ref('/Food').child('Orders'+'/'+auth.currentUser.uid).on('value',snapshot=>{
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

const handleupdate=(data)=>{
  if(data.status==="Not Delivered"){
    database.ref('/Food').child('Orders'+"/"+data.userid+"/"+data.key).remove()
    console.log(data.key,data.userid)
    Alert.alert('Order has been cancel');
  }
  else{
    Alert.alert('Your Order Has been Delivered');
  }

}

    return (
        <>
        <Head/>
        <View style={styles.container}>
            <ScrollView>
        <View>
          <Text style={styles.breakfast}>Recent Orders</Text>

          {data.map((data,index)=>{
            return(
              <ListItem style={{marginTop:20}} key={index}>
              <View style={{ flexDirection: "row",flexWrap: "wrap"}}>
        <View style={{flex:0.7}}>
          <TouchableOpacity style={{marginTop:15}} onPress={()=>navigation.navigate('Orderdetails',{alldata:data})}> 
          <ListItem.Content >
          <ListItem.Title>{data.userName}</ListItem.Title>
          <View style={styles.subtitleView}>
            <Text style={styles.ratingText}>{data.status}</Text>
            <Text style={styles.ratingText}>{data.date}</Text>
          </View>
        </ListItem.Content>
        </TouchableOpacity>
        </View>
        <View style={{flex:0.3}}> 
         {data.status==='Not Delivered'?  <Button
                       buttonStyle={{ borderRadius: 10, marginTop: 20 }}
                       title="Cancel"
                       onPress={()=>handleupdate(data)}
                     />:null}
      </View>
      </View>
       
      </ListItem>
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
        marginLeft:10,
        marginRight:10
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
      textAlign:'center',
      marginTop:20, 
    },
    price:{
       textAlign:'left',
       marginTop:20,
       marginBottom:10,
    }
    
   
});
