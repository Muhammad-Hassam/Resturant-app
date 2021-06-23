import React,{useState,useEffect} from 'react';
import {Header,Icon} from 'react-native-elements';
import { useCard } from '../config/context';
import { auth,database } from '../config/firebase';
import {Alert,Text,View} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function head(){
    const navigation = useNavigation(); 
    const [count,setcount]=useState([])
    const {user,setUser}=useCard();
    

    useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
        if(user){
            database.ref("/Food").child('orders/' + auth.currentUser.uid).on('value', snapshot=>{
        if(snapshot.exists()){
          setcount(Object.values(snapshot.val()))
        }
        else{
          setcount([])
        }
      }) 
        }
        else{
          setcount([])
        }
      })
    return()=>{
      console.log('cleanup')
    }
    },[])
    const loginPage=()=>{    
            if(user===true){
                auth.signOut();
                Alert.alert('Logout SuccessFully');
            }
            else{
                navigation.navigate('login')                
            }
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

      const handlehistory=()=>{
        auth.onAuthStateChanged((user) => {
          if(user){
        navigation.navigate('OrderHistory')
          }
          else{
              navigation.navigate('login')
          }
      })
      }
    return(
        <Header
        style={{paddingTop:30}}
        leftComponent={<Icon
            name="user"
            type="antdesign"
            color={"#FFFFFF"}
            size={22}
            containerStyle={{marginHorizontal: 15, position: 'relative'}}
           onPress={()=>loginPage()}
          />   }
  centerComponent={{ text: 'Resturant App', style: { color: '#fff' } }}
  rightComponent={<Text>
  <Icon
    name="list"
    type="font-awesome"
    color={"#FFFFFF"}
    size={22}
    containerStyle={{marginRight:10}}
    onPress={handlehistory}
  />
  <Icon
    name="shoppingcart"
    type="antdesign"
    color={"#FFFFFF"}
    size={22}
    onPress={handlecart}
  />   
  {count.length > 0 ? (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'red',
        width: 16,
        height: 16,
        borderRadius: 15 / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          color: "#FFFFFF",
          fontSize: 10,
        }}>
        {count.length}
      </Text>
    </View>
  ) : null}
  </Text>}
/>
    )
}