import React, { Component } from 'react';
import {
    AsyncStorage,
    ScrollView,
    StyleSheet,
    Text, View,
    StatusBar,
    SafeAreaView
} from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {
    fetchUsersMentor,
    fetchUsersMentee,
    fetchEngagementsMentee,
    fetchEngagementsMentor
} from '../Backend/API';
import Loader from '../components/Loader';
import { setUserPhoto } from '../Backend/Storage';

// import Icon from 'react-native-vector-icons/FontAwesome';

// import { getUserRole } from '../Backend/Storage';
// const { width, height } = Dimensions.get('window');

//Please Add location to user data

export default class UserDetailsScreen extends Component {
    state = {
        data: [],
        role: '',
        pending: 0,
        active: 0,
        loading: false,
    }

    async componentDidMount() {

        const role = await this.getUserRole()

        if (role === "mentor") {
            this.getMentorUserDetails()
            this.getMentorEngagements()
            return
        } else if (role === "adminmember") {
            this.getMentorUserDetails()
            this.getMentorEngagements()
            return
        }
        this.getMenteeUserDetails()
        this.getMenteeEngagements()
        return
    }

    // Get user Role
    // getRole = async () => getUserRole("role");
    getUserRole = async () => AsyncStorage.getItem("role")

    getMentorUserDetails = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchUsersMentor()
            if (results.myConnections && results.myDetails) {
                const data = new Array(results.myDetails);
                this.setState({ data: data, role: "mentor" })
                setUserPhoto(results.myDetails.photo)
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
            const data = new Array(results.myDetails);
            this.setState({ data: data, role: "mentee" })
            this.setState({ loading: false })
            return
        } catch (err) {
            console.log(err)
            this.setState({ loading: false })
            this.props.navigation.navigate('Signin');
            return
        }
    }

    getMentorEngagements = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchEngagementsMentor()
            if (results[0]) {
                this.setState({ engagements: results, })
                this.countEngagement()
                this.setState({ loading: false })
                return
            } else {
                this.setState({ engagements: "You don't have any engagements", role: "mentor" })
                this.setState({ loading: false })
            }
        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
            return
        }
    }

    getMenteeEngagements = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchEngagementsMentee()
            if (results[0]) {
                this.setState({ engagements: results, })
                this.countEngagement()
                this.setState({ loading: false })
                return
            } else {
                this.setState({ engagements: "You don't have any engagements", role: "mentee" })
                this.setState({ loading: false })
            }

        } catch (err) {
            this.setState({ loading: false })
            console.log(err)
        }
    }

    countEngagement = () => {
        this.state.engagements.map((val, index) => {
            if (val.status == "Pending") {
                this.setState({ pending: this.state.pending + 1 });
            } else if (val.status == "Completed") {
                this.setState({ completed: this.state.completed + 1 })
            } else {
                this.setState({ active: this.state.active + 1 })
            }
        });
    }

    renderDetails() {
        return this.state.data.map((val, index) => {
            return (
                <View style={styles.container} key={index}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: `http://hillcityfoundation.org/portal/storage/student_images/${val.photo}`
                                }}
                                size={80}
                            />
                            <View style={{ marginLeft: 20 }}>
                                <Title style={[styles.title, {
                                    marginTop: 15,
                                    marginBottom: 5,
                                    width: '90%',
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

                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox, { borderRightColor: '#ddd', borderRightWidth: 1 }]}>
                            <Text>{this.state.active}</Text>
                            <Caption>Active Engagements</Caption>
                        </View>
                        <View style={styles.infoBox}>
                            <Text>{this.state.pending}</Text>
                            <Caption>Pending Engagements</Caption>
                        </View>
                    </View>

                    <View style={styles.menuWrapper}>
                        <TouchableRipple onPress={() => { }}>
                            <View style={styles.menuItem}>
                                <Icon name='settings-outline' color='#ccc' size={25} />
                                <Text style={styles.menuItemText}>Edit Profile</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => { }}>
                            <View style={styles.menuItem}>
                                <Icon name='account-check-outline' color='#ccc' size={25} />
                                <Text style={styles.menuItemText}>Our Team</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => { }}>
                            <View style={styles.menuItem}>
                                <Icon name='star-outline' color='#ccc' size={25} />
                                <Text style={styles.menuItemText}>Rate this app</Text>
                            </View>
                        </TouchableRipple>
                    </View>
                </View>
            )
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, height: '100%' }}>
                <StatusBar backgroundColor='#252757' barStyle='light-content' />
                <ScrollView style={styles.mainContainer}>
                    {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                    <View style={styles.appLower}>
                        {this.renderDetails()}
                    </View>
                </ScrollView>
            </SafeAreaView>
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
    appLower: {
        flex: 1,
        alignContent: 'center',
        alignSelf: 'center',
        height: 'auto',
        width: '99%',
        margin: 2,
        marginVertical: 2,
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
        fontSize: 20,
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
})