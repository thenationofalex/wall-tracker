import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Alert, ScrollView } from 'react-native'
import { FormInput, FormLabel, CheckBox, Badge} from 'react-native-elements'
import { RNS3 } from 'react-native-aws3'
import DeviceInfo from 'react-native-device-info'

import { Config } from '../config'
import { ApiClient } from '../graph'
import { ALL_RECORDS_QUERY } from '../graph/queries'
import { MUTATION_ADD_BETA } from '../graph/mutation'
import { Button, ButtonText } from '../components/button'
import { FormContainer } from '../components/container'
import Overlay from '../components/overlay'
import DurationSelector from '../components/durationSelector'
import { RoundedImage, RoundedWrapper, RoundedImageContainer } from '../components/roundedImage'

const LabelStyle = {
  color: '#fff', paddingVertical: Number(Config.theme.padding.default)
}

const InputStyle = {
  color: '#fff', borderBottomColor: '#fff'
}

const SAVE_CLIMB = (navigation, state) => {
  const gym = navigation.getParam('gym')
  const sessionId = navigation.getParam('id')
  const images = navigation.getParam('imagesToUpload')
  let imgArray = []
  const {
    name, grade, color, completed, notes, timeTaken
  } = state

  Alert.alert(
    `Save ${name} climb?`,
    '',
    [
      { text: 'Cancel', onPress: () => {} },
      { text: 'OK',
        onPress: () => {
          navigation.setParams({ loader: true })

          const img = images[0]

          let toUpload = {
            uri: img.uri,
            name: DeviceInfo.getUniqueID() + '-' + img.filename,
            type: 'image/jpg'
          }
          RNS3.put(toUpload, Config.storage)
            .then(resp => {
              if (resp.status !== 201) {
                navigation.setParams({ loader: false })
                Alert.alert('Failed to upload climb', '', [
                  { text: 'OK', onPress: () => {} }
                ])
              }

              imgArray.push(resp.body.postResponse.location)

              ApiClient.mutate({
                mutation: MUTATION_ADD_BETA,
                variables: {
                  name,
                  grade: parseInt(grade),
                  color: color.toLowerCase(),
                  completed: Boolean(completed),
                  notes,
                  timeTaken: parseInt(timeTaken),
                  image: imgArray,
                  sessionId
                },
                refetchQueries: [
                  {
                    query: ALL_RECORDS_QUERY,
                    variables: { id: sessionId }
                  }
                ]
              })
                .then(() => {
                  navigation.setParams({ loader: false })
                  navigation.navigate(Config.routes.InProgress, {
                    id: sessionId,
                    gym
                  })
                })
                .catch(e => console.log(e))
            })
            .catch(e => {
              console.log(e)
            })
          
        }
      }      
    ]
  )
}

export default class NewBetaScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'New climb'
    }
  }
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.state = {
      disabled: true,
      name: '',
      grade: '',
      color: '',
      completed: false,
      notes: '',
      timeTaken: '0',
      error: {
        name: false,
        grade: false
      }
    }
  }
  handleInputChange (payload) {
    this.setState(payload)
  }
  validateInput (input, value) {
    const { name, grade } = this.state

    if (name && grade) {
      this.setState({disabled: false})
    }
  }
  render () {
    const { navigation } = this.props
    const imagePreview = navigation.getParam('imagesToUpload') || []

    return (
      <FormContainer>
        <ScrollView>
          <Overlay visible={navigation.getParam('loader')} />
          <View>
            {/* Name */}
            <FormLabel labelStyle={LabelStyle}>
              Route Name*
            </FormLabel>
            <FormInput
              name='name'
              inputStyle={InputStyle}
              value={this.state.name}
              onChangeText={(text) => this.handleInputChange({'name': text})}
              onBlur={() => this.validateInput('name', this.state.name)}
            />
            {/* Grade */}
            <FormLabel labelStyle={LabelStyle}>
              Grade (AUS)*
            </FormLabel>
            <FormInput
              name='grade'
              inputStyle={InputStyle}
              value={this.state.grade}
              onChangeText={(text) => this.handleInputChange({'grade': text})}
              onBlur={() => this.validateInput('grade', this.state.grade)}
            />
            {/* Color */}
            <FormLabel labelStyle={LabelStyle}>
              Colour
            </FormLabel>
            <FormInput
              name='color'
              inputStyle={InputStyle}
              value={this.state.color}
              onChangeText={(text) => this.handleInputChange({'color': text})}
            />
            {/* notes */}
            <FormLabel labelStyle={LabelStyle}>
              Notes
            </FormLabel>
            <FormInput
              name='notes'
              inputStyle={InputStyle}
              value={this.state.notes}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => this.handleInputChange({'notes': text})}
            />
            {/* timeTaken */}
            <DurationSelector
              title={`Time Taken`}
              subtitle={`Add time`}
              onChangeText={this.handleInputChange}
            />
            <FormInput
              name='timeTaken'
              inputStyle={InputStyle}
              value={
                this.state.timeTaken > 60
                ? (this.state.timeTaken / 60).toFixed(2).toString() + ` minutes`
                : this.state.timeTaken.toString() + ` seconds`
              }
              placeholder={`0 seconds`}
              editable={false}
              onChangeText={(text) => this.handleInputChange({'timeTaken': text})}
            />
            {/* images */}
            {
              imagePreview && (
                <RoundedImageContainer>
                  {imagePreview.map(img => 
                    <View key={img.filename} style={RoundedWrapper.container}>
                      <RoundedImage source={{ uri: img.uri }} />
                    </View>
                  )}
                </RoundedImageContainer>    
              )
            }
            <Badge
              value={imagePreview.length > 0 ? `Retake route photo` : `Add route photo`}
              onPress={() => {
                navigation.navigate(Config.routes.SelectImage, {
                  id: navigation.getParam('id'),
                  gym: navigation.getParam('gym'),
                  imageCount: imagePreview ? imagePreview.length : 0,
                  images: imagePreview
                })
              }}
              containerStyle={{
                height: 40,
                width: '92%',
                marginLeft: 15,
                marginVertical: 20
              }}
              textStyle={{
                fontWeight: 'bold'
              }}
            />
            {/* completed */}
            <CheckBox
              title={`Climb Completed?`}
              onPress={() => this.setState({ completed: !this.state.completed })}
              textStyle={{ color: Config.theme.colors.white }}
              containerStyle={{
                backgroundColor: Config.theme.colors.orange,
                borderWidth: 0,
                marginVertical: 10
              }}
              checkedColor={Config.theme.colors.white}
              checked={this.state.completed}
            />
            {/* Sumbmit */}
            <View style={{ paddingLeft: 10 }}>
              <Button
                full
                disabled={this.state.disabled}
                onPress={() => { SAVE_CLIMB(navigation, this.state) }}
                >
                <ButtonText>
                  Save Climb
                </ButtonText>
              </Button>
            </View>
          </View>
        </ScrollView>
      </FormContainer>
    )
  }
}

NewBetaScreen.propTypes = {
  navigation: PropTypes.object
}
