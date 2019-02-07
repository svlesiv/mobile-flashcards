import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { View, Platform, StatusBar } from "react-native";
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import { Constants } from "expo";

import Decks from "./components/Decks";
import NewDeck from "./components/NewDeck";
import Deck from "./components/Deck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";

const store = createStore(reducer, middleware);

function FlashcardStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: "Decks",
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "New Deck",
    },
  }
};
  
const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? 'green' : 'blue',
    style: {
      backgroundColor: 'white',
    }
  }
};

const Tabs =
Platform.OS === "ios"
? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
: createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'green',
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'green',
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'green',
      }
    }
  }
})

const StackContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashcardStatusBar backgroundColor={'green'} barStyle="dark-content" />
          <StackContainer/>
        </View>
      </Provider>
    );
  }
}