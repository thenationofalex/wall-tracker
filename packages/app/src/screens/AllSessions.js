import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { HeaderBackButton } from 'react-navigation'
import moment from 'moment'
import { Query } from 'react-apollo'
import DeviceInfo from 'react-native-device-info'

import { Config } from '../config'
import { ErrorMessage } from '../components/error'
import { ListContainer } from '../components/container'
import LoadingMessage from '../components/loadingMessage'
import { ALL_SESSIONS_QUERY } from '../graph/queries'

export default class AllSessionsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Past Sessions',
      headerLeft: (
        <HeaderBackButton
          title='Back'
          tintColor={ Config.theme.colors.white }
          onPress={ ()=> {
            navigation.navigate(Config.routes.Home)
          }}
        />
      )
    }
  };
  render () {
    const { navigation } = this.props
    return (
      <ListContainer>
        <Query query={ALL_SESSIONS_QUERY} variables={{ deviceId: DeviceInfo.getUniqueID() }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (<LoadingMessage subject='sessions' />)
            }

            if (error) {
              return (
                <ErrorMessage>
                  Error loading all sessions - ${JSON.stringify(error)}
                </ErrorMessage>
              )
            }

            return (
              <ScrollView>
               {
                data.allSessions.map(session => (
                  <ListItem
                    key={session._id}
                    roundAvatar
                    avatar={{uri: session.image }}
                    onPress={() => {
                      navigation.navigate(Config.routes.Session, {
                        id: session._id,
                        gym: session.gym,
                        date: moment.unix(session.createdAt / 1000).format('MMM Do YY')
                      })
                    }}
                    title={`${ moment.unix(session.createdAt / 1000).format('MMM Do YY') } @ ${ session.gym }`}
                    containerStyle={{
                      backgroundColor: Config.theme.colors.white
                    }}
                    />
                ))
               }
              </ScrollView>
            )
          }}
        </Query>
      </ListContainer>
    )
  }
}

AllSessionsScreen.propTypes = {
  navigation: PropTypes.object
}
