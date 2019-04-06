import styled from '@emotion/native'

export const Button = styled.TouchableOpacity`
  width: ${props => props.full ? '92%' : '80%'};
  height: 60;
  marginTop: 10;
  marginLeft: 10;
  backgroundColor: ${props => props.disabled ? props.theme.colors.opaqueWhite : props.theme.colors.white};
`

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.orange};
  textTransform: uppercase;
  textAlign: center;
  lineHeight: 60;
  fontSize: 14;
  fontWeight: bold;
}`
