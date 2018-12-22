import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation'; // Version can be specified in package.json
import { Icon } from 'react-native-elements'
import HomeScreen from '../Screens/Home.screen';
import LoginScreen from '../Screens/Login.screen';
import MarketSCreen from '../Screens/Market.screen';
import NativeBaseScreen from '../Screens/NativeBase.screen';
const TabNavigator = createBottomTabNavigator({
    Test: {
        screen: NativeBaseScreen,
        navigationOptions: {
            tabBarLabel: 'Test',
            tabBarIcon: () => {
                return <Icon
                    name='ios-american-football'
                    type='ionicon'
                    color='#517fa4'
                />
            }
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: () => {
                return <Icon
                    name='ios-american-football'
                    type='ionicon'
                    color='#517fa4'
                />
            }
        }
    },
    Market: {
        screen: MarketSCreen,
        navigationOptions: {
            tabBarLabel: 'Market',
            tabBarIcon: () => {
                return <Icon
                    name='ios-american-football'
                    type='ionicon'
                    color='#517fa4'
                />
            }
        }
    },
});

const RootStack = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Main: {
        screen: TabNavigator,
        navigationOptions: {
            title: 'Ecommerce',
            headerLeft: null
        }
    }
}, {
        initialRouteName: 'Main',
    });
const AppContainer = createAppContainer(RootStack);
export default AppContainer;