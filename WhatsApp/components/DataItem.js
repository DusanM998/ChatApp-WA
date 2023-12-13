import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import ProfileImage from "./ProfileImage";
import colors from "../constants/colors";
import { Ionicons } from '@expo/vector-icons';

const DataItem = props => {

    const { title, subtitle, image, type, isChecked } = props;

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.container}>

                <ProfileImage
                    uri={image}
                    size={40}
                />

                <View style={styles.textContainer}>
                    <Text
                        numberOfLines={1}
                        style={styles.title}>
                        {title}
                    </Text>
                    
                    <Text
                        numberOfLines={1}
                        style={styles.subtitle}>
                        {subtitle}
                    </Text>
                </View>

                {
                    type === "checkbox" &&
                    <View style={{...styles.iconContainer, ...isChecked && styles.checkedStyle}}>
                        <Ionicons name="checkmark" size={18} color="white" />
                    </View>   
                }

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 7,
        borderBottomColor: colors.extraLightGrey,
        alignItems: "center",
        minHeight: 50,
        borderBottomWidth: 1
    },
    textContainer: {
        marginLeft: 14,
        flex: 1,
    },
    title: {
        fontFamily: 'medium',
        fontSize: 16,
        letterSpacing: 0.3
    },
    subtitle: {
        fontFamily: 'regular',
        color: colors.grey,
        letterSpacing: 0.3
    },
    iconContainer: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: colors.lightGrey,
        backgroundColor: "white",
    },
    checkedStyle: {
        backgroundColor: colors.green,
        borderColor: "transparent",
    }
});

export default DataItem;