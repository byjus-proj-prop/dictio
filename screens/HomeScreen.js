import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DB from '../db';

const db = {
  "o" : {
    "word" : "o",
    "lexicalCategory":"Determinador",
    "definition" : "denota uma ou mais pessoas ou coisas já mencionadas ou consideradas de conhecimento comum."
  },
  "india" : {
    "word" : "India",
    "lexicalCategory":"Substantivo",
    "definition" :"um país no sul da Ásia ocupando a maior parte do subcontinente indiano; população 1.311.000.000 (estimada em 2015); línguas oficiais, Hindi e Inglês (quatorze outras línguas são reconhecidas como oficiais em certas regiões; destas, Bengali, Gujarati, Marathi, Tamil, Telugu e Urdu têm a maioria dos falantes como primeira língua); capital, Nova Delhi."
  },
  "externamente" : {
    "word" : "externamente",
    "lexicalCategory":"Advérbio",
    "definition" : "com referência à superfície externa ou estrutura de algo; lado de fora"
  },
  "olá" : {
    "word" : "olá",
    "lexicalCategory":"Interjeição",
    "definition" : "usado como uma saudação ou para iniciar uma conversa telefônica"
  },
  "bem-vindo" : {
    "word" : "bem-vindo",
    "lexicalCategory":"Substantivo",
    "definition" : "uma saudação ou maneira de cumprimentar alguém"
  },
  "quase" : {
    "word" : "quase",
    "lexicalCategory":"Advérbio",
    "definition" : "não exatamente; muito próximo"
  },
  "ela" : {
    "word" : "ela",
    "lexicalCategory":"Pronome",
    "definition" : "usado para se referir a uma mulher, menina ou animal fêmea previamente mencionado ou facilmente identificado"
  },
  "árvore" : {
    "word" : "árvore",
    "lexicalCategory":"Substantivo",
    "definition" : "uma planta perene lenhosa, geralmente tendo um único caule ou tronco crescendo a uma altura considerável e tendo ramos laterais a uma certa distância do solo."
  },
  "maravilhoso" : {
    "word" : "maravilhoso",
    "lexicalCategory":"Adjetivo",
    "definition" : "alegria inspiradora, prazer ou admiração; extremamente bom; maravilhoso"
  },
  "comum" : {
    "word" : "comum",
    "lexicalCategory":"Adjetivo",
    "definition" : "sem características especiais ou distintivas; normal"
  }
}

export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Carregando...",
      lexicalCategory :'',
      definition : ""
    };
  }

  getWord=(word)=>{
    var call = db[word];
    this.setState({
      text: word,
      isSearchPressed: true,
      word  : db[word].word,
      lexicalCategory :db[word].lexicalCategory,
      examples : [],
      definition : db[word].definition
    });
    console.log(DB());
  }

  render(){
    return(
      <SafeAreaProvider>
          <View style={{flex:1, borderWidth:2}}>
          <Header
            backgroundColor={'purple'}
            centerComponent={{
              text: 'Dicionário de Bolso',
              style: { color: '#fff', fontSize: 20 },
            }}
          />
          <View style={styles.inputBoxContainer}>
        
          <Text 
            onChangeText={text => {
                this.setState({
                  text: text,
                  isSearchPressed: false,
                  word  : "Carregando...",
                  lexicalCategory :'',
                  examples : [],
                  definition : ""
                });
            }}
          />
        {/*   <input 
           onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                definition : ""
              });
           }}
        /> 
        }
        {/*
        <TouchableOpacity 
            onChangeText={text => {
                this.setState({
                  text: text,
                  isSearchPressed: false,
                  word  : "Carregando...",
                  lexicalCategory :'',
                  examples : [],
                  definition : ""
                });
            }}
          /> 
        */}
        {
            <TextInput
              style={styles.inputBox}
              onChangeText={text => {
                this.setState({
                  text: text
                });
              }}
              value={this.state.text}
            />
            }
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                this.setState({ isSearchPressed: true });
                this.getWord(this.state.text)
                
                console.log(this.state);
              }}>
              <Text style={styles.searchText}>Pe</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.outputContainer}>
              {
                this.state.isSearchPressed ?
                (
                  <View style={{justifyContent:'center', marginLeft:10 }}>
                    <View style={styles.detailsContainer}>
                      <Text style={styles.detailsTitle}>
                        Palavra :{" "}
                      </Text>
                      <Text style={{fontSize:18 }}>
                        {this.state.word}
                      </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                      <Text style={styles.detailsTitle}>
                        Tipo :{" "}
                      </Text>
                      <Text style={{fontSize:18}}>
                        {this.state.lexicalCategory}
                      </Text>
                    </View>
                    <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                      <Text style={styles.detailsTitle}>
                        Definição :{" "}
                      </Text>
                      <Text style={{ fontSize:18}}>
                        {this.state.definition}
                      </Text>
                    </View>
                  </View>
                )
                :null
              }
          </View>
        </View>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  searchButton: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  searchText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  outputContainer:{
    flex:0.7,
    alignItems:'center'
  },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    color:'orange',
    fontSize:20,
    fontWeight:'bold'
  }
});
