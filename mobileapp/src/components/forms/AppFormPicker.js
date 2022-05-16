import React, { useCallback, useState, useRef } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { colors, fonts, INPUT_HEIGHT } from '../../assets/styles/theme';
import { useHeaderHeight } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import Picker from './Picker';

const ITEM_HEIGHT = 40;
const ITEM_MARGIN = 5;

const PickerItem = ({ item, onRemoveItem }) => {
    return (
        <TouchableWithoutFeedback key={item.id} onPress={() => onRemoveItem(item.id)} style={styles.checkBoxItem}>
            <View style={styles.checkBoxItem}>
                <Text style={styles.text}>{item.name}</Text>
                <View style={[styles.iconContainer, { backgroundColor: '#ff7979' }]}>
                    <Feather name='x' color={colors.white} size={18} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const AppFormPicker = ({ onCheckItemHandler }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [items, setItems] = useState([])
    const scrollView = useRef()

    const toggleModal = useCallback(() => setModalVisible((visible) => !visible))

    const checkedHandler = (items) => {
        setItems(items)
        onCheckItemHandler(items)
    }

    const removeItemHandler = (id) => {
        console.log(id)
    }

    return (
        <View>
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onContentSizeChange={() => scrollView.current.scrollToEnd()}
                ref={scrollView}
            >
                <View style={styles.checkBoxItems}>
                    {items.map(item =>
                        <PickerItem item={item} key={item.id.toString()} onRemoveItem={removeItemHandler} />
                    )}
                </View>
                <TouchableWithoutFeedback onPress={toggleModal} style={styles.checkBoxItem}>
                    <View style={styles.checkBoxItem}>
                        <Text style={styles.text}>ADD</Text>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name='add' color={colors.white} size={21} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <Picker uri='subjects/load_all' visible={modalVisible} onCheckedItems={checkedHandler} onVisibleChange={setModalVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    checkBoxItems: {
        flexDirection: 'row'
    },
    checkBoxItem: {
        marginHorizontal: 4,
        backgroundColor: '#E5E5E5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: ITEM_HEIGHT,
        borderRadius: ITEM_HEIGHT,
        overflow: 'hidden',
        paddingHorizontal: 6
    },
    container: {
        flexDirection: 'row',
    },
    item: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconContainer: {
        height: ITEM_HEIGHT,
        backgroundColor: '#aaa69d',
        height: ITEM_HEIGHT - 10,
        width: ITEM_HEIGHT - 10,
        borderRadius: (ITEM_HEIGHT - 10) / 2,
        paddingHorizontal: 2,
        borderWidth: 1,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 13,
        fontWeight: '500',
        marginRight: 6
    },
    separator: {
        width: ITEM_MARGIN * 2
    },
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
    title: {
        color: colors.black,
        ...fonts.cairoSemiBold,
        fontSize: 15,
        fontWeight: '500'
    },
    locationIcon: {
        marginRight: 15
    },
})

export default AppFormPicker;