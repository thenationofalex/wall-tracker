import React, { Component } from 'react'
import { CameraRoll } from 'react-native'
import { RNCamera } from 'react-native-camera'
import styled from '@emotion/native'

const StyledContainer = styled.View`
  flex: 1;
  flexDirection: column;
  backgroundColor: transparent;
`

const ButtonHolder = styled.TouchableOpacity`
  paddingVertical: 20;
  backgroundColor: ${props => props.theme.colors.orange};
  alignSelf: center;
  width: 50%;
  marginBottom: 20;
  borderBottomLeftRadius: 15;
  borderBottomRightRadius: 15;
  borderTopLeftRadius: 15;
  borderTopRightRadius: 15;
  overflow: hidden;
  position: absolute;
  bottom: 5%;
`
  
const ButtonText = styled.Text`
  textAlign: center;
  fontSize: 14;
  fontWeight: bold;
  color: ${props => props.theme.colors.white};
`

export default class CameraView extends Component {
  takePicture = async (camera) => {
    const { callback } = this.props
    const opts = { quality: .75, base64: false }
    const data = await camera.takePictureAsync(opts)
    CameraRoll.saveToCameraRoll(data.uri, 'photo')
    data.filename = data.uri.split('/')[data.uri.split('/').length - 1]
    data.isStored = true
    callback(data)
  }
  render () {
    return (
      <StyledContainer>
        <RNCamera
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera please'}
        >
        {({ camera }) => {
          return (
            <ButtonHolder onPress={() => this.takePicture(camera)}>
              <ButtonText>Take Photo</ButtonText>
            </ButtonHolder>
          )
        }}
        </RNCamera>
      </StyledContainer>
    )
  }
}
