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
render(){
  return(
    <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Details', {
              pokemon: this.props.name,
            });
          }}>
        <View style={styles.right}>
          <Image style={{width:40, height:40, marginLeft:10, resizeMode:'contain'}} source={require('../assets/img/Poke_ball_Single_Front_large.png')}/>
          <Text style={styles.title}>{this.props.name.slice(0, 1).toUpperCase() + this.props.name.slice(1, this.props.name.length)}</Text>
        </View>
    </TouchableOpacity>
  )
  }
}

const styles = StyleSheet.create({
  right:{
    flexDirection:'row',
    alignItems: 'center',
  },
  title:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3c5aa6',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
});

export default withNavigation(Pokemons);