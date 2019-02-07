import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { View, Platform } from "react-native";
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import Decks from "./components/Decks";
import NewDeck from "./components/NewDeck";

const store = createStore(reducer, middleware);

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

const TabsContainer = createAppContainer(Tabs);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <TabsContainer/>
        </View>
      </Provider>
    );
  }
}