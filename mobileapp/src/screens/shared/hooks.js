import {useState, useCallback, useEffect, useRef} from 'react';
import {Platform, Dimensions} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request} from 'react-native-permissions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import {BASE_URL} from './env';

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const axiosInstance2 = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const usePaginatedFetch = (uri, params) => {
  var fetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);

  useEffect(() => {
    if (items && fetched.current) {
      fetched.current = false;
      setLoading(false);
    }
  }, [items]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      let response = await axiosInstance2.get(next ?? `${BASE_URL}/${uri}`, {
        params,
      });
      if (response.status === 200) {
        fetched.current = true;
        console.log('aaa');
        console.log(typeof response.data);
        console.log(response.data['data']);
        console.log('aaa');
        console.log(response.data);
        console.log('aaa');
        setItems([...items, ...response.data.data]);
        if (response.data.next_page_url) {
          setNext(response.data.next_page_url);
        } else {
          setNext(null);
        }
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log('hey1');
      console.log(error);
    }
  }, [uri, next]);

  return {
    items,
    setItems,
    load,
    loading,
    hasMore: next !== null,
  };
};

export const usePopularFetch = uri => {
  var fetched = useRef(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState({teachers: [], subjects: []});

  useEffect(() => {
    if (fetched.current && items.subjects && items.teachers) {
      fetched.current = false;
      setLoading(false);
    }
  }, [items]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      let response = await axiosInstance.get(`/${uri}`);
      fetched.current = true;
      setItems(response.data);
    } catch (error) {
      console.log('hey2');
      console.log(error);
    }
  }, [uri]);

  return {
    items,
    load,
    loading,
  };
};

export const useMinMaxFetch = uri => {
  const [loading, setLoading] = useState(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/${uri}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      setMax(responseData['data'][1]);
      setMin(responseData['data'][0]);
    } else {
      console.log(JSON.parse(responseData));
    }
    setLoading(true);
  }, [uri]);

  return {
    min,
    max,
    load,
    loading,
  };
};

export const useLoadOneFetch = uri => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const load = useCallback(async () => {
    console.log('-----------------------------------------------------');
    console.log(`${BASE_URL}/${uri}`);
    console.log('-----------------------------------------------------');
    setLoading(true);
    const response = await fetch(`${BASE_URL}/${uri}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      console.log(data);
      setData(responseData['data']);
    } else {
      console.log(JSON.parse(responseData));
    }
    setLoading(false);
  }, [uri]);

  return {
    data,
    load,
    loading,
  };
};

export const useSearchQueryFetch = uri => {
  const [loading, setLoading] = useState(false);
  const [countData, setCountData] = useState(0);

  const load = useCallback(
    async searchTerm => {
      setLoading(true);
      const searcheQuery = `?q=${searchTerm}`;
      const response = await fetch(`${BASE_URL}/${uri}${searcheQuery}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData['data']);
        setCountData(responseData['data']);
      } else {
        console.log(responseData);
      }
      setLoading(false);
    },
    [uri],
  );

  return {
    countData,
    load,
    loading,
  };
};

export const useCurrentLocation = () => {
  const [currentPosition, setCurrentPosition] = useState();

  useEffect(() => {
    (async function fetchCurrentLocation() {
      const result = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      );

      if (result !== 'granted') return;
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentPosition(() => ({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }));
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
      );
    })();
  }, []);

  return currentPosition;
};

// Our hook
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export const login = async (contact_point, password) => {
  try {
    let response = await axiosInstance.post('/gate/sign_in', {
      contact_point,
      password,
    });
    await AsyncStorage.setItem(
      'token',
      `${response.data.token_type} ${response.data.access_token}`,
    );
    await AsyncStorage.setItem(
      'user',
      JSON.stringify(response.data.current_user),
    );
    console.log('--------------------------------------');
    console.log(response.data);
    console.log(response.data.current_user);
    console.log('--------------------------------------');
    return false;
  } catch (error) {
    console.log('hey3');
    console.log(error);
    return error.message;
  }
};

export const register = async data => {
  try {
    let response = await axiosInstance.post('/gate/sign_up', data);
  } catch (error) {
    console.log('hey4');
    console.log(error);
  }
};
