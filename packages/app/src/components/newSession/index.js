import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const MUTATION = gql`
  mutation addSession($gym: String) {
    addSession(gym: $gym) {
      _id
    }
  }
`

export default class NewSessionName extends Component {
  render () {
    return (
      <Mutation mutation={MUTATION}>
      {(addSession, { data })} => (
        
      )
      </Mutation>
    )
  }
}
