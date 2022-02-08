import React, { useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fonts, INPUT_HEIGHT } from '../../assets/styles/theme';
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TabView } from "./components/TabView";

export default TeachersListComponent = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 15 }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Feather name="menu" color={colors.white} size={20} />
                    </TouchableOpacity>
                )
            }
        });
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.push('Maps')}>
                        <Fontisto name="map-marker-alt" color={colors.white} size={24} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation])

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#e74295', '#7f509b']}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={styles.gradient}
            />
            <SafeAreaView style={styles.body}>
                <TabView/>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.base,
    },
    body: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    textInput: {
        ...INPUT_HEIGHT,
        paddingTop: 0,
        paddingBottom: 0,
        paddingHorizontal: 10,
        textAlignVertical: 'center',
        backgroundColor: colors.white,
        borderWidth: 0.25,
        borderColor: '#eee',
        ...fonts.cairoRegular,
        fontSize: 14,
        marginHorizontal: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 3,
    },
    inputIcon: {
        marginRight: 20,
        paddingHorizontal: 13,
        ...INPUT_HEIGHT,
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
});