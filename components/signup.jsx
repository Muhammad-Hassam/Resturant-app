import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text ,Alert} from 'react-native'
import { Button,Header } from 'react-native-elements'
// import { auth } from "../config/firebase";
import { useCard } from '../config/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth} from '../config/firebase';

export default function Signup({navigation}) {

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [count,setcount]=useState(0)
 const {user}=useCard();


const handlecart=()=>{
  if(user===true){
      navigation.navigate('Carts')
  }
  else{
      navigation.navigate('login')
  }
}

const handleSignup=()=>{
  auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          navigation.navigate("login")
          
        })
        .catch((error) => Alert.alert(error.message));
    }


return (
    <>
        <Header
        style={{paddingTop:30}}
  centerComponent={{ text: 'Resturant App', style: { color: '#fff' } }}
  rightComponent={<><Icon
    name="shopping-cart"
    type="antdesign"
    color={"#FFFFFF"}
    size={22}
    containerStyle={{marginHorizontal: 15, position: 'relative'}}
    onPress={handlecart}
  />   
  {count > 0 ? (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'red',
        width: 16,
        height: 16,
        borderRadius: 15 / 2,
        right: 10,
        top: +10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          color: "#FFFFFF",
          fontSize: 8,
        }}>
        {count}
      </Text>
    </View>
  ) : null}
  </>}
/>
    <View style={styles.container}>
    <View style={styles.main}>
      <Text style={styles.login}>SignUp</Text>
      <TextInput
        style={{ width: 300, borderWidth: 2, padding: 5, borderRadius: 10 }}
        textContentType="emailAddress"
        placeholder="Enter Your Email"
        onChangeText={emails => setEmail(emails)}
        value={email}
      />
      <TextInput
        style={{ width: 300, borderWidth: 2, padding: 5, marginTop: 40, borderRadius: 10 }}
        secureTextEntry={true}
        textContentType="password"
        placeholder="Enter Your Password"
        onChangeText={passwords => setPassword(passwords)}
        value={password}
      />
      <Button
        buttonStyle={{ borderRadius: 10, marginTop: 25, paddingLeft: 30, paddingRight: 30 }}
        title="Signup"
        onPress={handleSignup}
      />
</View>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 25,
  },
  login: {
    paddingBottom: 30,
    textAlign: "center",
    fontSize: 30,
    textDecorationLine:"underline"
  },
  choice: {
    textAlign: "center",
    paddingBottom: 12,
    paddingTop: 12,
    color: "grey"
  }
});
