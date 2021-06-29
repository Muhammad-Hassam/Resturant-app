import React, { useState } from "react";
import { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { useCard } from "../config/context";
import { database, auth } from "../config/firebase";

const Rating = ({ uid, pid }) => {
  const [defaultRating, setdefaultRating] = useState(0);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const [array, setArray] = useState([]);
  const { rate, setRate, productId, setProductid, userid, setUserid } =useCard();
  const [login, setLogin] = useState(false);
  const [data, setdata] = useState([]);
  const [avgRating, setavgRating] = useState(0);

  const starImageFilled =
    "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";
  const starImageCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setRate(true);
        database
        .ref(`Food/rating/${auth.currentUser.uid}`)
        .child(pid)
        .on("value", (snapshot) => {
          if (snapshot.exists()) {
            console.log("ratings", snapshot.val());
            setdefaultRating(snapshot.val()?.rating);
          } else {
            setdata([]);
          }
        });
      } else {
        setRate(false);
      }
    });
    database.ref("Food/rating").on("value", (snapshot) => {
      let temp = [];
      let snap = snapshot.val();
      Object.keys(snap).map((key) => {
        let userObj = snap[key];
        Object.keys(userObj).map(
          (prodKey) => prodKey === pid && temp.push(userObj[prodKey]?.rating)
        );
      });
      let average = (array) => array.reduce((a, b) => a + b) / array.length;
      if (temp.length > 0) return setavgRating(average(temp));
      else return setavgRating(0);
    });
  }, []);

  const ratings = () => {
    if(rate===true){
        database
        .ref(`Food/rating/${auth.currentUser.uid}`)
        .child(pid)
        .set({
          uid: uid,
          pid: pid,
          rating: defaultRating,
        })
        .then(() => {
          console.log("rating save");
        })
        .catch((err) => console.log(err));
    }
    else{
        console.log('no User')
    }
 
  };
  const CustomRatingBar = () => {
    if (rate === true) {
      return (
        <>
          <Text style={{marginTop:5}}>Ratting:{avgRating}</Text>
          <View style={{ flexDirection: "row",flexWrap: "wrap"}}>
        <View style={{flex:0.7}}>
          <View style={styles.customRatingBarStyle}>
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={item}
                  onPress={() => setdefaultRating(item)}
                >
                  <Image
                    style={styles.starImgStyle}
                    source={
                      item <= defaultRating
                        ? { uri: starImageFilled }
                        : { uri: starImageCorner }
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          </View>
          <View style={{flex:0.4}}>
          <Button
            onPress={() => ratings()}
            title="Rated"
            buttonStyle={{ borderRadius: 10, marginTop: 10 }}
          />
          </View>
          </View>
        </>
      );
    } else {
      return <Text>Ratting:{avgRating}</Text>
      ;
    }
  };
  return (
    <SafeAreaView>
      <CustomRatingBar />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  customRatingBarStyle: {
    flexDirection: "row",
    marginTop: 10,
  },
  starImgStyle: {
    width: 20,
    height: 20,
    marginTop:10,
    resizeMode: "cover",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
  },
});
export default Rating;
