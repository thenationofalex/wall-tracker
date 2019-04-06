import styled from '@emotion/native'
import { StyleSheet } from 'react-native'

export const RoundedImageContainer = styled.View`
  display: flex;
  paddingHorizontal: 20;
  paddingTop: 20;
  flex: 1;
  flexDirection: row;
  justifyContent: flex-start;
`

export const RoundedImage = styled.Image`
  width: 70;
  height: 70;
`

export const RoundedWrapper = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
    borderRadius: 40,
    borderWidth: 0,
    borderColor: '#d6d7da',
    overflow: 'hidden',
    marginRight: 10
  }
})
