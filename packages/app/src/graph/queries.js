import gql from 'graphql-tag'

export const ALL_RECORDS_QUERY = gql`
  query allRecords($id: ID!) {
    allRecords(id: $id) {
      _id,
      color,
      completed,
      createdAt,
      grade,
      image,
      name,
      notes,
      timeTaken
    }
  }
`

export const ACTIVE_SESSION_QUERY = gql`
  query activeSession($deviceId: String!) {
    activeSession(deviceId: $deviceId) {
      _id,
      gym
    }
  }
`

export const ALL_SESSIONS_QUERY = gql`
  query allSessions($deviceId: String!) {
    allSessions(deviceId: $deviceId){
      _id,
      createdAt,
      gym,
      image
    }
  }
`
