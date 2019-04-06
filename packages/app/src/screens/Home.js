import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import DeviceInfo from 'react-native-device-info'
import { Text, TouchableOpacity } from 'react-native'

import { Config } from '../config'
import { ACTIVE_SESSION_QUERY } from '../graph/queries'
import { Button, ButtonText } from '../components/button'
import { Container } from '../components/container'
import { ErrorMessage } from '../components/error'
import { MainTitle } from '../components/mainTitle'
import { Logo } from '../components/logo'
export default class HomeScreen extends Component {
  render () {
    const { navigation } = this.props
    const deviceId = DeviceInfo.getUniqueID()
    return (
      <Container>
        <Logo />
        <MainTitle>
          { Config.appName }
        </MainTitle>
        <Query query={ACTIVE_SESSION_QUERY} variables={{ deviceId }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <Button disabled>
                  <ButtonText>
                    Checking for active sessions
                  </ButtonText>
                </Button>
              )
            }

            if (error) {
              return (
                <ErrorMessage>
                  Error connecting to API.
                </ErrorMessage>
              )
            }

            if (data && data.activeSession) {
              return (
                <Fragment>
                  <Button onPress={() => {
                    navigation.navigate(Config.routes.InProgress, {
                      id: data.activeSession._id,
                      gym: data.activeSession.gym
                    })
                  }}>
                    <ButtonText>
                      Resume {data.activeSession.gym} session
                    </ButtonText>
                  </Button>

                  <Button onPress={() => { navigation.navigate(Config.routes.AllSessions) }}>
                    <ButtonText>Past Sessions</ButtonText>
                  </Button>
                </Fragment>
              )
            } else if (data) {
              return (
                <Fragment>
                  <Button onPress={() => { navigation.navigate(Config.routes.NewSession) }}>
                    <ButtonText>New Session</ButtonText>
                  </Button>
                  <Button onPress={() => { navigation.navigate(Config.routes.AllSessions) }}>
                    <ButtonText>Past Sessions</ButtonText>
                  </Button>
                </Fragment>
              )
            }
          }}
        </Query>
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 50 }}
          onPress={() => { navigation.navigate(Config.routes.Settings) }}
        >
          <Text style={{ color: 'white'}}>
            Settings
          </Text>
        </TouchableOpacity>
      </Container>
    )
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object
}
