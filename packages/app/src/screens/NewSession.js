import React, { Component } from 'react'
import { View } from 'react-native'
import { FormInput, FormLabel } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'

import { Config } from '../config'
import { ApiClient } from '../graph'
import { MUTATION_ADD_SESSION } from '../graph/mutation'
import { ACTIVE_SESSION_QUERY } from '../graph/queries'
import { FormContainer } from '../components/container'
import { Button, ButtonText } from '../components/button'
import Overlay from '../components/overlay'

const InputStyle = {
  color: Config.theme.colors.white,
  borderBottomColor: Config.theme.colors.white
}

const LabelStyle = {
  color: Config.theme.colors.white,
  paddingBottom: 10,
  paddingTop: 10
}
export default class NewSessionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'New Session'
    }
  }
  constructor (props) {
    super (props)
    this.state = { disabled: true }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.executeSessionStart = this.executeSessionStart.bind(this)
  }
  handleInputChange (payload) {
    if (this.state.disabled) {
      this.setState({disabled: false})
    }
    this.setState(payload)
  }
  executeSessionStart (navigation) {
    const { gym, feeling } = this.state
    const deviceId = DeviceInfo.getUniqueID()
    navigation.setParams({ loader: true })

    ApiClient.mutate({
      mutation: MUTATION_ADD_SESSION,
      variables: { gym, feeling, deviceId },
      refetchQueries: [
        {
          query: ACTIVE_SESSION_QUERY,
          variables: { deviceId }
        }
      ]
    })
      .then(resp => {
        navigation.setParams({ loader: false })
        navigation.navigate(Config.routes.InProgress, {
          id: resp.data.addSession._id,
          gym
        })
      })
      .catch(e => console.log(`Error:`, e))
  }
  render () {
    const { navigation } = this.props
    return (
      <FormContainer>
        <Overlay visible={navigation.getParam('loader')} />
        <View style={{ width: '90%' }}>
          <FormLabel labelStyle={LabelStyle}>
            Where are we today?
          </FormLabel>
          <FormInput
            name='gym'
            inputStyle={InputStyle}
            value={this.state.gym}
            onChangeText={(text) => this.handleInputChange({'gym': text})}
          />
          <FormLabel labelStyle={LabelStyle}>
            How are you feeling?
          </FormLabel>
          <FormInput
            name='feeling'
            multiline={true}
            numberOfLines={4}
            inputStyle={InputStyle}
            value={this.state.feeling}
            onChangeText={(text) => this.handleInputChange({'feeling': text})}
          />
          <View style={{
            paddingTop: 20,
            paddingLeft: 10
          }}>
            <Button
              disabled={this.state.disabled}
              onPress={() => this.executeSessionStart(navigation)}
            >
              <ButtonText>
                Start Session
              </ButtonText>
            </Button>
          </View>
        </View>
      </FormContainer>
    )
  }
}
