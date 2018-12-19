import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation';
// import EStyleSheet from 'react-native-extended-stylesheet';

class Pokemons extends Component {
  // let text = props.name.slice(0, 1).toUpperCase() + props.name.slice(1, props.name.length);
render(){
  return(
    <TouchableOpacity onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              pokemon: this.props.name,
            });
          }}>
        <View style={styles.right}>
          <Text style={styles.title}>{this.props.name.slice(0, 1).toUpperCase() + this.props.name.slice(1, this.props.name.length)}</Text>
        </View>
    </TouchableOpacity>
  )
  }
}

const styles = StyleSheet.create({
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3c5aa6',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
});

export default withNavigation(Pokemons);