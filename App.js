import React from 'react';
import { View, Platform, StatusBar, Text, StyleSheet } from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { setLocalNotification } from './utils/notifications';
import { baseColorPrimary, textColorPrimary, textColorSecondary } from './utils/colors';

import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';

const store = createStore(reducer, middleware);

function FlashcardStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const RouteConfigs = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks'
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    },
  }
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: textColorPrimary,
    inactiveTintColor: textColorSecondary,
    style: {
      backgroundColor: baseColorPrimary,
    },
    labelStyle: {
      fontSize: 17,
      fontWeight: 'bold',
      padding: 10
    }
  }
};

const Tabs =
Platform.OS === 'ios'
? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
: createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: textColorPrimary,
      headerStyle: {
        backgroundColor: baseColorPrimary,
        marginTop: -20,
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: textColorPrimary,
      headerStyle: {
        backgroundColor: baseColorPrimary,
        marginTop: -20,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: textColorPrimary,
      headerStyle: {
        backgroundColor: baseColorPrimary,
        marginTop: -20,
      }
    }
  }
})

const StackContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FlashcardStatusBar backgroundColor={baseColorPrimary} barStyle='dark-content' />
          <Text style={styles.header}>UdaciFlashcards</Text>
          <StackContainer/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: baseColorPrimary
  },
  header: {
    alignSelf: 'center',
    color: textColorPrimary,
    fontSize: 20,
    padding:10,
    fontWeight: 'bold'
  }
});