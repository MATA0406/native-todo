import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

export default class ToDo extends React.Component {
  state = {
    isEditing: false,
    isCompleted: false,
  };

  handleTogleComplete = () => {
    this.setState((prevState) => {
      return {
        isCompleted: !prevState.isCompleted,
        // isEditing: !prevState.isEditing,
      };
    });
  };

  handleStartEditing = () => {
    this.setState({
      isEditing: true,
    });
  };

  handleFinishEditing = () => {
    this.setState({
      isEditing: false,
    });
  };

  render() {
    const {isCompleted, isEditing} = this.state;
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
          <Text
            style={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText,
            ]}>
            Hello I'm a To Do
          </Text>
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this.handleFinishEditing}>
              <View style={styles.actionContainer}>
                {/* <Text style={styles.actionText}> */}
                <Icon name="check" size={30} color="#62ff00" />
                {/* </Text> */}
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this.handleStartEditing}>
              <View style={styles.actionContainer}>
                {/* <Text style={styles.actionText}> */}
                <Icon name="edit-2" size={30} color="#62ff00" />
                {/* </Text> */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                {/* <Text style={styles.actionText}>Delete</Text> */}
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
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
