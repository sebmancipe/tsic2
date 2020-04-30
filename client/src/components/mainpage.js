import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import API from './api/api';
import history from './history/history';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: sessionStorage.getItem('name'),
            users: []
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        API.get('/getall')
        .then((res) => {
            if(res.data){
                this.setState({users:res.data.data});
            }
        })
        .catch(()=>{
            console.log("Se presentó un error");
        })
    }

    handleLogout() {
        sessionStorage.removeItem('name');
        sessionStorage.setItem('closed',true);
        history.push('/');
    }

    render() {
        return (
            <Container>
            <Button onClick={this.handleLogout}> Cerrar la sesión </Button>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="0">
            <h3>Bienvenido usuario: {this.state.name}</h3>
            <h5>Otros usuarios registrados</h5>
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {this.state.users.map((user,index) => (
                                <ListGroup.Item key={index} action href={'#'+index}>{user.name}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            {this.state.users.map((user,index) => (
                                <Tab.Pane key={index} eventKey={'#'+index}>
                                    {user.description} - {user.email}
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </Container>
        );
    }
}