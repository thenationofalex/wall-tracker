import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import { Badge } from 'react-native-elements'
import Picker from 'react-native-picker'
import styled from '@emotion/native'
import { range } from 'lodash'

const minutesTaken = ['Minutes'].concat(range(60))
const secondsTaken = ['Seconds'].concat(range(60))

const pickerData = [  
  minutesTaken,
  secondsTaken
]

const StyledDurationWrapper = styled.View`
  marginTop: 30;
  marginLeft: 20;
  display: flex;
  justifyContent: space-between;
  flexDirection: row;
  width: 90%;
`

const StyledText = styled.TouchableOpacity`
  paddingBottom: ${props => props.theme.padding.default};
  color: ${props => props.theme.colors.white};
  fontWeight: bold;
`

export default class DurationSelector extends Component {
  showDatePicker() {
    Picker.init({
        pickerCancelBtnText: 'Cancel',
        pickerTitleText: 'Please Select',
        pickerConfirmBtnText: 'Confirm',
        pickerData,
        pickerFontColor: [255, 0 ,0, 1],
        onPickerConfirm: (pickedValue) => {
          const mins = pickedValue[0] !== 'Minutes' ? pickedValue[0] * 60 : 0
          const secs = pickedValue[1] !== 'Seconds' ? pickedValue[1] : 0
          this.props.onChangeText({ timeTaken: mins + secs })
        }
    })
    Picker.show()
  }
  toggle() {
    Picker.toggle()
  }
  render () {
    const { title, subtitle } = this.props
    return (
      <StyledDurationWrapper>
        <StyledText>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{ title }</Text>
        </StyledText>
        <StyledText>
          <Badge value={subtitle} textStyle={{ fontWeight: 'bold' }} onPress={this.showDatePicker.bind(this)} />
        </StyledText>
      </StyledDurationWrapper>
    )
  }
}

DurationSelector.defaultProps = {
  title: 'Duration Selection',
  subtitle: 'Stopwatch'
}

DurationSelector.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}
