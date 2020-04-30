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
            <Container id="main-container">
            <Button id="main-buttonlogout" onClick={this.handleLogout}> Cerrar la sesión </Button>
            <Tab.Container defaultActiveKey="0">
            <h3 id="main-textuser">Bienvenido usuario: {this.state.name}</h3>
            <h5 id="main-textuser2">Otros usuarios registrados</h5>
                <Row>
                    <Col sm={6} id="main-tablecontainer">
                        <ListGroup>
                            {this.state.users.map((user,index) => (
                                <ListGroup.Item key={index} action href={'#'+index}>{user.name}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col sm={6}>
                        <Tab.Content>
                            {this.state.users.map((user,index) => (
                                <Tab.Pane key={index} eventKey={'#'+index}>
                                    <h4>Descripción: {user.description} <br/><br/> Correo electrónico: {user.email}</h4>
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