import React, { useEffect, useState } from 'react';
import axios from 'axios'; // npm install axios
import {
    Content, Spinner, List, ListItem, Left, Thumbnail, Body,
    Right, Button, Container, Header, Item, Icon, Input, H2
} from 'native-base';
import { Text, Alert, Linking } from 'react-native'
import { NativeBaseProvider } from 'native-base';


function GitHub() {


    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("a");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = async (t) => {
        const res = await axios.get(`https://api.github.com/search/users?q=${t}`);
        setData(res.data.items);
        setIsLoading(false);
    }

    const handleSearch = () => {
        setIsLoading(true);
        getData();
    }



    const listUsers = data.map((user) =>
        <ListItem key={user.id} thumbnail>
            <Left>
                <Thumbnail square source={{ uri: user.avatar_url }} />
            </Left>
            <Body>
                <Text>Login: {user.login}</Text>
                <Text note numberOfLines={1}>Id: {user.id}</Text>
            </Body>
            <Right>
                <Button onPress={() => { Linking.openURL(user.html_url) }}
                    transparent>
                    <Text style={{ color: 'blue' }}>VIEW</Text>
                </Button>
            </Right>
        </ListItem>
    );

    return (
        <Container style={styles.container}>
            <Header searchBar rounded style={{ backgroundColor: '#0066ff' }}>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        placeholder="Search"
                        onChangeText={text => {
                            if (text.length > 0) {
                                setSearchTerm(text)
                                getData(text)
                            } else {
                                getData('a')
                            }

                        }}
                    />
                    <Icon name="ios-people" />
                    {/* <Button onPress={handleSearch} transparent>
                        <Text>Search</Text>
                    </Button> */}
                </Item>

            </Header>


            <Content>
                {isLoading ? (
                    <Content>
                        <Spinner color='#0066ff' />
                        {/* <H2>Enter the id in the Search Bar </H2> */}
                    </Content>

                ) : (
                    <List>
                        {listUsers}
                    </List>
                )}

            </Content>
        </Container>
    );

}

const styles = {
    container: {
        flex: 1
    },
    button: {
        color: 'white'
    }
}
export default GitHub;