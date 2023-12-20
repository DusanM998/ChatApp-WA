import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";
import { Ionicons } from '@expo/vector-icons';

const SubmitButton = props => {

    const enabledBgColor = props.color || colors.primary;
    const disabledBgColor = colors.lightGrey;
    const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

    const showExitButton = props.showExitButton && props.showExitButton === true;

    return (
        <TouchableOpacity
            onPress={props.disabled ? () => {} : props.onPress}
            style={{
                ...styles.button,
                ...props.style,
                ...{ backgroundColor: bgColor }
            }}>
            <Text style={{ color: props.disabled ? colors.grey : 'white' }}>
                {props.title}
            </Text>
            {
                showExitButton && 
                <View style={styles.editIconContainer}>
                    <Ionicons name="ios-exit-outline" size={24} color="white" />
                </View>
            }
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    editIconContainer: {
        position: "absolute",
        bottom: -2,
        right: 4,
        borderRadius: 20,
        padding: 8,
    }
});

export default SubmitButton;