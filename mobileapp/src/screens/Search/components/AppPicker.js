import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Modal, TouchableHighlight, FlatList, TextInput } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors, fonts, INPUT_HEIGHT } from "../../../assets/styles/theme";
import { useHeaderHeight } from "@react-navigation/stack";
import { usePaginatedFetch } from "../../shared/hooks";
import { useTranslation } from "react-i18next";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Item } from 'react-navigation-header-buttons';
import { useSearchDispatch, ADD_LOCATION, useSearchState } from "../context";

const HeaderRight = ({ onClickDone }) => {

    return (
        <Item
            title='done'
            buttonStyle={styles.button}
            onPress={onClickDone}
        />
    )
}

const HeaderLeft = ({ onClose }) =>
    <Item
        title='close'
        buttonStyle={styles.button}
        onPress={onClose}
    />

const HeaderActions = ({ children, height }) =>
    <View style={[styles.headerButtons, { height }]}>
        {children}
    </View>

const FlatlistItem = React.memo(({ id, title }) => {
    const dispatch = useSearchDispatch()
    const { locations } = useSearchState()

    const toogleItemHandler = useCallback(() => {
        dispatch({ type: ADD_LOCATION, payload: { id, title }})
       
    }, [])

    return (
        <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={colors.grey.light}
            style={styles.item}
            onPress={toogleItemHandler}
        >
            <>
                <View style={styles.titleContainer}>
                    <MaterialIcons color={colors.base} size={20} name="my-location" style={styles.locationIcon} />
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={[styles.checkBox, { backgroundColor: colors.base }]}>
                    {locations.find(location => location.id === id) && <FontAwesome name='check' color={colors.white} size={14} />}
                </View>
            </>
        </TouchableHighlight>
    )
})

export const AppPicker = () => {

    const [modalVisible, setModalVisible] = useState(false)
    const { items, load } = usePaginatedFetch('locations/load_all')
    const { locations } = useSearchState()

    const { t, i18n } = useTranslation()

    const renderItem = ({ item }) => (
        <FlatlistItem
            title={item.address}
            id={item.id} />
    )

    const keyExtractor = useCallback((item, index) => (item.id + index).toString())

    const toggleModal = useCallback(() => setModalVisible((visible) => !visible))

    useEffect(() => { load() }, [])

    return (
        <View>
            <TouchableHighlight onPress={toggleModal} underlayColor={colors.grey.light} >
                <View style={styles.chooseButton}>
                    <Text style={styles.chooseText}>{locations.length > 0 ? `(${locations.length}) Areas choosed` : `Choose Areas` }</Text>
                    <MaterialCommunityIcons color={colors.base} size={20} name="arrow-up-down-bold" style={styles.switchChoooseIcon} />
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    button: {
        ...fonts.cairoBold,
        fontSize: 16,
        color: colors.white,
        textTransform: 'uppercase'
    },
    screenContainer: {
        flex: 1,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: 'white',
        paddingHorizontal: 5
    },
    flatlist: {
        paddingTop: 10
    },
    textInputContainer: {
        marginTop: 20
    },
    chooseButton: {
        padding: 15,
        flexDirection: 'row',
    },
    chooseText: {
        flex: 1
    },
    container: {
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 1,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    item: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: colors.black,
        ...fonts.cairoSemiBold,
        fontSize: 14,
        fontWeight: '500'
    },
    separator: {
        height: 2,
        backgroundColor: colors.white
    },
    switchChoooseIcon: {
        alignSelf: 'flex-end'
    },
    locationIcon: {
        marginRight: 15
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBox: {
        borderWidth: 0.5,
        borderColor: colors.base,
        height: 25,
        width: 25,
        backgroundColor: colors.white,
        borderRadius: 25 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatlistContainer: {
        flex: 1,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: 'white',
        paddingTop: 30
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
    }
})