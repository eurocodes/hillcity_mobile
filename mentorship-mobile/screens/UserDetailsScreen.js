import React, { Component } from 'react';
import {
    AsyncStorage,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import { getUserRole } from '../Backend/Storage';
import { fetchUsersMentor, fetchUsersMentee } from '../Backend/API';
import Loader from '../components/Loader';

const { width, height } = Dimensions.get('window');

export default class UserDetailsScreen extends Component {
    state = {
        myDetails: '',
        myConnections: [],
        role: '',
        loading: false,
    }

    async componentDidMount() {

        const role = await this.getUserRole()
        console.log("My Role:", role);

        if (role === "mentor") {
            this.getMentorUserDetails()
            return
        } else if (role === "adminmember") {
            this.getMentorUserDetails()
            return
        }
        this.getMenteeUserDetails()
        return
    }

    // Get user Role
    // getRole = async () => getUserRole("role");
    getUserRole = async () => AsyncStorage.getItem("role");

    getMentorUserDetails = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchUsersMentor()
            if (results.myConnections && results.myDetails) {
                this.setState({ myDetails: results.myDetails, myConnections: results.myConnections, role: "mentor" })
                this.setState({ loading: false })
                return
            }
            this.setState({ err: results })
            alert(this.state.err)
            this.setState({ loading: false })
            return

        } catch (err) {
            console.log(err)
            this.setState({ loading: false })
            this.props.navigation.navigate('Signin');
            return
        }
    }

    getMenteeUserDetails = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchUsersMentee()
            this.setState({ myDetails: results.myDetails, myConnections: results.myConnections, role: "mentee" })
            this.setState({ loading: false })
            return
        } catch (err) {
            console.log(err)
            this.setState({ loading: false })
            this.props.navigation.navigate('Signin');
            return
        }
    }

    renderConnection() {
        if (this.state.err) {
            return (
                <View>
                    <Text>No Assignment Yet</Text>
                </View>
            )
        }

        return this.state.myConnections.map((val, index) => {
            return (
                <View style={styles.container} key={index}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://p.kindpng.com/picc/s/78-785827_user-profile-avatar-login-account-male-user-icon.png'
                                }}
                                size={80}
                            />
                            <View style={{ marginLeft: 20 }}>
                                <Title style={[styles.title, {
                                    marginTop: 15,
                                    marginBottom: 5,
                                }]}>{`${val.firstName} ${val.lastName}`}</Title>
                                <Caption style={styles.caption}>{val.email}</Caption>
                            </View>
                        </View>
                    </View>
                    <StatusBar style="auto" />
                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Icon name='map-marker-radius' size={20} color='#252757' />
                            <Text style={{ color: '#252757', marginLeft: 20 }}>City / State</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='phone' size={20} color='#252757' />
                            <Text style={{ color: '#252757', marginLeft: 20 }}>{val.phone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='email' size={20} color='#252757' />
                            <Text style={{ color: '#252757', marginLeft: 20 }}>{val.email}</Text>
                        </View>
                    </View>
                    <View style={styles.connectioDivider} />
                </View>
            )
            // return (
            //     <View key={index}>
            //         <View style={{ flex: 1, flexDirection: 'row' }}>
            //             <View style={styles.appLowerMap}>
            //                 <View style={{ flexDirection: 'row', marginVertical: 3, marginLeft: 5 }}>
            //                     <Entypo name='user' size={25} color='#fcc044' />
            //                     {/* <Text>Photo: {val.photo}</Text> */}
            //                     <Text style={styles.connectionText}> {`${val.firstName} ${val.lastName}`}</Text>
            //                 </View>

            //                 <View style={{ flexDirection: 'row', marginLeft: 5 }}>
            //                     <Entypo name='mail' size={25} color='#0a6ebd' />
            //                     <Text style={styles.connectionText}> {val.email}</Text>
            //                 </View>

            //                 <View style={{ flexDirection: 'row', width: '95%', marginLeft: 5 }}>
            //                     <Entypo name='mobile' size={25} color='#0a6ebd' />
            //                     <Text style={styles.connectionText}> {`${val.phone}`}</Text>
            //                     <TouchableOpacity style={{ flex: 1, width: '100%', }}>
            //                         <Entypo name='phone' color='#0a6ebd' size={25} style={{ alignSelf: 'flex-end', paddingRight: 4, }} />
            //                     </TouchableOpacity>
            //                 </View>
            //             </View>
            //         </View>
            //         <View style={styles.connectioDivider} />
            //     </View>
            // )
        })
    }

    render() {
        return (
            <View style={{ flex: 1, height: '100%' }}>
                <StatusBar backgroundColor='#252757' barStyle='light-content' />
                <ScrollView style={styles.mainContainer}>
                    {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                    <View style={styles.appLower}>
                        {this.renderConnection()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',

    },
    container: {
        flex: 1,
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#252757',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#252757',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    appLower: {
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
        height: 'auto',
        width: '99%',
        margin: 2,
        marginVertical: 2,
    },
    appLowerMap: {
        margin: 5,
        width: '100%',
    },
    connectionText: {
        fontSize: 15,
        fontFamily: 'sans-serif',
        marginLeft: 10,
        marginVertical: 5,
    },
    connectioDivider: {
        height: 4,
        backgroundColor: '#c1c1c1',
        marginTop: 2,
        marginBottom: 2,
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
})