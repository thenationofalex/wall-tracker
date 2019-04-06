import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import styled from '@emotion/native'

const StyledText = styled.Text`
  textAlign: center;
  paddingLeft: 2;
  paddingRight: 2;
`

const StyledLabel = styled.Text`
  color: ${props => props.theme.colors.grey};
`

const StyledWrapper = styled.View`
  backgroundColor: ${props => props.theme.colors.white};
  flex: 1,
  flexDirection: row;
  justifyContent: space-around;
  alignItems: center;
  height: 60;
`

export default class SessionMetaData extends Component {
  render () {
    const { numberOfClimbs, averageGrade, totalSession } = this.props
    return (
      <StyledWrapper>
        <View>
          <StyledText>
            { numberOfClimbs }{'\n'}
            <StyledLabel>
              Climbs
            </StyledLabel>
          </StyledText>
        </View>
        <View>
          <StyledText>
            { Math.round(averageGrade) }{'\n'}
            <StyledLabel>
              Average Grade
            </StyledLabel>
          </StyledText>
        </View>
        <View>
          <StyledText>
            { totalSession }{' \n'}
            <StyledLabel>
              Duration
            </StyledLabel>
          </StyledText>
        </View>
      </StyledWrapper>
    )
  }
}

SessionMetaData.defaultProps = {
  numberOfClimbs: 0,
  averageGrade: '0',
  totalSession: '0:00'
}

SessionMetaData.propTypes = {
  numberOfClimbs: PropTypes.number,
  averageGrade: PropTypes.any,
  totalSession: PropTypes.any
}
