import React from 'react';
import { Navigator, NativeModules,Text, View, StyleSheet } from 'react-native';
import Todo from './todo.js'

export default class App extends React.Component {

    constructor() {
        super();

    }


    render() {
        return (
               <View style={{flex: 1}}>
                  <Todo/>
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
