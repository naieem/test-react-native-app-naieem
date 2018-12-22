/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
//import rect in our project
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View, RefreshControl,
  TextInput, Image, TouchableOpacity,
  TouchableHighlight, Text, KeyboardAvoidingView, SafeAreaView
} from 'react-native';
import Carousel from "react-native-carousel-control";
import { ListItem, Avatar, Card, Button } from 'react-native-elements';
import { db } from '../DB/config';
// var slides = [
//   {
//     image: require('../assets/pic1.png'),
//     imageWidth: 300,
//     imageHeight: 300,
//     title: 'Hello World',
//     subtitle: 'This is a beautiful world',
//     titleColor: '#000',
//     subtitleColor: '#000',
//   },
//   {
//     image: require('../assets/pic2.png'),
//     imageWidth: 300,
//     imageHeight: 300,
//     title: 'Bye World',
//     subtitle: 'This is a see you soon',
//     titleColor: '#000',
//     subtitleColor: '#000',
//   },
//   {
//     image: require('../assets/pic3.png'),
//     imageWidth: 300,
//     imageHeight: 300,
//     title: 'Bye World',
//     subtitle: 'This is a see you soon',
//     titleColor: '#000',
//     subtitleColor: '#000',
//   }
// ];
//import all the components we will need
const userCollection = db.database().ref('/users');
export default class NativeBaseScreen extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      dataSource: [],
      refreshing: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = () => {
    console.log(this.state.title);
    const adaNameRef = db.database().ref('/users/0');

    adaNameRef.update({ age: this.state.title }).then(function () {
      console.log('Synchronization succeeded');
      alert('Synchronization succeeded');
    })
      .catch(function (error) {
        console.log('Synchronization failed');
        alert('Synchronization failed');
      });
  }
  handleChange = (text) => {
    console.log(text);
    this.setState({
      title: text
    });
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    userCollection.once("value")
      .then((snapshot) => {
        // snapshot.map((value,index)=>{
        //   this.state.dataSource.push(data);
        // });
        this.setState({
          dataSource: snapshot.val(),
          refreshing: false
        });
        console.log('Total result found ', this.state.dataSource.length);
      });
  }

  componentDidMount() {
    userCollection.once("value")
      .then((snapshot) => {
        // snapshot.map((value,index)=>{
        //   this.state.dataSource.push(data);
        // });
        this.setState({
          dataSource: snapshot.val()
        });
        console.log('Total result found ', this.state.dataSource.length);
      });
  }
  render() {
    let dataSource = this.state.dataSource;
    return (
      <KeyboardAvoidingView style={styles.main} behavior='padding' keyboardVerticalOffset='120'>
        {!dataSource.length &&
          <View style={styles.loader}><ActivityIndicator size="large" color="#0000ff" /></View>
        }
        <ScrollView style={styles.main} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} />}
        >
          {dataSource.length > 0 &&
            <View>
              <Carousel>
                <View><Image source={{ uri: 'https://picsum.photos/500/500/?image=575' }} style={{ height: 340 }} /></View>
                <View><Image source={{ uri: 'https://picsum.photos/500/500/?image=576' }} style={{ height: 340 }} /></View>
                <View><Image source={{ uri: 'https://picsum.photos/500/500/?image=577' }} style={{ height: 340 }} /></View>
              </Carousel>
              {
                this.state.dataSource.map((data, i) => (
                  <Card key={i}>
                    <Image
                      style={{ height: 200, marginBottom: 10 }}
                      source={{ uri: data.picture }}
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>{data.name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{data.email}</Text>
                    <View>
                      <Text>{data.address}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                      <Button
                        raised
                        title='See Details'
                        buttonStyle={{
                          backgroundColor: "rgba(92, 99,216, 1)",
                          borderColor: "transparent",
                          borderWidth: 0,
                          borderRadius: 5,
                        }}
                      />
                    </View>
                  </Card>
                ))
              }
              <View style={styles.formContainer}>
                <TextInput style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType='email-address'
                  returnKeyType="next"
                  placeholder='Email or Mobile Num'
                  placeholderTextColor='rgba(225,225,225,0.7)' />

                <TextInput style={styles.input}
                  returnKeyType="go"
                  placeholder='Password'
                  placeholderTextColor='rgba(225,225,225,0.7)'
                  secureTextEntry />

                <TouchableOpacity style={styles.buttonContainer}
                  onPress={this.onButtonPress}>
                  <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
              </View>

              {/* <Text style={styles.title}>Add Item</Text>
          <TextInput
            style={styles.itemInput}
            onChangeText={this.handleChange}
          />
          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this.handleSubmit}
          >
            <Text
              style={styles.buttonText}>
              Add
              </Text>
          </TouchableHighlight> */}
            </View>
          }
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    flex: 1,
    backgroundColor: '#2a8ab7'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    padding: 4,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  formContainer: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});
