import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default Header = (props) => {
  return(
    <View>
      <SafeAreaView>
        <View style={style.container}>
          <Image
          source={require('../assets/img/Pokemon-logo.png')}
          style={style.logo}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    padding: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#2a75bb',
  },
  logo:{
    width: 80,
    height: 26,
    resizeMode:'contain'
  },
  right:{

  }
});

