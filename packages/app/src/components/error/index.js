import React from 'react'
import styled from '@emotion/native'

const StyledErrorWrapper = styled.View`
  textAlign: center;
  paddingVertical: ${props => props.theme.padding.default};
  paddingHorizontal: ${props => props.theme.padding.default};
`

const StyledText = styled.Text`
  color: ${props => props.theme.colors.white};
`

export const ErrorMessage = props => <StyledErrorWrapper>
  <StyledText>{ props.children }</StyledText>
</StyledErrorWrapper>
