import React from 'react';
//import { Button } from 'react-native';
import { Alert } from 'react-native';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity,  ScrollView} from 'react-native'
import firebase from 'firebase';
import firestore from 'firebase/firestore'
import { TextInput } from 'react-native';
import { Button } from 'react-native-material-ui';
import { Toolbar } from 'react-native-material-ui';
import { ListItem } from 'react-native-material-ui';
import { Card } from 'react-native-material-ui';
import { Alert } from 'react-native';

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
        console.log(todo);
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
    hello(){
   console.log('hello');
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Toolbar centerElement="Todo App" searchable={{autoFocus: true,placeholder: 'Add todo',}}/>
                <View style={{ flex:1 , flexDirection: 'row', justifyContent:"center" , padding:3 }}>
                    <View style={{flex:1, justifyContent:"center"}}>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1 }}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}/>
                    </View>
                    <View style={{justifyContent:"center" }}>
                        {this.state.add ? <Button raised primary text="ADD" onPress={this.addTodo.bind(this)}/>:
                            <Button raised primary text="EDIT" onPress={this.editTodo.bind(this)}/>}
                    </View>
                </View>
                <View style={{flex:6}}>
                    {this.state.todos.map((todo)=> {
                        return (
                            <View>
                                <ListItem
                                    divider rightElement= {<View style={{flexDirection: 'row' }}>
                                <Button raised primary text="DELETE" onPress={this.deleteTodo.bind(this ,todo)}/>
                                <Button raised primary text="EDIT" onPress={this.editText.bind(this ,todo)}/></View>}
                                    centerElement={{primaryText: todo.text + ' ' + new Date(todo.time).toLocaleTimeString()}}/>
                            </View>
                        )})}
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
