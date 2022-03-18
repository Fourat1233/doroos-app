import React, { createContext, useReducer, useContext } from "react";

// Define list of actions
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'

export const ADD_SUBJECT = 'ADD_SUBJECT'
export const REMOVE_SUBJECT = 'REMOVE_SUBJECT'

export const ADD_LOCATION = 'ADD_LOCATION'
export const REMOVE_LOCATION = 'REMOVE_LOCATION'

export const SET_GENDER = 'SET_GENDER'

export const SET_PRICING = 'SET_PRICING'

const initialState = {
    search: null,
    subjects: [],
    locations: [],
    gender: 0,
    pricing: null
}

// Define the mainupator state
const searchReducer = (state, action) => {

    switch (action.type) {
        case SET_SEARCH_TEXT:

            return { ...state, search: action.searchText }

        case ADD_SUBJECT:

            const subjectId = action.payload
            let existingId = state.subjects.includes(subjectId)

            if (existingId) {
                return { ...state, subjects: state.subjects.filter((id) => id !== subjectId) }
            }

            return { ...state, subjects: [...state.subjects, subjectId] }

        case REMOVE_SUBJECT:

            return {
                ...state,
                subjects: state.subjects.filter((subjectId) => subjectId !== action.payload)
            }

        case ADD_LOCATION:

            const { id, title } = action.payload
            let existingLocation = state.locations.find((location) => location.id === id)

            if (existingLocation) {
                return { ...state, locations: state.locations.filter((location) => location.id !== id) }
            }

            return { ...state, locations: [...state.locations, { id, title }] }

        case REMOVE_LOCATION:

            return {
                ...state,
                locations: state.locations.filter((location) => location.id !== action.payload)
            }

        case SET_GENDER:
            return {
                ...state,
                gender: action.payload
            }
        case SET_PRICING:
            return {
                ...state,
                pricing: action.payload
            }
        default:
            return state
    }

}

// Create context
const SearchStateContext = createContext()
const SearchDispatchContext = createContext()

// export context search provider
export const SearchProvider = ({ children }) => {

    const [state, dispatch] = useReducer(searchReducer, initialState)

    return (
        <SearchStateContext.Provider value={state}>
            <SearchDispatchContext.Provider value={dispatch}>
                {children}
            </SearchDispatchContext.Provider>
        </SearchStateContext.Provider>
    )
}

// Custom hook to use search context state
export const useSearchState = () => {
    const context = useContext(SearchStateContext)
    if (context === undefined) {
        throw new Error('useSearchState must be used within a SearchProvider')
    }
    return context
}

// custom hook to use search context dispatch
export const useSearchDispatch = () => {
    const context = useContext(SearchDispatchContext)
    if (context === undefined) {
        throw new Error('useSearchDispatch must be used within a SearchProvider')
    }
    return context
}