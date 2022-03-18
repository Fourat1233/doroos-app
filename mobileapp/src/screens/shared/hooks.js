import { useState, useCallback, useEffect } from "react"
import { Platform, Dimensions } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import { BASE_URL } from "./env";

export const usePaginatedFetch = (uri) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [next, setNext] = useState(null)

    const load = useCallback(async () => {
        setLoading(true)
        const response = await fetch(next || `${BASE_URL}/${uri}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json()
        if (response.ok) {
            setItems((items) => [...items, ...responseData['data']])
            if (responseData['next_page_url']) {
                setNext(responseData['next_page_url'])
            } else {
                setNext(null)
            }
        } else {
            console.log(JSON.parse(responseData))
        }
        setLoading(false)
    }, [uri, next])

    return {
        items,
        setItems,
        load,
        loading,
        hasMore: next !== null
    }
}

export const usePopularFetch = (uri) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState({ teachers: [], subjects: [] })

    const load = useCallback(async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/${uri}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json()
        if (response.ok) {
            const teachers = responseData['teachers']
            const subjects = responseData['subjects']
            setItems({
                teachers,
                subjects
            })
        } else {
            console.log(JSON.parse(responseData))
        }
        setLoading(false)
    }, [uri])

    return {
        items,
        load,
        loading,
    }
}

export const useMinMaxFetch = (uri) => {
    const [loading, setLoading] = useState(true)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    const load = useCallback(async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/${uri}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json()
        if (response.ok) {
            setMax(responseData['data'][1])
            setMin(responseData['data'][0])
        } else {
            console.log(JSON.parse(responseData))
        }
        setLoading(true)
    }, [uri])

    return {
        min,
        max,
        load,
        loading,
    }
}

export const useLoadOneFetch = (uri) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    const load = useCallback(async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/${uri}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json()
        if (response.ok) {
            console.log(data)
            setData(responseData['data'])
        } else {
            console.log(JSON.parse(responseData))
        }
        setLoading(false)
    }, [uri])

    return {
        data,
        load,
        loading,
    }
}

export const useSearchQueryFetch = (uri) => {
    const [loading, setLoading] = useState(false)
    const [countData, setCountData] = useState(0)

    const load = useCallback(async (searchTerm) => {
        setLoading(true)
        const searcheQuery = `?q=${searchTerm}`
        const response = await fetch(`${BASE_URL}/${uri}${searcheQuery}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json()

        if (response.ok) {
            console.log(responseData['data'])
            setCountData(responseData['data'])
        } else {
            console.log(responseData)
        }
        setLoading(false)

    }, [uri])

    return {
        countData,
        load,
        loading,
    }
}

export const useCurrentLocation = () => {

    const [currentPosition, setCurrentPosition] = useState()

    useEffect(() => {
        (async function fetchCurrentLocation() {
            const result = await request(
                Platform.select({
                    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                }),
            )

            if (result !== 'granted') return
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setCurrentPosition(() => ({
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA

                    }))
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
            );
        })()
    }, [])

    return currentPosition
}

// Our hook
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {

            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay)

            return () => {
                clearTimeout(handler);
            }
        },
        [value]
    )

    return debouncedValue;
}