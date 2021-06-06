import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class RecommendedArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getData = () => {
    const url = "http://localhost:5000/recommended-article";
    axios
      .get(url)
      .then(async response => {
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItems = ({ item, index }) => {
    return (
      <Card
        key={`card-${index}`}
        title={item.title}
        // containerStyle={styles.cardContainer}
        // titleStyle={styles.title}
        subtitle={`score : ${ item.total_events }`}
        // subtitleStyle={styles.subtitle}
      ></Card>
    );
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItems}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(25),
    marginTop: RFValue(65)
  },
  subtitle: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(15)
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    height: RFValue(110),
    marginBottom: RFValue(20)
  }
});