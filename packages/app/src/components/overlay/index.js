import React, { Component } from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import styled from '@emotion/native'
import { Config } from '../../config'

const { width, height } = Dimensions.get('window')

const MessageContainer = styled.SafeAreaView`
  flex: 1,
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.colors.opaqueBlack};
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${width};
  height: ${height};
  zIndex: 100;
  display: ${props => props.visible ? 'flex' : 'none'};
`

const TextMessage = styled.Text({
  color: Config.theme.colors.white,
  fontWeight: 'bold',
  fontSize: 14,
  marginBottom: 10
})

export default class Overlay extends Component {
  render () {
    return (
      <MessageContainer visible={this.props.visible}>
        <TextMessage>
          Updating
        </TextMessage>
        <ActivityIndicator size="large" color={Config.theme.colors.white} />
      </MessageContainer>
    )
  }
}
