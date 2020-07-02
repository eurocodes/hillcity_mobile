import React, { Component } from 'react';
import { AsyncStorage, Dimensions, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import Entypo from '@expo/vector-icons/Entypo';

const { width, height } = Dimensions.get('window');
import { fetchUsersMentor } from '../Backend/API';
import Loader from '../components/Loader';

const getUserName = async () => AsyncStorage.getItem("name")

export default class AdminPanel extends Component {

    state = {
        name: '',
        mentees: [],
        loading: false,
    }

    async componentDidMount() {
        const name = await getUserName()
        this.setState({ name })
        this.getAdminDashboard()
        return
    }

    getAdminDashboard = async () => {
        this.setState({ loading: true })
        try {
            const results = await fetchUsersMentor()
            if (results.myConnections) {
                this.setState({ mentees: results.myConnections, })
                this.setState({ loading: false })
                console.log("STATE:", this.state)
                return
            }
            this.setState({ mentees: [results], loading: false })
            console.log("STATE Ugee:", this.state)
            return

        } catch (err) {
            console.log(err)
            this.setState({ loading: false })
            return
        }
    }

    renderMentees() {
        return this.state.mentees.map((val, index) => {
            if (!val.firstName) {
                return (
                    <View>
                        <Text>{val}</Text>
                    </View>
                )
            }
            return (
                <View key={index} >
                    <View style={styles.appLowerMap}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.menteesMap}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo name='v-card' size={20} />
                                    <Text> {`${val.firstName} ${val.lastName}`}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo name='mail' size={20} />
                                    <Text> {val.email}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo name='mobile' size={20} />
                                    <Text> {val.phone}</Text>
                                </View>
                            </View>
                            <View style={styles.menteesPhoto}>
                                <Entypo name='user' size={40} />
                                {/* <Text>{val.photo}</Text> */}
                            </View>
                        </View>
                    </View>
                    <View style={styles.connectionDivider} />
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{ flex: 1, height, }}>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.topDesc}>
                        <Text style={styles.topDescText}>{this.state.name}, </Text>
                        <Text style={styles.topDescText}>Welcome to Admin dashboard, you can manage people and other activities from here</Text>
                    </View>

                    <View />

                    <View >
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ManageEngagements")} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Manage Engagements</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bothButtonContainer}>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManageMentors")} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Manage Mentors</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManageMentees")} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Manage Mentees</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.midTextContainer}>
                        <Text style={styles.midText}>My Mentees</Text>
                    </View>

                    <View style={styles.mentees}>
                        {this.state.loading ? (<View style={styles.loader}><Loader loading={this.state.loading} /></View>) : (<View />)}
                        {this.renderMentees()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height,
        width: '100%',
        backgroundColor: '#e5e5e5'
    },
    topDesc: {
        alignContent: 'flex-start',
        margin: 2,
        backgroundColor: '#307ecc',
        height: 'auto',
    },
    topDescText: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: '#fff',
        margin: 2,
    },
    bothButtonContainer: {
        flexDirection: 'row',
        width,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        width: '100%',
        height: 35,
        margin: 2,
    },
    buttonText: {
        flex: 1,
        alignSelf: 'center',
        marginVertical: 5,
        color: '#fff',
        fontSize: 20,
    },
    midTextContainer: {
        height: 35,
        backgroundColor: '#f2f2f2',
        marginHorizontal: 2,
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    midText: {
        fontSize: 15,
        alignSelf: 'center',
        color: '#307ecc',
    },
    mentees: {
        alignContent: 'flex-start',
        marginVertical: 5,
        marginHorizontal: 2,
        height: '100%',
        width: '99%',
        backgroundColor: '#807acd',
    },
    menteesMap: {
        width: width * 0.75,
    },
    menteesPhoto: {
        width: width * 0.2,
    },
    appLowerMap: {
        margin: 5,
        width: '50%',
    },
    connectionDivider: {
        height: 1,
        width: '100%',
        marginLeft: 5,
        backgroundColor: '#e2e2e2',
        marginTop: 2,
        marginBottom: 2,
    },
    loader: {
        alignContent: 'center',
        alignSelf: 'center',
    },
})