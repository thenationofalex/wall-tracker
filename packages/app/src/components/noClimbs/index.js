import React, { Component } from 'react' 
import { Text } from 'react-native'
import { Container } from '../container'

export default class NoClimbs extends Component {
  render () {
    return (
      <Container>
        <Text style={{ 
          color: '#fff',
          textAlign: 'center',
          marginTop: 10,
          fontSize: 20,
          fontWeight: 'bold'
        }}>No climbs</Text>
      </Container>  
    )
  }
}
