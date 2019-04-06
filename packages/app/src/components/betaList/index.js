import React, { Component } from 'react'
import { Animated, View, Text, Dimensions, ScrollView, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

import { Config } from '../../config'
import { ApiClient } from '../../graph'
import { MUTATION_DELETE_BETA } from '../../graph/mutation'
import { ALL_RECORDS_QUERY } from '../../graph/queries'

import ProgressiveImage from '../progressiveImage'
import { SessionView, StyledKeyText, StyledRow } from '../sessionView'
import ViewMoreText from '../ViewMoreText'
import fmtMSS from '../../lib/formatDuration'

const { width } = Dimensions.get('window')

const ALERT_DELETE_CLIMB = (id, sessionId, navigation) => (
  Alert.alert(
    'Delete Climb?',
    'Are you sure you want to delete this climb?',
    [
      { text: 'Cancel', onPress: () => {} },
      { text: 'OK',
        onPress: () => {
          navigation.setParams({ loader: true })
          ApiClient.mutate({
            mutation: MUTATION_DELETE_BETA,
            variables: { id },
            refetchQueries: [
              {
                query: ALL_RECORDS_QUERY,
                variables: { id: sessionId }
              }
            ]
          })
            .then(() => {
              navigation.setParams({ loader: false })
            })
            .catch(e => console.log(e))
        }
      }
    ]
  )
)

export default class BetaList extends Component {
  scrollX = new Animated.Value(0)

  renderViewMore(onPress) {
    return(
      <Text style={{ paddingTop: 4, color: Config.theme.colors.blue }} onPress={onPress}>View more</Text>
    )
  }

  renderViewLess(onPress) {
    return(
      <Text style={{ paddingTop: 4, color: Config.theme.colors.blue }} onPress={onPress}>View less</Text>
    )
  }

  render () {
    const { _id, image, name, grade, timeTaken, completed, notes, color } = this.props.beta
    const { navigation, sessionId } = this.props
    let position = Animated.divide(this.scrollX, width)
    
    return (
      <View key={_id}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={ Animated.event( [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] ) }
        >
          {
            image.length > 0 ? (
              image.map((i, idx) => (
                <ProgressiveImage
                  key={idx}
                  source={{ uri: i }}
                  style={{ width, height: width }}
                  resizeMode="cover"
                />
              ))
            ) : (
              <ProgressiveImage
                source={require('../../assets/mountain.png')}
                style={{ width, height: width, marginBottom: 15 }}
                resizeMode="cover"
              />
            )
          }
        </ScrollView>
        <SessionView>
          {
            image && (
              <View style={{ 
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15
              }}>
                <View style={{ flexDirection: 'row' }}>
                  {image.map((_, i) => {
                    let opacity = position.interpolate({
                      inputRange: [i - 1, i, i + 1],
                      outputRange: [0.3, 1, 0.3],
                      extrapolate: 'clamp'
                    })
                    return (
                      <Animated.View
                        key={i}
                        style={{ 
                          opacity,
                          height: 10,
                          width: 10,
                          backgroundColor: Config.theme.colors.blue,
                          margin: 4,
                          borderRadius: 5
                        }}
                      />
                    )
                  })}
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', right: 0, paddingTop: image.length > 0 ? 0 : 15 }}>
                  <Icon
                    color={Config.theme.colors.opaqueBlack}
                    name='delete'
                    onPress={() => ALERT_DELETE_CLIMB(_id, sessionId, navigation)}
                  />
                </View>
              </View>
            )
          }
          {
            name && (
              <StyledRow>
                <StyledKeyText>Route name:</StyledKeyText><Text> { name }</Text>
              </StyledRow>
            )
          }
          {
            grade && (
              <StyledRow>
                <StyledKeyText>Grade:</StyledKeyText><Text> { color.toUpperCase() || '' } { grade }</Text>
              </StyledRow>
            )
          }
          {
            timeTaken.toString() && ( 
            <StyledRow>
              <StyledKeyText>Time taken:</StyledKeyText><Text> { fmtMSS(timeTaken / 1000) }</Text>
            </StyledRow>                            
            )
          }
          {
            <StyledRow>
              <StyledKeyText>Completed:</StyledKeyText><Text> { completed ? 'Yes' : 'No' }</Text>
            </StyledRow>
          }
          {
            notes.length > 0 && (
              <StyledRow>
                <ViewMoreText
                  numberOfLines={3}
                  renderViewMore={this.renderViewMore}
                  renderViewLess={this.renderViewLess}
                >{ notes }</ViewMoreText>
              </StyledRow>
            )
          }
        </SessionView>
    </View>
    )
  }
}

BetaList.defaultProps = {
  beta: {
    color: '#000'
  }
}

BetaList.propTypes = {
  beta: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.array,
    name: PropTypes.string,
    grade: PropTypes.number,
    timeTaken: PropTypes.number,
    completed: PropTypes.bool,
    notes: PropTypes.string,
    color: PropTypes.string
  }),
  sessionId: PropTypes.string,
  navigation: PropTypes.any.isRequired
}
