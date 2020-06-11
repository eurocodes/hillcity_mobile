import { AsyncStorage } from 'react-native';

const processConnection = connection => ({
    name: `${connection.firstName} ${connection.lastName}`,
    phone: connection.phone,
    email: connection.email,
    photo: connection.photo,
})

const getToken = async () => AsyncStorage.getItem("token");
// Fetch User Details
export const fetchUsersMentor = async () => {
    const token = await getToken()
    try {
        const response = await fetch("http://localhost:3400/api/v1/auth/mentor/dashboard", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            }
        })
        const { data } = await response.json()
        console.log(data)
        return data
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchUsersMentee = async () => {
    const token = await getToken()
    try {
        const response = await fetch("http://localhost:3400/api/v1/auth/mentee/dashboard", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            }
        })
        const { data } = await response.json()
        console.log(data)
        return data
    } catch (err) {
        throw new Error(err);
    }
}