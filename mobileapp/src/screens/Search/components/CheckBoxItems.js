import React, { useCallback } from "react"
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { colors } from "../../../assets/styles/theme"

const ITEM_HEIGHT = 40;
const ITEM_MARGIN = 5;

const getItemLayout = (data, index) => {
    return {
        length: ITEM_HEIGHT,
        offset: (ITEM_HEIGHT + (ITEM_MARGIN * 2)) * index,
        index,
    }
}

const separatorItem = () => <View style={styles.separator} />

const keyExtractor = (item, index) => (item.id + index).toString()

export const CheckBoxItems = ({ items, onCheckItemHandler, checkedItems }) => {

    return (
        <FlatList
            contentContainerStyle={styles.checkBoxItems}
            data={items}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            horizontal
            ItemSeparatorComponent={separatorItem}
            showsHorizontalScrollIndicator
        />
    )
}

const Item = ({ name, onPress, id, isChecked }) => {
    const isCheckedColor = isChecked ? colors.base : colors.grey.light
    const isCheckTextColor = isChecked ? colors.white : colors.black

    return (
        <TouchableOpacity onPress={() => onPress(id)} style={[styles.checkBoxItem, { backgroundColor: isCheckedColor }]}>
            <Text style={[styles.text, { color: isCheckTextColor }]}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checkBoxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: ITEM_HEIGHT,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    checkBoxItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: ITEM_MARGIN * 2
    },
    text: {
        fontSize: 13,
        fontWeight: '500'
    },
    separator: {
        width: ITEM_MARGIN * 2
    }
})