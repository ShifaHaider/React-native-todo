import React from 'react';
import { Button } from 'react-native';
import { Alert } from 'react-native';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity,  ScrollView} from 'react-native'
import firebase from 'firebase';
import firestore from 'firebase/firestore'
import { TextInput } from 'react-native';
import { ListItem } from 'react-native-material-ui';
import { Container, Header, Content, Button, } from 'native-base';
import { Toolbar } from 'react-native-material-ui';

var config = {
    apiKey: "AIzaSyAwP9W6GBNU0-gZZtwU1EtWgn3feIsU9hw",
    authDomain: "react-slider-app.firebaseapp.com",
    databaseURL: "https://react-slider-app.firebaseio.com",
    projectId: "react-slider-app",
    storageBucket: "react-slider-app.appspot.com",
    messagingSenderId: "452274135714"
};
firebase.initializeApp(config);

export default class Todo extends React.Component {

    constructor() {
        super();
        this.state = {
            text: 'Hello',
            inputText: 'Hello World',
            todos: [],
            editText: null,
            add: true,
            edit: false
        };
        this.db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        this.db.settings(settings);
        this.loadTodos();
        var room;
    }
    addTodo() {
        this.state.text != '' ?
            this.db.collection('todos').add({
                text: this.state.text,
                time: Date.now()
            }) : null;
        this.setState({text : ''})
    }

    loadTodos() {
        this.db.collection('todos').onSnapshot((todoCollection) => {
            todoCollection.docChanges().forEach((todos) => {
                var todo = todos.doc.data();
                todo.id = todos.doc.id;
                if (todos.type === 'added') {
                    var arr = this.state.todos;
                    arr.unshift(todo);
                    this.setState({todos: arr});
                }
                else if (todos.type == 'removed') {
                    var arr2 = this.state.todos;
                    arr2.forEach((value, ind) => {
                        if (todo.id == value.id) {
                            arr2.splice(ind, 1);
                            this.setState({todo: arr2})
                        }
                    })
                }
                else if (todos.type == 'modified') {
                    var arr3 = this.state.todos;
                    arr3.forEach((value, index) => {
                        if (todo.id == value.id) {
                            arr3[index].text = this.state.text;
                            this.setState({todos: arr3})
                        }
                    })
                }
            })
        })
    }

    deleteTodo(todo) {
        this.db.collection('todos').doc(todo.id).delete();
    }

    editText(todo) {
        this.setState({add: false});
        this.todoForEdit = todo;
        this.setState({text: todo.text, editText: todo.text});
    }

    editTodo() {
        this.setState({add: true});
        this.db.collection('todos').doc(this.todoForEdit.id).update({
            text: this.state.text,
            time: Date.now()
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'purple', justifyContent: 'center' }}>
                <View style={{ flex:1 , flexDirection: 'row', justifyContent:"center" , padding:3 }}>
                    <View style={{flex:1, justifyContent:"center"}}>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1 }}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}/>
                    </View>
                    <View style={{justifyContent:"center" }}>
                        {this.state.add ?
                            <View><TouchableOpacity
                                style={{height: 40 ,backgroundColor:"white", justifyContent:"center", padding:4, width:50, alignItems:"center" }}
                                onPress={this.addTodo.bind(this)}>
                                <Text>ADD</Text>
                            </TouchableOpacity></View> :
                            <View>
                                <TouchableOpacity
                                    style={{height: 40 ,backgroundColor:"gray", justifyContent:"center", padding:4, width:50, alignItems:"center" }}
                                    onPress={this.editTodo.bind(this)}>
                                    <Text>EDIT</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                </View>

                <View style={{flex:6}}>
                    {this.state.todos.map((todo)=> {
                        return (
                            <View key={todo.id} style={{flexDirection: 'row', justifyContent:"center" , padding:3, width:"100%" }}>
                                <View style= {{backgroundColor: '#9e1b9e' , paddingTop: 5,  width:"100%", flexDirection:"row",
                                 justifyContent:'space-between' }}>
                                    <Text>{todo.text + ' ' + new Date(todo.time).toLocaleTimeString()}</Text>
                                    <View style={{flexDirection: 'row'}} >
                                        <TouchableOpacity style={{height: 40 ,backgroundColor:"white", justifyContent:"center",
                                 padding:4, width:50, alignItems:"center" }} onPress={this.deleteTodo.bind(this , todo)}>
                                            <Text>Delete</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{height: 40 ,backgroundColor:"white", justifyContent:"center",
                                 padding:4, width:50, alignItems:"center" }} onPress={this.editText.bind(this , todo)}>
                                            <Text>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

Helloooooooooooooooooooo