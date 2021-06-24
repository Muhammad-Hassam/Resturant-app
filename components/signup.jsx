import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text ,Alert} from 'react-native'
import { Button,Header } from 'react-native-elements'
import { useCard } from '../config/context';
import {auth} from '../config/firebase';
import Head from './header'
export default function Signup({navigation}) {

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [count,setcount]=useState(0)
 const {user}=useCard();
 const [loader,setloader]=useState(false);


const handlecart=()=>{
  if(user===true){
      navigation.navigate('Carts')
  }
  else{
      navigation.navigate('login')
  }
}

const handleSignup=()=>{
  setloader(true)
  auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
   setloader(false)
          navigation.navigate("login")
          
        })
        .catch((error) => Alert.alert(error.message));
    }


return (
    <>
   <Head/>
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
        loading={loader}
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
