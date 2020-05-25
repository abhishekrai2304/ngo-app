import React, { Component } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { Container, Content, List, Text } from 'native-base';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import DataItem from '../Components/dataItem';
import Modal from '../Components/modal';


import { getArticles } from '../service/news';

export default class Notifications extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData: {}
    }
  }

  handleItemDataOnPress = (articleData) => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData
    });
  }

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {}
    });
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  componentDidMount() {
    getArticles().then(data => {
      this.setState({
        isLoading: false,
        data: data
      });
    }, error => {
      Alert.alert('Error', 'Something went wrong!');
    }
    )
    
  }

  render() {

    let view = this.state.isLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
        <Text style={{marginTop: 10}} children="Please Wait.." />
      </View>
    ) : (
      <List
        dataArray={this.state.data}
        renderRow={(item) => {
            return (
              <DataItem onPress={this.handleItemDataOnPress} data={item} />
            )
        }} />
    )

    return (
      <Container>
        <Content>
          {view}
        </Content>
        <Modal 
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}
