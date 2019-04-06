
import React, { Component } from 'react'
import { View } from 'react-native'
import { concat } from 'lodash'

import CameraView from '../components/camera'
import { Config } from '../config'

export default class SelectImageScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Select Image'
    }
  }
  state = {
    selected: []
  }

  // Take photo
  getImageFromCamera = (image) => {
    const { navigation } = this.props
    const gym = navigation.getParam('gym')
    const sessionId = navigation.getParam('id')

    image.playableDuration = 0
    const updatedImageList = concat([image], this.state.selected)
    this.setState({
      selected: updatedImageList,
    })

    navigation.navigate(Config.routes.NewBeta, {
      id: sessionId,
      gym,
      imagesToUpload: this.state.selected
    })
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <CameraView callback={this.getImageFromCamera} />
      </View>
    )
  }
}
