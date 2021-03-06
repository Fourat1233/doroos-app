import React, { useEffect } from 'react'
import { StyleSheet, View, Image, Text, Dimensions, ScrollView } from 'react-native'
import { colors, fonts } from '../../assets/styles/theme'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import Fontisto from "react-native-vector-icons/Fontisto"
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { AboutTeacherComponent } from './AboutTeacherComponent'
import { ContactTeacherComponent } from './ContactTeacherComponent'
import { useLoadOneFetch } from '../shared/hooks'
import { Spinner } from '../shared/components'

const initialLayout = { width: Dimensions.get('window').width };


export const Subject = React.memo(({ names }) => {
    return (
        <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.subjects}
        >
            {names}
        </Text>
    )
})

export const Avatar = ({ avatar, userId }) => {
    
    const defaultAvatar = 'https://www.joyonlineschool.com/static/emptyuserphoto.png'
    const uri = avatar === 'default.png' ? defaultAvatar : `http://10.0.2.2:8000/uploads/teachers/${userId}/${avatar}`
    
    return ( <Image source={{ uri }} style={styles.avatar} />)
}

export default ProfileComponent = ({ route }) => {
    const teacherId = route.params?.teacherId

    const { load, loading, data: teacher } = useLoadOneFetch('teachers/load_one/1')

    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: 'about', title: 'About' },
        { key: 'contact', title: 'Contact' },
    ])

    useEffect(() => {
        if (teacherId) {
            load()
        }
    }, [])

    const renderScene = SceneMap({
        about: AboutTeacherComponent,
        contact: ContactTeacherComponent,
    })

    const renderTabBar = props => (
        <TabBar
            {...props}
            labelStyle={{ color: 'black', ...fonts.light }}
            indicatorStyle={{ backgroundColor: colors.base, }}
            style={{ backgroundColor: 'white' }}
        />
    )

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#e74295', '#7f509b']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                style={styles.gradient}
            />
            <SafeAreaView style={styles.body}>
                {loading ? <Spinner /> : (
                    <ScrollView contentContainerStyle={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -20 }}>
                            <Avatar avatar={teacher.profile_image} userId={teacher.user_id}/>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ ...fonts.bold, fontSize: 16 }}>{teacher.full_name}</Text>
                                <Subject names={teacher.subjects.map(subject => subject.name).join(', ')} />
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <Fontisto name="map-marker-alt" color={colors.grey.placeholder} size={18} />
                                    <Text style={{ ...fonts.light, fontSize: 16, marginLeft: 5, color: colors.grey.placeholder }}>{teacher.state}, {teacher.city}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ borderColor: '#E8E8E8', borderWidth: 0.4, marginTop: 15 }} />
                            <TabView
                                renderTabBar={renderTabBar}
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                initialLayout={initialLayout}
                            />
                        </View>
                    </ScrollView>)}
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
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: 'white',
        padding: 20
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    subjects: {
        ...fonts.light,
        fontSize: 16,
        marginTop: 5,
        ...fonts.light,
        color: colors.base
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 10
    }
})