import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { View, Text } from "react-native";

const store = createStore(reducer, middleware);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>This is app</Text> 
        </View>
      </Provider>
    );
  }
}