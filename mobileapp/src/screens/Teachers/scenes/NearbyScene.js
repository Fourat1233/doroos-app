import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { colors, fonts } from '../../../assets/styles/theme'
import { usePaginatedFetch } from '../../shared/hooks'
import { Teacher } from "../components/Teacher";

export const NearbyScene = () => {

    const { items: teachers, load, loading, hasMore, setItems } = usePaginatedFetch('teachers/load_all')
    const [refreshing, setRefreshing] = useState(false)

    const keyExtractor = (item, index) => (item.id * index).toString()

    const renderItem = ({ item }) => (<Teacher teacher={item} />)

    const renderFooter = () => <View style={{ height: 50 }} />

    const onEndReached = () => hasMore ? load() : false

    const onRefreshHandler = useCallback(() => {
        setRefreshing(true)
        setItems([])
        load()
        setRefreshing(false)
    }, []);

    useEffect(() => { load() }, [])

    return (
        <FlatList
            data={teachers}
            renderItem={renderItem}
            style={styles.scene}
            showsVerticalScrollIndicator={false}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefreshHandler}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        padding: 5,
        marginTop: 10,
        marginBottom: 40,
        paddingHorizontal: 20
    }
});