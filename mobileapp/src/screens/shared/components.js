import React from "react";
import { ActivityIndicator, View, Image, StyleSheet } from "react-native";
import { BASE_URL } from "./env";

export const Avatar = ({ avatar, userId }) => {
    const defaultAvatar = 'https://www.joyonlineschool.com/static/emptyuserphoto.png'
    const uri = avatar === 'default.png' ? defaultAvatar : `${BASE_URL}/uploads/teachers/${userId}/${avatar}`
    return (
        <Image
            source={{ uri }}
            style={styles.avatar} />
    )
}

export const Spinner = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#8E68AD" />
        </View>
    )
}