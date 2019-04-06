import styled from '@emotion/native'
import { Config } from '../../config'

export const MainTitle = styled.Text`
  fontSize: 32;
  fontWeight: bold;
  marginHorizontal: ${props => props.theme.padding.default};
  marginVertical: ${props => props.theme.padding.default};
  textAlign: center;
  color: ${props => props.theme.colors.white};
`
