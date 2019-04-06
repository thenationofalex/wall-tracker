import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'

import { Container } from '../components/container'
import { Config } from '../config'

const list = [
  {
    label: 'Version',
    text: Config.version
  },
  {
    label: 'Support',
    text: Config.siteUrl
  },
  {
    label: 'Support Token',
    text: process.env.NODE_ENV.toUpperCase() + '-' + DeviceInfo.getUniqueID()
  }
]


export default class SettingScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Settings'
    }
  }
  render () {

    return (
      <Container top>
        <ScrollView style={{ marginTop: -22 }}>
          <List>
            {
            list.map((l) => (
              <ListItem
                key={l.label}
                title={l.label}
                subtitle={l.text}
                hideChevron={true}
              />
            ))
            }
          </List>
        </ScrollView>
      </Container>
    )
  }
}
