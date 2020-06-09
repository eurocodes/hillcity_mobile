import { AsyncStorage } from 'react-native';

export const setUserToken = token => {
    AsyncStorage.setItem("token", token)
}

export const getUserToken = () => {
    AsyncStorage.getItem("token")
}

export const removeToken = () => {
    AsyncStorage.clear()
}

export const setUserRole = role => {
    AsyncStorage.setItem("role", role)
}

export const getUserRole = () => {
    AsyncStorage.getItem("role")
}

export const removeUserRole = () => {
    AsyncStorage.clear()
}