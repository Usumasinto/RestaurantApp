import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native"
import {Restaurant, OrderDeliv, Home} from './screens'
import Tabs from './navigation/tabs'
const Stack = createStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      
      <Stack.Navigator
        screenOptions= {{
          headerShown: false,
        }}
        initialRouteName={"index"}
        
      >
        <Stack.Screen name="Home" component={Home,Tabs} />
        <Stack.Screen name="Restaurant" component={Tabs} />
        <Stack.Screen name="OrderDeliv" component={Tabs} />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}
export default App;