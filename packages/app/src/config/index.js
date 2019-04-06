import {
  APP_VERSION,
  API_ENDPOINT,
  SITE_URL,
  AWS_BUCKET,
  AWS_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY
} from 'react-native-dotenv'

export const Config = {
  appName: 'Wall Tracker',
  version: APP_VERSION,
  apiEndpoint: API_ENDPOINT,
  siteUrl: SITE_URL,
  routes: {
    Home: 'Home',
    Session: 'Session',
    AllSessions: 'AllSessions',
    NewSession: 'NewSession',
    InProgress: 'InProgress',
    NewBeta: 'NewBeta',
    SelectImage: 'SelectImage',
    Settings: 'Settings'
  },
  theme: {
    padding: {
      default: '10'
    },
    colors: {
      orange: '#FF4F00',
      blue: '#00B0FF',
      white: '#FFF',
      black: '#000',
      grey: '#7F7F7F',
      opaqueBlack: 'rgba(0,0,0,.45)',
      opaqueWhite: 'rgba(255, 255, 255, .5)'
    }
  },
  storage: {
    keyPrefix: 'uploads/',
    bucket: AWS_BUCKET,
    region: AWS_REGION,
    accessKey: AWS_ACCESS_KEY,
    secretKey: AWS_SECRET_KEY,
    successActionStatus: 201
  }
}
