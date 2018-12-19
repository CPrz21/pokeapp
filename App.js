import React from 'react';
import {
  View,
  StatusBar
} from 'react-native';
import AppNavigator from './src/screens/appNavigator';
import Header from './src/components/header'
export default class App extends React.Component {
  render() {
    StatusBar.setBackgroundColor('#3c5aa6', true);
    return (
      <AppNavigator />
    );
  }
}