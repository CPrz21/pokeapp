import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage
} from 'react-native'
import { withNavigation } from 'react-navigation';
// import EStyleSheet from 'react-native-extended-stylesheet';

class Favorites extends Component {

componentDidMount(){

}

deleteFavorite = async (item) => {
  this.props.fnRemove(item);
}
render(){
  return(
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Image style={styles.image} source={{uri : this.props.image}} />
        <Text style={styles.title}>{this.props.name}</Text>
      </View>
      <Button
        onPress={() => this.deleteFavorite(this.props.name)}
        title="Remove"
        color="red"
      />
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  containerInfo:{
    flexDirection:'row',
    alignItems: 'center',
  },
  image:{
    width:100,
    height:100
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

export default withNavigation(Favorites);