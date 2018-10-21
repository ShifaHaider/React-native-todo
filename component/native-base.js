import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View } from 'native-base';

export default class NativeBase extends React.Component{
    constructor() {
        super();
        this.state = {};
    }

    render(){
        return(
            <View>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                        <Title>Header</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
                </Container>
            </View>
        )
    }


}
