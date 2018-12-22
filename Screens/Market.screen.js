import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Carousel from "react-native-carousel-control";
var slides = [
    {
        image: require('../assets/pic1.png'),
        imageWidth: 300,
        imageHeight: 300,
        title: 'Hello World',
        subtitle: 'This is a beautiful world',
        titleColor: '#000',
        subtitleColor: '#000',
    },
    {
        image: require('../assets/pic2.png'),
        imageWidth: 300,
        imageHeight: 300,
        title: 'Bye World',
        subtitle: 'This is a see you soon',
        titleColor: '#000',
        subtitleColor: '#000',
    },
    {
        image: require('../assets/pic3.png'),
        imageWidth: 300,
        imageHeight: 300,
        title: 'Bye World',
        subtitle: 'This is a see you soon',
        titleColor: '#000',
        subtitleColor: '#000',
    }
];
export default class MarketSCreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
        }
    }
    onPress = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.onPress}>
                    <Text>
                        Touch Here
                    </Text>
                </TouchableOpacity>
                <View style={[styles.countContainer]}>
                    <Text style={[styles.countText]}>
                        {this.state.count !== 0
                            ? this.state.count
                            : null}
                    </Text>
                </View>
                <Carousel style={styles.carousel}>
                    <Image source={require('../assets/pic1.png')} style={{ height: 340 }} />
                    <Image source={require('../assets/pic2.png')} style={{ height: 340 }} />
                    <Image source={require('../assets/pic3.png')} style={{ height: 340 }} />
                </Carousel>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    },
    image: {
        marginRight: 2,
        height: 100,
    },
    carousel: {
        flex: 1,
        height: 500,
        backgroundColor: '#ececec'
    }
})
