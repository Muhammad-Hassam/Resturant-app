import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Image, Platform, ScrollView, Alert,Picker,KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { auth, database, Storage } from "../config/firebase";


export default function Additem({navigation}) {

  const [image, setImage] = useState(null);
  const [price, setprice] = useState(0);
  const [userName, setuserName] = useState(""); 
  const [imageURL, setImageURL] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [description,setDescription]=useState("");
 const [loader,setloader]=useState(false);
 const [done,setdone]=useState(true)


  useEffect(() => {
    (async () => {
    
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();  }
  , []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    const imageName = Math.random() * 2000*1223234


    if (!result.cancelled) {
      setImage(result.uri) 
    setloader(true);
    }
    const response = await fetch(result.uri);
    const blob = await response.blob()

    var ref = Storage.ref("picture/"+imageName);

    return ref.put(blob).then((snapshot) => {

      snapshot.ref.getDownloadURL().then((URL) => {
        setImageURL(URL);
        setloader(false)
        setdone(false)
      })

    });


  };


  const upload = async () => {
const key=database.ref("/Food").push().key;
   database.ref("/Food").child('items').child(key).update({
       key:key,
       price:price,
       name:userName,
       description:description,
       type:selectedValue,
          imageURL: imageURL,
        }).then(()=>{
          Alert.alert("Items Has Been Added");
         navigation.navigate("Admindashboard");
        }).catch((err)=>{
          Alert.alert(err)
        })
      }
  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView>
        <View style={styles.main}>
          <Text style={styles.login}>Add items</Text>
          <TextInput
            style={{ width: 300, borderWidth: 2, padding: 5, borderRadius: 10,}}
            keyboardType='default'
            placeholder="Enter Food Item name"
            onChangeText={name => setuserName(name)}
            value={userName}
          />
        <TextInput
            style={{ width: 300, borderWidth: 2, padding: 5, borderRadius: 10, marginTop: 40 }}
            keyboardType='default'
            placeholder="Enter Description"
            multiline
            onChangeText={descriptions=> setDescription(descriptions)}
            value={description}
          />

          <TextInput
            style={{ width: 300, borderWidth: 2, padding: 5, borderRadius: 10, marginTop: 40 }}
            keyboardType='number-pad'
            placeholder="Enter Price"
            onChangeText={emails => setprice(emails)}
            value={price}
          />

<Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: "100%",borderWidth:2,borderColor:"#000" }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        placeholder={'Select Food Item Type'}
      >
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dinner" value="Dinner" />

      </Picker>

          <Button
            buttonStyle={{ borderRadius: 10, paddingLeft: 30, paddingRight: 30 }}
            title="Upload Your Image" 
            loading={loader}
            onPress={pickImage} 
            />
      
          {image && <Image source={imageURL?{ uri: imageURL }:null} style={{ width: 250, height: 250, marginTop: 10, marginLeft: 25 }} />}
          <Button
            buttonStyle={{ borderRadius: 10, marginTop: 20, paddingLeft: 30, paddingRight: 30, backgroundColor: "green" }}
            title="Done"
            disabled={done}
            onPress={upload}
          />
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
   marginTop:160,
    justifyContent: 'center',
  },
  main: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  login: {
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 30,
    textDecorationLine: "underline"
  },
});