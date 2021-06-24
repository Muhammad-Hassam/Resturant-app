import React from 'react';
import { View, StyleSheet, StatusBar ,Text, TouchableOpacity} from 'react-native'
import { ListItem , Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Head from './header'
import { auth, database } from "../config/firebase";
import { useEffect,useState } from 'react';

export default function Adminorders({navigation}) {
   
  const [data,setdata]=useState({})
  const [allOrders,setALlOrders]=useState([])

useEffect(()=>{
  database.ref('/Food').child('Orders').on('value',snapshot=>{
    let temp=[]
    if(snapshot.exists()){
      setdata(snapshot.val());
      let orders=snapshot.val()
      Object.keys(orders).map(key=>Object.keys(orders[key]).map(indOrderKey=>temp.push(orders[key][indOrderKey])))
      setALlOrders(temp)
    }
    else{
      setdata({})
    }
  })
  return()=>{
    console.log("cleanup")
    setALlOrders([])
  }
},[])

const handleupdate=(data)=>{
  database.ref('/Food').child('Orders'+"/"+data.userid+"/"+data.key).update({
    status: 'Proceed to kitchen',
  })
}
    return (
        <>
        <Head/>
        <View style={styles.container}>
            <ScrollView>
        <View>
          <Text style={styles.breakfast}>Recent Orders</Text>
      {allOrders.map((prod,index)=>(
      <ListItem style={{marginTop:20}} key={index}>
                  <View style={{ flexDirection: "row",flexWrap: "wrap"}} >
                  <View style={{flex:0.7}}>
                    <TouchableOpacity style={{marginTop:15}} onPress={()=>navigation.navigate('Orderdetails',{alldata:prod})}> 
                    <ListItem.Content >
                    <ListItem.Title>{prod.userName}</ListItem.Title>
                    <View style={styles.subtitleView}>
                      <Text style={styles.ratingText}>{prod.status}</Text>
                      <Text style={styles.ratingText}>{prod.date}</Text>
                    </View>
                  </ListItem.Content>
                  </TouchableOpacity>
                  </View>
                  
                  <View style={{flex:0.3}}> 
                  {prod.status==="Proceed to kitchen"?
                  <Button
                       buttonStyle={{ borderRadius: 10, marginTop: 20 }}
                       title="Kitchen"
                       onPress={()=>handleupdate(prod)}
                     />:null}
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
