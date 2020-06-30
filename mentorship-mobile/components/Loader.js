import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

const Loader = props => {
    const { loading, ...attributes } = props;

    return (
        <Modal
            transparent={true}
            animationType='none'
            visible={loading}
            onRequestClose={() => console.log("close modal")}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        height: 25,
        width: 25,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});