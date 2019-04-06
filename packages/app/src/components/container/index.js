import styled from '@emotion/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  flexDirection: ${props => props.top ? 'row' : 'column' };
  justifyContent: center;
  alignItems: ${props => props.top ? 'flex-start' : 'center'};
  backgroundColor: ${props => props.theme.colors.orange};
`

export const ListContainer = styled.SafeAreaView`
  flex: 1;
  backgroundColor: ${props => props.theme.colors.orange};
`

export const FormContainer = styled.SafeAreaView`
  flex: 1;
  flexDirection: row;
  justifyContent: center;
  alignItems: flex-start;
  backgroundColor: ${props => props.theme.colors.orange};
`
