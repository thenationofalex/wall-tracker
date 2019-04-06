import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { ThemeProvider } from 'emotion-theming'
import SplashScreen from 'react-native-splash-screen'

import { Config } from './config'
import { ApiClient } from './graph'
import HomeScreen from './screens/Home'
import SessionScreen from './screens/PastSession'
import AllSessionsScreen from './screens/AllSessions'
import NewSessionScreen from './screens/NewSession'
import InProgressSession from './screens/InProgressSession'
import NewBetaScreen from './screens/NewBeta'
import SelectImageScreen from './screens/SelectImage'
import SettingScreen from './screens/Settings'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    AllSessions: AllSessionsScreen,
    Session: SessionScreen,
    NewSession: NewSessionScreen,
    InProgress: InProgressSession,
    NewBeta: NewBetaScreen,
    SelectImage: SelectImageScreen,
    Settings: SettingScreen
  },
  {
    initialRouteName: Config.routes.Home,
    defaultNavigationOptions: {
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: Config.theme.colors.orange,
      },
      headerTintColor: Config.theme.colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render () {
    return (
      <ApolloProvider client={ApiClient}>
        <ThemeProvider theme={Config.theme}>
          <AppContainer />
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}
