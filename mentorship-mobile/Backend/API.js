import { AsyncStorage } from 'react-native';
import { getScureUserToken } from './Storage';

// Get token
// const getToken = async => getScureUserToken("token")
const getToken = async () => AsyncStorage.getItem("token");
const baseUrl = "https://hillcityapp.herokuapp.com";
const localBaseUrl = "http://localhost:3400";


// Fetch User Details
export const fetchUsersMentor = async () => {
    const token = await getToken()
    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/mentor/dashboard`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            }
        })

        if (response.ok) {
            const { data } = await response.json()
            return data
        } else {
            const { message } = await response.json()
            return message
        }
    } catch (err) {
        throw new Error(err)
    }
}

export const fetchUsersMentee = async () => {
    const token = await getToken()
    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/mentee/dashboard`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            }
        })
        const { data } = await response.json()
        return data
    } catch (err) {
        throw new Error(err);
    }
}

// Fetch Mentor's Engagements
export const fetchEngagementsMentor = async () => {
    const token = await getToken()
    try {
        const response = await fetch(`${baseUrl}/api/v1/get/mentor/engagements`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            }
        })
        const { data } = await response.json()
        return data
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchEngagementsMentee = async () => {
    const token = await getToken()
    try {
        const response = await fetch(`${baseUrl}/api/v1/get/mentee/engagements`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            }
        })
        const { data } = await response.json()
        return data
    } catch (err) {
        throw new Error(err);
    }
}

export const createEngagement = async (engagementType, modeOfEngagement, reasonForEngagement, proposedDate, proposedTime) => {
    const token = await getToken()
    try {
        const response = await fetch(`${baseUrl}/api/v1/post/engagement/create/new`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ engagementType, modeOfEngagement, reasonForEngagement, proposedDate, proposedTime })
        })
        const { data } = await response.json()
        return data
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchAcceptEngagement = async (id, comment) => {
    const token = await getToken()
    try {
        const response = await fetch(`${baseUrl}/api/v1/update/accepted/engagements/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ comment })
        })
        const { data } = await response.json()
        return data
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchModifyAcceptEngagement = async (id, date, time, comment) => {
    const token = await getToken()
    try {
        const response = await fetch(`${baseUrl}/api/v1/update/modify-accept/engagements/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ proposedDate: date, proposedTime: time, comment: comment })
        })
        const { data } = await response.json()
        return data
    } catch (err) {
        throw new Error(err);
    }
}

export const fectchUploadReport = async (id, file) => {
    const token = await getToken()
    try {
        const { name, uri } = file;
        const uriParts = name.split(".");
        const fileType = uriParts[uriParts.length - 1];
        console.log("Uri:", uri)


        const formData = new FormData()
        formData.append("file", {
            uri,
            name,
            type: `application/${fileType}`,
        });
        console.log("FormData:", formData)

        const options = {
            method: "PUT",
            body: formData,
            headers: {
                "Accept": "application/json",
                "Authorization": token,
            },
        };
        await fetch(`${baseUrl}/api/v1/update/report/engagements/${id}`, options)
    } catch (err) {
        throw new Error(err)
    }
}