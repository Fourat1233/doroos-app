import React, { } from 'react'
import { View, Text, StyleSheet, Image } from "react-native"
import { AirbnbRating } from 'react-native-ratings'
import { colors, fonts } from "../../../assets/styles/theme"
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const Subject = React.memo(({ names }) => {
    return (
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.subjects}>
            {names}
        </Text>
    )
})

export const Avatar = ({ avatar, userId }) => {
    const defaultAvatar = 'https://www.joyonlineschool.com/static/emptyuserphoto.png'
    const uri = avatar === 'default.png' ? defaultAvatar : `http://10.0.2.2:8000/uploads/teachers/${userId}/${avatar}`
    return (
        <Image
            source={{ uri }}
            style={styles.avatar} />
    )
}

export const Teacher = React.memo(({ teacher }) => (
    <View style={styles.card}>
        <Avatar avatar={teacher.profile_image} userId={teacher.userId} />
        <View style={styles.cardBody}>
            <Text style={styles.title}>{teacher.full_name}</Text>
            <Subject names={teacher.subjects.map(subject => subject.name).join(', ')} />
            <View style={styles.phoneContainer}>
                <FontAwesome name="phone-square" color={colors.base} size={18} />
                <Text style={styles.phone}>{teacher.phone_cell}</Text>
            </View>
        </View>
        <View style={styles.cardFooter}>
            <Text style={styles.ratingTitle}>4.5</Text>
            <View style={styles.ratingItems}>
                <AirbnbRating showRating={false} size={16} count={1} selectedColor="#F5A623" />
            </View>
        </View>
    </View>
))

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row', borderRadius: 10, padding: 10,
        backgroundColor: "white",
        shadowColor: colors.grey.placeholder,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.84,
        elevation: 3,
        marginBottom: 10
    },
    cardBody: {
        flex: 1,
        paddingHorizontal: 10
    },
    ratingTitle: {
        ...fonts.light,
        fontSize: 16,
        marginRight: 5
    },
    ratingItems: {
        alignSelf: 'flex-end'
    },
    cardFooter: {
        position: 'absolute',
        flexDirection: 'row',
        right: 15,
        top: 15
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    title: {
        ...fonts.bold,
        fontSize: 18
    },
    subjects: {
        marginTop: 5,
        flex: 1,
        ...fonts.light,
        fontSize: 14
    },
    phoneContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    phone: {
        marginLeft: 5,
        ...fonts.light,
        fontSize: 16
    }
})
