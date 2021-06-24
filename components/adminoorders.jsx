import React from 'react';
import { View, StyleSheet, StatusBar ,Text, TouchableOpacity} from 'react-native'
import { ListItem , Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Head from './header'
import { auth, database } from "../config/firebase";
import { useEffect,useState } from 'react';

export default function Adminorders({navigation}) {
   
  const [data,setdata]=useState({})
useEffect(()=>{
  database.ref('/Food').child('Orders').on('value',snapshot=>{
    if(snapshot.exists()){
      setdata(snapshot.val());
    }
    else{
      setdata({})
    }
  })
  return()=>{
    console.log("cleanup")
  }
},[])

const handleupdate=(data)=>{
  database.ref('/Food').child('Orders'+"/"+data.userid+"/"+data.key).update({
    status: 'Delivered',
  })
}
    return (
        <>
        <Head/>
        <View style={styles.container}>
            <ScrollView>
        <View>
          <Text style={styles.breakfast}>Recent Orders</Text>
{!!Object.keys(data).length && Object.keys(data).map((prodKey)=>(
      <ListItem style={{marginTop:20}} key={prodKey}>
      {!!Object.keys(data[prodKey]).length && Object.keys(data[prodKey]).map((prod)=>(
                  <View style={{ flexDirection: "row",flexWrap: "wrap"}} key={prod}>
                  <View style={{flex:0.7}}>
                    <TouchableOpacity style={{marginTop:15}} onPress={()=>navigation.navigate('Orderdetails',{alldata:data[prodKey][prod]})}> 
                    <ListItem.Content >
                    <ListItem.Title>{data[prodKey][prod].userName}</ListItem.Title>
                    {console.log([prod])}
                    <View style={styles.subtitleView}>
                      <Text style={styles.ratingText}>{data[prodKey][prod].status}</Text>
                      <Text style={styles.ratingText}>{data[prodKey][prod].date}</Text>
                    </View>
                  </ListItem.Content>
                  </TouchableOpacity>
                  </View>
                  
                  <View style={{flex:0.3}}> 
                  {data[prodKey][prod].status==="Not Delivered"?

                  <Button
                       buttonStyle={{ borderRadius: 10, marginTop: 20 }}
                       title="Delivered"
                       onPress={()=>handleupdate(data[prodKey][prod])}
                     />:null}
                     </View>
                 
                </View>
                
      ))}
    
        
     
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
