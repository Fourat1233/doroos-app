import React, { useEffect, useCallback, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, FlatList, RefreshControl } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors, fonts, INPUT_HEIGHT } from '../../assets/styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePaginatedFetch } from '../shared/hooks'
import { Teacher } from "./components/Teacher";

const { width } = Dimensions.get('window');

export const BySubjectsScreen = ({ route }) => {

	const subjectId = route.params?.subjectId

	const { items: teachers, load, loading, hasMore } = usePaginatedFetch(`subjects/${subjectId}/load_teachers`)
	const [refreshing, setRefreshing] = useState(false)

	const keyExtractor = (item) => item.id

	const renderItem = ({ item }) => (<Teacher teacher={item} />)

	const renderFooter = () => <View style={{ height: 50 }} />

	const onEndReached = () => hasMore ? load() : false

	const onRefreshHandler = useCallback(() => {
		setRefreshing(true)
		load()
		setRefreshing(false)
	}, [])

	useEffect(() => {
		if (subjectId) {
			load()
		}
	}, [subjectId])

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={['#e74295', '#7f509b']}
				start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
				style={styles.gradient}
			/>
			<SafeAreaView style={styles.body}>
				{(loading) ? (
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Image
							source={{
								uri: 'https://cdn0.iconfinder.com/data/icons/30-hardware-line-icons/64/Search-512.png',
							}}
							style={{ width: 100, height: 100, marginTop: 100, marginBottom: 10 }}
						/>
						<Text style={{ ...fonts.medium }}>Loading ...</Text>
					</View>
				) : (
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
					)}
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

	},
	button: {
		backgroundColor: colors.base,
		padding: 20,
		borderRadius: 60,
		width: (width / 2) - 30,
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
	scene: {
		flex: 1,
		marginTop: 10,
		paddingHorizontal: 20
	},
});