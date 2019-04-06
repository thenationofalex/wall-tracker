import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, ScrollView, Alert } from 'react-native'
import { Query } from 'react-apollo'
import TabNavigator from 'react-native-tab-navigator'
import { Icon } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'

import { Config } from '../config'
import { ApiClient } from '../graph'
import { ACTIVE_SESSION_QUERY, ALL_RECORDS_QUERY, ALL_SESSIONS_QUERY } from '../graph/queries'
import { MUTATION_END_SESSION } from '../graph/mutation.js'
import { ListContainer } from '../components/container'
import LoadingMessage from '../components/loadingMessage'
import Overlay from '../components/overlay'
import NoClimbs from '../components/noClimbs'
import BetaList from '../components/betaList'

const ALERT_END_SESSION = (navigation, id) => (
  Alert.alert(
    'End Session?',
    '',
    [
      { text: 'Cancel', onPress: () => {} },
      { text: 'OK',
        onPress: () => {
          navigation.setParams({ loader: true })
          ApiClient.mutate({
            mutation: MUTATION_END_SESSION,
            variables: { id },
            refetchQueries: [
              {
                query: ACTIVE_SESSION_QUERY
              },
              {
                query: ALL_SESSIONS_QUERY,
                variables: {
                  deviceId: DeviceInfo.getUniqueID()
                }
              }
            ]
          })
            .then(() => {
              navigation.setParams({ loader: false })
              navigation.navigate(Config.routes.Session, {
                id,
                gym: navigation.getParam('gym')
              })
            })
            .catch(e => console.log(e))
        }
      }
    ],
    { cancelable: true }
  )
)

export default class InProgressSession extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('gym')
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'current'
    }
  }

  render () {
    const { navigation } = this.props
    const id = navigation.getParam('id')
    const gym = navigation.getParam('gym')
    
    const { selectedTab } = this.state

    return (
      <ListContainer>
        <Overlay visible={navigation.getParam('loader')} />
          <TabNavigator>
            <TabNavigator.Item
              selected={selectedTab === 'current'}
              title='New Climb'
              allowFontScaling={true}
              renderIcon={
                () => <Icon 
                  color={Config.theme.colors.opaqueBlack}
                  name='playlist-add'
                />}
              onPress={
                () => {
                  navigation.navigate(Config.routes.NewBeta, {
                    id, gym
                  })
                }
              }
            >
              <Query query={ALL_RECORDS_QUERY} variables={{ id, deviceId: DeviceInfo.getUniqueID() }}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return (
                      <LoadingMessage subject={`sessions for ${navigation.getParam('gym')}`} />
                    )
                  }

                  if (error) {
                    return (
                      <View>
                        <Text>Error loading in progress sessions - ${JSON.stringify(error)}</Text>
                      </View>
                    )
                  }

                  if (data.allRecords.length === 0) {
                    return (
                      <NoClimbs />
                    )
                  }

                  return (
                    <ScrollView>
                      {
                        data.allRecords.map(beta => (
                          <BetaList
                            key={beta._id}
                            beta={beta}
                            sessionId={navigation.getParam('id')}
                            navigation={navigation}
                          />
                        ))
                      }
                    </ScrollView>
                  )
                }}
              </Query>
            </TabNavigator.Item>
            <TabNavigator.Item 
              title='Finish Session'
              allowFontScaling={true}
              renderIcon={
                () => <Icon 
                  color={Config.theme.colors.opaqueBlack}
                  name='block'
                />
              }
              onPress={
                () => {  ALERT_END_SESSION(navigation, navigation.getParam('id')) }
              }
            />
          </TabNavigator>
      </ListContainer>
    )
  }
}

InProgressSession.propTypes = {
  navigation: PropTypes.object
}
