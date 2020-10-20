import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// export const setSecureUserToken = token => {
//     SecureStore.setItemAsync("token", token)
// }

export const setUserToken = token => {
    AsyncStorage.setItem("token", token)
}

// export const getScureUserToken = () => {
//     SecureStore.getItemAsync("token")
// }

export const getUserToken = () => {
    AsyncStorage.getItem("token")
}

// export const deleteToken = () => {
//     SecureStore.deleteItemAsync("token")
// }

export const removeToken = () => {
    AsyncStorage.clear()
}

// export const setUserRole = role => {
//     SecureStore.setItemAsync("role", role)
// }

export const setUserRole = role => {
    AsyncStorage.setItem("role", role)
}

// export const getUserRole = () => {
//     SecureStore.getItemAsync("role")
// }

export const getUserRole = () => {
    AsyncStorage.getItem("role")
}

// export const deleteRole = () => {
//     SecureStore.deleteItemAsync("role")
// }

export const removeUserRole = () => {
    AsyncStorage.clear()
}

// export const setName = name => {
//     SecureStore.setItemAsync("name", name)
// }

export const setName = name => {
    AsyncStorage.setItem("name", name)
}

// export const getName = () => {
//     SecureStore.getItemAsync("name")
// }

export const getName = () => {
    AsyncStorage.getItem("name")
}

// export const deleteName = () => {
//     SecureStore.deleteItemAsync("name")
// }

export const removeName = () => {
    AsyncStorage.clear()
}

// export const setEngID = id => {
//     SecureStore.setItemAsync("id", id)
// }

export const setEngID = id => {
    AsyncStorage.setItem("id", id);
}

// Engagement Status
// export const setActive = active => {
//     SecureStore.setItemAsync("active", active)
// }

export const setActive = active => {
    AsyncStorage.setItem("active", active)
}

// export const getActive = () => {
//     SecureStore.getItemAsync("active")
// }

export const getActive = () => {
    AsyncStorage.getItem("active")
}

// export const setPending = pending => {
//     SecureStore.setItemAsync("pending", active)
// }

export const setPending = pending => {
    AsyncStorage.setItem("pending", pending)
}

// export const getPendind = () => {
//     SecureStore.getItemAsync("pendind")
// }

export const getPending = () => {
    AsyncStorage.getItem("pending")
}

export const setEngType = engType => {
    AsyncStorage.setItem("engType", engType);
}

export const getEngType = () => {
    AsyncStorage.getItem("engType")
}
