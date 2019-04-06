import styled from '@emotion/native'
import { Config } from '../../config' 

export const SessionView = styled.View`
  backgroundColor: ${props => props.theme.colors.white};
  paddingHorizontal: ${props => props.theme.padding.default};
  paddingVertical: 10;
  width: 100%;
  `

export const StyledKeyText = styled.Text({
  fontWeight: 'bold'
})

export const StyledRow = styled.View({
  flexWrap: 'wrap', 
  alignItems: 'flex-start',
  flexDirection:'row',
  marginBottom: 4
})
