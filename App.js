import React from 'react';
import { Navigator, NativeModules,Text, View, StyleSheet } from 'react-native';
import Todo from './todo.js'
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import { Button } from 'react-native-material-ui';
import { Toolbar } from 'react-native-material-ui';


const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

export default class App extends React.Component {

    constructor() {
        super();

    }


    render() {
        return (
            <ThemeContext.Provider value={getTheme(uiTheme)}>
                <Todo/>
            </ThemeContext.Provider>
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
//<ThemeContext.Provider value={getTheme(uiTheme)}>
//    <Toolbar centerElement="Searchable"/>
//</ThemeContext.Provider>