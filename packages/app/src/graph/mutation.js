import gql from 'graphql-tag'

export const MUTATION_DELETE_SESSION = gql`
  mutation deleteSession($id: ID) {
    deleteSession(id: $id) {
      success
    }
  }
`

export const MUTATION_DELETE_BETA = gql`
  mutation deleteBeta($id: ID) {
    deleteBeta(id: $id) {
      success
    }
  }
`

export const MUTATION_END_SESSION = gql`
  mutation endSession($id: ID) {
    endSession(id: $id) {
      _id
    }
  }
`

export const MUTATION_ADD_SESSION = gql`
  mutation addSession($gym: String, $feeling: String, $deviceId: String){
    addSession(gym: $gym, feeling: $feeling, deviceId: $deviceId) {
      _id,
      image,
      createdAt
    }
  }
`

export const MUTATION_ADD_BETA = gql`
  mutation addBeta(
    $color: String,
    $completed: Boolean,
    $grade: Int,
    $image: [String],
    $name: String,
    $notes: String,
    $timeTaken: Int,
    $sessionId: String
  ){
    addBeta (
      color: $color
      completed: $completed
      grade: $grade
      image: $image
      name: $name
      notes: $notes
      timeTaken: $timeTaken
      sessionId: $sessionId
    ) {
      _id
    }
  }
`
