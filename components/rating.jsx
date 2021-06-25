import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Rating = () => {
    const [defaultRating, setdefaultRating] = useState(0);
    const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])

    const starImageFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
    const starImageCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';


    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setdefaultRating(item)}>
                                <Image
                                    style={styles.starImgStyle}
                                    source={
                                        item <= defaultRating ? { uri: starImageFilled } : { uri: starImageCorner }
                                    }
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    return (
        <SafeAreaView>
            <CustomRatingBar />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    starImgStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 20,
    }
})

export default Rating;