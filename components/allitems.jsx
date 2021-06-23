import React from 'react';
import { View, StyleSheet ,Text} from 'react-native'
import { Card, Button} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { useCard } from '../config/context';
import Head from "./header";
import { database } from '../config/firebase';
export default function Dinner({navigation}) {
  const {data}=useCard()

  const handleDelete=(key)=>{
    database.ref("/Food").child('items/'+key).remove();
  }

    return (
        <>
 <Head/>
        <View style={styles.container}>
            <ScrollView>
        <View style={styles.main}>
          <Text style={styles.breakfast}>All Items</Text>
           {data.map((item,index)=>{
               return(
                <Card 
                key={index}
                containerStyle={{ paddingTop:20, paddingBottom:20, paddingLeft: 10, paddingRight:10,borderRadius:30}} >
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Divider />
                    <Card.Image style={{ borderRadius: 50, width: 250,height:200 }} source={{uri:item.imageURL}}></Card.Image>
                    <Text style={styles.description}>Description: {item.description}</Text>
                    <Text style={styles.description}>Description: {item.type}</Text>
                    <Text style={styles.price}>Price: {item.price} PKR</Text>
                    <Button
                        buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                        title='Delete'
                        onPress={()=>handleDelete(item.key)} 
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
