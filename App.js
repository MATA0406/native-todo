/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Text,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

import ToDo from './src/components/ToDo';

const {height, width} = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newToDo: '',
  };

  handleChangeNewToDo = (text) => {
    this.setState({
      newToDo: text,
    });
  };
  render() {
    const {newToDo} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'New To Do'}
            value={newToDo}
            onChangeText={this.handleChangeNewToDo}
            PlaceholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    // fontWeight: '200',
    fontWeight: '200',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
  },
  toDos: {
    alignItems: 'center',
    height: height - 25,
  },
});
