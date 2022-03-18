import React, { useState } from "react"
import { StyleSheet, Dimensions, View, Text } from "react-native"
import { TabView as TabViewUI, TabBar, SceneMap } from "react-native-tab-view"
import { NearbyScene } from "../scenes/NearbyScene"
import { SubjectsScene } from "../scenes/SubjectsScene"
import { colors, fonts } from "../../../assets/styles/theme"

const initialLayout = { width: Dimensions.get('window').width };

export const TabView = () => {
    const [index, setIndex] = useState(0)
    
    const [routes] = React.useState([
        { key: 'subjects', title: 'Subjects' },
        { key: 'nearby', title: 'Nearby' },
    ])

    const lazyPlaceholder = ({ route }) => (
        <View style={styles.scene}>
            <Text>Loading {route.title}…</Text>
        </View>
    )

    return (
        <TabViewUI
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
            lazy
            renderLazyPlaceholder={lazyPlaceholder}
        />
    )
}

const renderScene = SceneMap({
    nearby: NearbyScene,
    subjects: SubjectsScene,
})

const renderTabBar = props => (
    <TabBar
        {...props}
        labelStyle={{ color: 'black', ...fonts.bold }}
        indicatorStyle={{ backgroundColor: colors.base, }}
        style={styles.tabBarStyle}
    />
)

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: 'white'
    }
})