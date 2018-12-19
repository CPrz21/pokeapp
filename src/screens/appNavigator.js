// import { createStackNavigator } from 'react-navigation';
// import Home from '../screens/pokemon-details';

// const AppNavigator = createStackNavigator({
//   Home: { screen: Home },
// });

// export default AppNavigator;


import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';
import Home from '../screens/main-pokemon-list';
import Details from '../screens/pokemon-details';

const RootStack = createStackNavigator({
    Home: {
      screen: Home
    },
    Details: {
      screen: Details
    }
  });

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;