import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class pokemonDetailsRow extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    marginLeft: 50,
    marginRight: 50,
  },
  label:{
    fontSize:20,
    fontWeight:'bold',
    marginRight: 5,
  },
  text:{
    fontSize:20,
    flexWrap: 'wrap',
  }
});