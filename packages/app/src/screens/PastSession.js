import React, { Component } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Query } from 'react-apollo'
import { HeaderBackButton } from 'react-navigation'
import DeviceInfo from 'react-native-device-info'

import { Config } from '../config' 
import { ApiClient } from '../graph'
import { ALL_RECORDS_QUERY, ALL_SESSIONS_QUERY } from '../graph/queries'
import { MUTATION_DELETE_SESSION } from '../graph/mutation'
import fmtMSS from '../lib/formatDuration'
import { ErrorMessage } from '../components/error'
import { ListContainer } from '../components/container'
import LoadingMessage from '../components/loadingMessage'
import Overlay from '../components/overlay'
import BetaList from '../components/betaList'
import NoClimbs from '../components/noClimbs'
import SessionMetaData from '../components/sessionMetaData'

const ALERT_DELETE_SESSION = (navigation, id) => (
  Alert.alert(
    'Delete Session?',
    'All climbs will be deleted.',
    [
      { text: 'Cancel', onPress: () => {} },
      { text: 'OK',
        onPress: () => {
          navigation.setParams({ loader: true })
          ApiClient.mutate({
            mutation: MUTATION_DELETE_SESSION,
            variables: { id },
            refetchQueries: [
              {
                query: ALL_SESSIONS_QUERY,
                variables: {
                  deviceId: DeviceInfo.getUniqueID()
                }
              }
            ]
          })
            .then(data => {
              navigation.setParams({ loader: false })
              if (data.data.deleteSession.success) {
                navigation.navigate(Config.routes.AllSessions) 
              }
            })
            .catch(e => console.log(e))
        }
      }
    ],
    { cancelable: true }
  )
)
export default class SessionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('gym'),
      headerLeft: (
        <HeaderBackButton
          title='Back'
          tintColor={ Config.theme.colors.white }
          onPress={ ()=> {
            navigation.navigate(Config.routes.AllSessions)
          }}
        />
      ),
      headerRight: (
        <Icon
          onPress={() => { ALERT_DELETE_SESSION(navigation, navigation.getParam('id')) }}
          name='delete'
          color="#fff"
        />
      )
    }
  }

  render () {
    const { navigation } = this.props
    const id = navigation.getParam('id')
    
    return (
      <ListContainer>
        <Overlay visible={navigation.getParam('loader')} />
        <Query query={ALL_RECORDS_QUERY} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <LoadingMessage subject={`sessions for ${navigation.getParam('gym')}`} />
              )
            }

            if (error) {
              return (
                <ErrorMessage>
                  Error loading sessions! - ${JSON.stringify(error)}
                </ErrorMessage>
              )
            }

            if (data.allRecords.length === 0) {
              return (
                <NoClimbs />
              )
            }

            const metaData = {
              numberOfClimbs: data.allRecords.length,
              averageGrade: 0,
              totalSession: 0
            }

            for (let i = 0; i < data.allRecords.length; i++) {
              metaData.averageGrade = ( metaData.averageGrade + data.allRecords[i].grade )
              metaData.totalSession = ( metaData.totalSession + ( data.allRecords[i].timeTaken / 1000 ) )
            }

            
            metaData.averageGrade = (metaData.averageGrade / data.allRecords.length)
            metaData.totalSession = fmtMSS(metaData.totalSession)


            return (
              <View>
                <SessionMetaData { ...metaData } />
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
              </View>
            )
          }}
        </Query>
      </ListContainer>
    )
  }
}
