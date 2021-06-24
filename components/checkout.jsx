// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, TextInput, Text, Image, Platform, ScrollView, Alert } from 'react-native'
// import { Button } from 'react-native-elements';
// import Head from './header';
// // import { auth, database, Storage } from "../config/firebase";


// export default function CheckOut({navigation}) {

//    const [userName,setuserName]=useState('');
//    const [cardno,setCardno]=useState(0);
//    const [email,setEmail]=useState('');
//    const [address,setAddress]=useState('');

//   const Register = async () => {
// if (userName===""||email===""||address===""||cardno.length===8) {
//   Alert.alert("Kindly fill all the fields");
// }
// else{
//   await auth.createUserWithEmailAndPassword(email, password)
//   .then(() => {
//     const userid=auth.currentUser.uid;
//         database.ref("/Students").child(auth.currentUser.uid).set({
//           userid:userid,
//           userName: userName,
//           depart: depart,
//           skills: skill,
//           gpa: GPA,
//           imageURL: imageURL,
//         })
//   })
//   .catch(error => Alert.alert(error.message))
//   navigation.navigate("Login")
// }
 
//   }


//   return (
//     <>
//         <Head/>
//     <View style={styles.container}>
//     <View style={styles.main}>
//       <Text style={styles.login}>SignUp</Text>
//       <TextInput
//         style={{ width: 300, borderWidth: 2, padding: 5, borderRadius: 10 }}
//         keyboardType='email-address'
//         placeholder="Enter Your Email"
//         onChangeText={emails => setEmail(emails)}
//         value={email}
//       />
//       <TextInput
//         style={{ width: 300, borderWidth: 2, padding: 5, borderRadius: 10 }}
//         placeholder="Enter Your Email"
//         onChangeText={emails => setEmail(emails)}
//         value={email}
//       />
//       <TextInput
//         style={{ width: 300, borderWidth: 2, padding: 5, marginTop: 40, borderRadius: 10 }}
//         secureTextEntry={true}
//         keyboardType='numeric'
//         placeholder="Enter Your Card No"
//         onChangeText={passwords => setCardno(passwords)}
//         value={cardno}
//       />
//       <Button
//         buttonStyle={{ borderRadius: 10, marginTop: 25, paddingLeft: 30, paddingRight: 30 }}
//         title="Signup"
//         // onPress={handleSignup}
//       />
// </View>
//     </View>
//     </>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//    marginTop:200,
//     justifyContent: 'center',
//   },
//   main: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//     marginTop: 40,
//   },
//   login: {
//     paddingBottom: 10,
//     textAlign: "center",
//     fontSize: 30,
//     textDecorationLine: "underline"
//   },
// });

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text ,Alert} from 'react-native'
import { Button} from 'react-native-elements'
import { useCard } from '../config/context';
import {auth,database} from '../config/firebase';
import Head from './header';
import { useEffect } from 'react';
export default function Signup({navigation}) {

   const [product,setproducts]=useState([]);
   const [userName,setuserName]=useState('');
   const [cardno,setCardno]=useState(0);
   const [email,setEmail]=useState('');
   const [address,setAddress]=useState('');
   const {total,setTotal}=useCard()
   const timeElapsed = new Date(Date.now()).toLocaleDateString();

   useEffect(()=>{
    console.log(timeElapsed);
    database.ref("/Food").child('orders/'+auth.currentUser.uid).on('value',snapshot=>{
      if (snapshot.exists()) {
        setproducts(snapshot.val());
      } else {
        setproducts([]);
      }
    })
    return()=>{
      console.log("cleanup");
    }
   },[])
  const Register = async () => {
    console.log(typeof cardno.length)
if (userName===""||email===""||address===""||cardno.length<10) {
  Alert.alert("Kindly fill all the fields");
}
else{
  const key=database.ref("/Food").push().key;
  database.ref('/Food').child('Orders'+'/'+auth.currentUser.uid).child(key).update({
    product:product,
    key:key,
    userName:userName,
    email:email,
    address:address,
    total:total,
    date: timeElapsed,
    userid:auth.currentUser.uid,
    status: 'Not Delivered',
  })
  Alert.alert("Your Order Placed SuccessFully");
  database.ref("/Food").child('orders/'+auth.currentUser.uid).remove();
  navigation.navigate("home");
  setTotal(0);
}
 
  }
return (
    <>
    <Head/>
    <View style={styles.container}>
    <View style={styles.main}>
      <Text style={styles.login}>CheckOut</Text>

      <TextInput
        style={{ width: 300, borderWidth: 2, padding: 5, borderRadius: 10 }}
        // keyboardType='default'
        placeholder="Enter Your Name"
        onChangeText={uname => setuserName(uname)}
        value={userName}
      />
       <TextInput
        style={{ width: 300, borderWidth: 2,marginTop: 15, padding: 5, borderRadius: 10 }}
        keyboardType='email-address'
        placeholder="Enter Your Email"
        onChangeText={emails => setEmail(emails)}
        value={email}
      /> 
      <TextInput
        style={{ width: 300, borderWidth: 2, padding: 5, marginTop: 15, borderRadius: 10 }}
        keyboardType='default'
        placeholder="Enter Your Address"
        onChangeText={addresses => setAddress(addresses)}
        value={address}
      />
       <TextInput
        style={{ width: 300, borderWidth: 2, padding: 5, marginTop: 15, borderRadius: 10 }}
        keyboardType="number-pad"
        placeholder="Enter Your Card No"
        onChangeText={card => setCardno(card)}
        value={cardno}
      /> 
      <Button
        buttonStyle={{ borderRadius: 10, marginTop: 25, paddingLeft: 30, paddingRight: 30 }}
        title="Check Out"
        onPress={Register}
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
