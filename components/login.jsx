import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text ,TouchableOpacity,Alert,ActivityIndicator} from 'react-native'
import { Button,Header } from 'react-native-elements'
// import { auth } from "../config/firebase";
import { useCard } from '../config/context';
import {auth} from '../config/firebase';
import Head from './header';


export default function Login({navigation}) {

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [count,setcount]=useState(0)
 const {user, setUser,rate,setRate}=useCard();
 const [loader,setloader]=useState(false);

 const handleLogin=()=>{
   setloader(true)
   auth.signInWithEmailAndPassword(email,password)
   .then(() =>{
   setloader(false)
   setRate(true);
    if(auth.currentUser.email==="admin@gmail.com"){
     navigation.navigate("Admindashboard")
   }
   else if(auth.currentUser.email==="kitchen@gmail.com"){
    navigation.navigate("Kitchenmanager")
   }
   else if(auth.currentUser.email==="rider@gmail.com"){
    navigation.navigate("Rider")
   }
   else{
    navigation.navigate("home");
   }
   })
   .catch((error)=>{
   setloader(false);
     Alert.alert(error.message);
   })
 }


const handleSignup=()=>{
  navigation.navigate('signup')
}

  return (
    <>
    <Head/>
    <View style={styles.container}>
    <View style={styles.main}>
      <Text style={styles.login}>Login</Text>
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
        title="Login"
        loading={loader}
        onPress={handleLogin}
      />

<TouchableOpacity onPress={handleSignup}><Text style={{marginTop:10}}>Not Have Account</Text></TouchableOpacity>
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
