import React, {useEffect} from "react";
import {View,StyleSheet} from "react-native";
import { Card, Button} from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Head from "./header";
import { useCard } from "../config/context";
import { database, auth } from "../config/firebase";
import ToggleSwitch from "toggle-switch-react-native";
import Rating from "./rating";

export default function Home({ navigation }) {
  const { setdata, rate, setRate, theme, setTheme } = useCard();

  useEffect(() => {
    database
      .ref("/Food")
      .child("items")
      .on("value", (snapshot) => {
        if (snapshot.exists()) {
          setdata(Object.values(snapshot.val()));
        } else {
          setdata([]);
        }
      });
    auth.onAuthStateChanged((user) => {
      if (user) {
        setRate(true);
      } else {
        setRate(false);
      }
    });
  }, []);
  const handlebreakfast = () => {
    navigation.navigate("Breakfast");
  };
  const handleLunch = () => {
    navigation.navigate("Lunch");
  };
  const handleDinner = () => {
    navigation.navigate("Dinner");
  };
  const toggle = () => {
    setTheme(theme === false ? true : false);
  };

  return (
    <>
      <Head/>
      <View>
        <ScrollView>
          <View style={styles.main}>
          <View style={{alignSelf:'flex-end',marginRight:15}}>
        <ToggleSwitch
          isOn={theme}
          onColor="#d70b65"
          offColor="#000"
          size="medium"
          onToggle={() => toggle()}
        />

        </View>
            <Card
              containerStyle={theme===false?styles.cardbefore:styles.cardafter}

            >
              <Card.Title style={theme===false?styles.txtbefore:styles.txtclrafter}>Breakfast</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ borderRadius: 10, width: 260, height: 260 }}
                source={require("../assets/breakfast2.jpg")}
              ></Card.Image>
              <Rating
                uid={rate === true ? auth.currentUser.uid : null}
                pid="breakfast"
              />
              <Button
                buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                title="Menu"
                onPress={handlebreakfast}
              />
            </Card>
            <Card
              containerStyle={theme===false?styles.cardbefore:styles.cardafter}
            >
              <Card.Title style={theme===false?styles.txtbefore:styles.txtclrafter}>Lunch</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ borderRadius: 10, width: 260, height: 260 }}
                source={require("../assets/lunch2.jpg")}
              ></Card.Image>
              <Rating
                uid={rate === true ? auth.currentUser.uid : null}
                pid="lunch"
              />

              <Button
                buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                title="Menu"
                onPress={handleLunch}
              />
            </Card>
            <Card
                containerStyle={theme===false?styles.cardbefore:styles.cardafter}

            >
              <Card.Title style={theme===false?styles.txtbefore:styles.txtclrafter}>Dinner</Card.Title>
              <Card.Divider />
              <Card.Image
                style={{ borderRadius: 10, width: 260, height: 260 }}
                source={require("../assets/dinner2.jpg")}
              ></Card.Image>
              <Rating
                uid={rate === true ? auth.currentUser.uid : null}
                pid="dinner"
              />
              <Button
                buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                title="Menu"
                onPress={handleDinner}
              />
            </Card>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  main: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardafter:{
    paddingTop: 20,
    marginTop: 30,
    paddingBottom: 20,
    borderRadius: 15,
    elevation: 10,
    backgroundColor:'#333',
  },
  cardbefore:{
    paddingTop: 20,
    marginTop: 30,
    paddingBottom: 20,
    borderRadius: 15,
    elevation: 10,    
  },
  txtclrafter:{
    color:'#fff',
  },
  txtbefore:{
    color:'#000'
  },

});
