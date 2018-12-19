import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';
import Home from '../screens/main-pokemon-list';
import Details from '../screens/pokemon-details';
import Favorites from '../screens/pokemon-favorites'

const RootStack = createStackNavigator({
    Home: {
      screen: Home
    },
    Details: {
      screen: Details
    },
    Favorites: {
      screen: Favorites
    }
  });

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;