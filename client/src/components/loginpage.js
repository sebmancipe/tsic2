import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import image from '../img/hippo.png';

import API from './api/api';
import history from './history/history';


export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorPassword: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCloseAlert = () =>{
        this.setState({errorPassword:false});
    };

    handleLogin(event) {
        event.preventDefault();
        API.post('/login', {
            'email': this.state.email,
            'password': this.state.password
        })
            .then((res) => {
                if(res.data.data!== []){
                    this.setState({ errorPassword: false });
                    sessionStorage.setItem('name',res.data.data[0].name);
                    history.push('/main');
                } else this.setState({ errorPassword: true });
            })
            .catch(() => {
                this.setState({ errorPassword: true });
            });
    }


    render() {
        return (
            <Container id="login-container">
                <Row>
                    <Col id="login-img" xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1, offset: 3 }} ><img src={image} alt="logo project" /></Col>
                    <Col id="login-text"xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1, offset: 3 }} ><h1>Iniciar sesión en TSIC</h1></Col>
                </Row>
                <Row >
                    <Col md="3" lg="4" />
                    <Col md="6" lg="4">
                        <Alert dismissible onClose={this.handleCloseAlert} show={this.state.errorPassword} variant='danger'>
                            Ups, tus credenciales no son las correctas. Intenta de nuevo
                            </Alert>
                        <Form onChange={this.handleChange}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Dirección Email</Form.Label>
                                <Form.Control type="email" defaultValue={sessionStorage.getItem('email')} placeholder="Ingrese correo electrónico" name="email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese su contraseña" name="password" />
                            </Form.Group>

                            <Button variant="primary" type="button" className="btn-block " onClick={this.handleLogin} >
                                Iniciar sesión
                            </Button>


                        </Form>
                    </Col>
                    <Col md="3" lg="4" />
                </Row>
            </Container>
        );
    }
}