import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default PokemonListLayout = (props) => {
  return(
    <View>
      <Text style={ styles.title }>{props.title}</Text>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingVertical: 10,
    flex: 1,
    backgroundColor:'blue',
  },
  title:{
    color:'#4c4c4c',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 8,
    textAlign:'center',
  }
});