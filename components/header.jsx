import React,{useState,useEffect} from 'react';
import {Header,Icon} from 'react-native-elements';
import { useCard } from '../config/context';
import { auth,database } from '../config/firebase';
import {Alert,Text,View} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function head(){
    const navigation = useNavigation(); 
    const [count,setcount]=useState([])
    const {user,setUser,rate,setRate}=useCard();
    const [login,setlogin]=useState(false)

    useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
        if(user){
          setlogin(true)
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
                navigation.navigate('login')                

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
        navigation.navigate('OrderHistory')
    }

      const logout=()=>{
        auth.signOut();
        setRate(false)
        Alert.alert('You have signout')
        navigation.navigate('login');
        setlogin(false);
      }

      if(login===true){
        return(
          <Header
          style={{paddingTop:30}}
          leftComponent={  <>
          <Icon
              name="power-off"
              type="font-awesome"
              color={"#FFFFFF"}
              size={23}
              containerStyle={{marginHorizontal: 15, position: 'relative'}}
             onPress={()=>logout()}
            />  
 
            </> }
    centerComponent={{ text: 'Marito Resturant', style: { color: '#fff',fontSize:20 } }}
    rightComponent={
      <View style={{ flexDirection: "row",flexWrap: "wrap"}}>
        <View style={{flex:0.5}}>
        <Icon
      name="list"
      type="font-awesome"
      color={"#FFFFFF"}
      size={22}
      containerStyle={{marginRight:10}}
      onPress={handlehistory}
    />
        </View>
        <View style={{flex:0.5}}>
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
          backgroundColor: '#000',

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
        </View>
      </View>
    }
  />
      )
      }
      else{
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
    centerComponent={{ text: 'Marito Resturant', style: { color: '#fff',fontSize:20  } }}
    rightComponent={
      <View style={{ flexDirection: "row",flexWrap: "wrap"}}>
        <View style={{flex:1}}>
        <Icon
      name="shoppingcart"
      type="antdesign"
      color={"#FFFFFF"}
      size={22}
      onPress={handlecart}
    />       
      </View>
      </View>
    }
  />
      )
      }

}