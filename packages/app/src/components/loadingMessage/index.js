import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from '@emotion/native'
import { Config } from '../../config'

const MessageContainer = styled.SafeAreaView`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.colors.orange};
`

const TextMessage = styled.Text`
  color: ${props => props.theme.colors.white};
  fontWeight: bold;
  fontSize: 14;
  marginBottom: 10;
`

export default class LoadingMessage extends Component {
  render () {
    const { subject } = this.props
    return (
      <MessageContainer>
        <TextMessage>
          Loading {subject}
        </TextMessage>
        <ActivityIndicator size="large" color={Config.theme.colors.white} />
      </MessageContainer>
    )
  }
}
