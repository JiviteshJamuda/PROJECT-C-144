import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import WebView from "react-native-webview";
import axios from 'axios';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            articleDetails : {}
        };
    }

    getArticle = ()=>{
        const url = 'http://127.0.0.1:5000/get-article'
        axios
        .get(url)
        .then(response => {
            this.setState({
                articleDetails : response.data.data
            })
        })
        .catch(err => {
            console.error(err.message)
        })
    }

    likedArticle = ()=>{
        const url = 'http://127.0.0.1:5000/liked-article'
        axios
        .post(url)
        .then(response => {
            this.getArticle()
        })
        .catch(err => {
            console.error(err.message)
        })
    }

    notLikedArticle = ()=>{
        const url = 'http://127.0.0.1:5000/not-liked-article'
        axios
        .post(url)
        .then(response => {
            this.getArticle()
        })
        .catch(err => {
            console.error(err.message)
        })
    }

    componentDidMount(){
        this.getArticle()
    }

    render() {
        const { articleDetails } = this.state
        if(articleDetails.url){
            const {lang, text, title, total_events, url} = articleDetails

            return (
                <View>
                    <Header
                        centerComponent = {{text : 'Article Recommendation', style : {fontSize : RFValue(13), color : '#fff'} }}
                        rightComponent = {
                            <Icon
                                name = 'file'
                                type = 'font-awesome'
                                onPress = {() => this.props.navigation.navigate("RecommendedArticles") }
                            />
                        }
                    />
                    <View>
                        <WebView
                            source = {{uri : url}}
                        />
                    </View>
                    <Text style={{fontWeight : 'bold', fontSize : RFValue(20)}}>{title}</Text>
                    <Text style={{fontSize : RFValue(10)}}>{text}</Text>
                    <TouchableOpacity style={{margin : 20}}
                        onPress = {this.likedArticle}
                    >
                        <Icon
                            name = 'check'
                            type = 'font-awesome'
                            color = 'green'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin : 20}}
                        onPress = {this.notLikedArticle}
                    >
                        <Icon
                            name = 'times'
                            type = 'font-awesome'
                            color = 'red'
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        
        return null        
    }
}

