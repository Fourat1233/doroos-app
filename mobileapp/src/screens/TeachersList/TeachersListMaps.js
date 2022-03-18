import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { observer } from "mobx-react-lite"
import { colors, INPUT_HEIGHT, fonts } from '../../assets/styles/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps'
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


export default TeachersListMapsComponent = observer(() => {

    const [markers] = useState([
        {
            latitude: 25.287734,
            longitude: 51.546817,
            name: 'Hichem',
            subject: 'Designer',
            userPicture: 'https://scontent.fdoh2-1.fna.fbcdn.net/v/t1.0-9/81556672_2797202313680358_5565497258713022464_o.jpg?_nc_cat=100&_nc_sid=13bebb&_nc_oc=AQnTucdR81eKKXVIIuYjJtGpXeByt88h2T4gbPVSrzPWkHpEGqWkUdo5LlsMteT4EqM&_nc_ht=scontent.fdoh2-1.fna&oh=b9785e483e5c30fe8b72ad858090cc28&oe=5F0BFA24'
        },
        {
            latitude: 25.276616,
            longitude: 51.537708,
            name: 'Oussama',
            subject: 'Manger',
            userPicture: 'https://scontent.fdoh2-1.fna.fbcdn.net/v/t1.0-1/c0.0.1582.1582a/104150924_1182754758739548_6780877538584083606_o.jpg?_nc_cat=106&_nc_sid=dbb9e7&_nc_oc=AQmclBKYy5frhNZllYUK2pL2FDFOKz2ethz6UhUbhBIA1303lOXU83liRk8fA5SRKDM&_nc_ht=scontent.fdoh2-1.fna&oh=f29b0ff3008fff1ef45c9b54a2b5f24f&oe=5F0D8DC6'
        },
        {
            latitude: 25.260753,
            longitude: 51.548813,
            name: 'Hichem',
            subject: 'Developer',
            userPicture: 'https://scontent.fdoh2-1.fna.fbcdn.net/v/t1.0-1/p320x320/87456614_2615756855318872_7107607366580830208_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_oc=AQnr_RPQKAuiVvq7H4CXqm8bWAkzraJN1ErHa74GMYpyQitcJE_awhYc2GIUqbHngEI&_nc_ht=scontent.fdoh2-1.fna&_nc_tp=6&oh=585ac8626e8f5e60f8fa3747ba4f9fe6&oe=5F0DD35D'
        },
        {
            latitude: 25.259070,
            longitude: 51.524417,
            name: 'Ahmed',
            subject: 'Developer',
            userPicture: 'https://scontent.fdoh2-1.fna.fbcdn.net/v/t1.0-0/p206x206/58679280_2448809148510642_3572490914196619264_o.jpg?_nc_cat=100&_nc_sid=110474&_nc_oc=AQmO1uqeMYPcSt07hLWlym9jhVC_xIgcfqKtoXNYbMxXh_wBnh2hqrzBNELfnSAfCV0&_nc_ht=scontent.fdoh2-1.fna&_nc_tp=6&oh=ec3f20287e87bdb708e73bee9f53bea5&oe=5F0B941E'
        },

    ])

    const mapMarkers = () => {
        return markers.map((marker) => <Marker
            key={marker.latitude}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.name}
            description={marker.subject}
        >
            <Image
                source={{ uri: marker.userPicture }}
                style={{ width: 74, height: 74, borderWidth: 3, borderRadius: 37, borderColor: colors.white }} />
        </Marker >)
    }

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: t('tabs:2'),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.body}>
                <View style={{ zIndex: 9999, marginTop: -25 }}>
                    <TextInput
                        placeholder={t('search:key')}
                        placeholderTextColor='#c2c0c8'
                        style={[styles.textInput, i18n.language === 'ar' ? { textAlign: 'right' } : '']}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        multiline={false}
                        editable={true}
                        autoFocus={false}
                    />
                    <TouchableOpacity style={styles.inputIcon}>
                        <Ionicons style={{ color: colors.base }} name={'md-search'} size={24} />
                    </TouchableOpacity>
                </View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 25.283989,
                        longitude: 51.543212,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {mapMarkers()}
                </MapView>
            </SafeAreaView>
        </View>
    );
});

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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    textInput: {
        ...INPUT_HEIGHT,
        paddingTop: 0,
        paddingBottom: 0,
        paddingHorizontal: 10,
        textAlignVertical: 'center',
        backgroundColor: colors.white,
        ...fonts.cairoSemiBold,
        borderWidth: 0.25,
        borderColor: '#eee',
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
});