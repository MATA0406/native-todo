import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      toDoValue: props.text,
      deleteToDo: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
      uncompleteToDo: PropTypes.func.isRequired,
      completeToDo: PropTypes.func.isRequired,
    };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  };

  handleTogleComplete = () => {
    const {isCompleted, uncompleteToDo, completeToDo, id} = this.props;

    if (isCompleted) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };

  handleStartEditing = () => {
    const {text} = this.props;

    this.setState({
      isEditing: true,
      toDoValue: text,
    });
  };

  handleFinishEditing = () => {
    this.setState({
      isEditing: false,
    });
  };

  handleControllInput = (text) => {
    this.setState({
      toDoValue: text,
    });
  };

  render() {
    const {isEditing, toDoValue} = this.state;
    const {text, id, deleteToDo, isCompleted} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.handleTogleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle,
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.input,
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}
              value={toDoValue}
              onChangeText={this.handleControllInput}
              multiline={true}
              returnKeyType={'done'}
              onBlur={this.handleFinishEditing}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}>
              {text}
            </Text>
          )}
        </View>

        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this.handleFinishEditing}>
              <View style={styles.actionContainer}>
                <Icon name="check" size={30} color="#62ff00" />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this.handleStartEditing}>
              <View style={styles.actionContainer}>
                <Icon name="edit-2" size={30} color="#62ff00" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
              <View style={styles.actionContainer}>
                <Icon name="trash" size={30} color="red" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // borderColor: 'red',
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  uncompletedCircle: {
    borderColor: '#F23657',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  uncompletedText: {
    color: '#353839',
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
    // justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5,
  },
});
