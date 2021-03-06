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
  AsyncStorage,
} from 'react-native';

import ToDo from './src/components/ToDo';

// import {AppLoading} from 'expo';

import uuidv1 from 'react-native-uuid';

const {width} = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newToDo: '',
    toDos: {},
    loadedToDos: false,
  };

  componentDidMount = () => {
    // AsyncStorage.clear();
    this._loadedToDos();
  };

  _changeNewToDo = (text) => {
    this.setState({
      newToDo: text,
    });
  };

  _loadedToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem('toDos');
      const parsedToDos = JSON.parse(toDos);
      console.log('parsedToDos :: ', parsedToDos);
      this.setState({loadedToDos: true, toDos: parsedToDos});
    } catch (err) {
      console.log('err :: ', err);
    }
  };

  _addToDo = () => {
    const {newToDo} = this.state;

    if (newToDo !== '') {
      this.setState((prevState) => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now(),
          },
        };

        const newState = {
          ...prevState,
          newToDo: '',
          toDos: {
            ...prevState.toDos,
            ...newToDoObject,
          },
        };

        this._saveTodos(newState.toDos);
        return {...newState};
      });
    }
  };

  _deleteToDo = (id) => {
    this.setState((prevState) => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };

      this._saveTodos(newState.toDos);
      return {...newState};
    });
  };

  _uncompleteToDo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false,
          },
        },
      };

      this._saveTodos(newState.toDos);
      return {...newState};
    });
  };

  _completeToDo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true,
          },
        },
      };

      this._saveTodos(newState.toDos);
      return {...newState};
    });
  };

  _updateTodo = (id, text) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text,
          },
        },
      };

      this._saveTodos(newState.toDos);
      return {...newState};
    });
  };

  _saveTodos = (newToDos) => {
    console.log(JSON.stringify(newToDos));
    const saveToDo = AsyncStorage.setItem('toDos', JSON.stringify(newToDos)); // 첫번째 인자: 키 두번째 인자: value
  };

  render() {
    const {newToDo, loadedToDos, toDos} = this.state;

    // if (!loadedToDos) {
    //   return <AppLoading />;
    // }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'New To Do'}
            value={newToDo}
            onChangeText={this._changeNewToDo}
            PlaceholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos)
              .reverse()
              .map((toDo) => (
                <ToDo
                  key={toDo.id}
                  {...toDo}
                  deleteToDo={this._deleteToDo}
                  uncompleteToDo={this._uncompleteToDo}
                  completeToDo={this._completeToDo}
                  updateTodo={this._updateTodo}
                />
              ))}
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
    // height: height - 25,
  },
});
