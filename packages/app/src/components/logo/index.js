import React from 'react'
import styled from '@emotion/native'

const StyledImage = styled.Image`
  marginTop: -80;
  width: 120;
  height: 120;
`

export const Logo = () => <StyledImage source={require('../../assets/mountain.png')} />
