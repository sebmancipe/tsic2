import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

import API from './api/api';
import history from './history/history';

export default class SiginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            description: "",
            password: "",
            errorServer: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value }, () => { console.log(this.state) });
    }

    handleSignin(event) {
        event.preventDefault();
        API.post('/add', {
            'email': this.state.email,
            'name': this.state.name,
            'description': this.state.description,
            'password': this.state.password
        }).then((res) => {
            sessionStorage.setItem('name',this.state.name);
            sessionStorage.setItem('email',this.state.email);
            history.push('/login');
        }).catch((err) => {
            this.setState({ errorServer: true });
        });
    }

    handleCloseAlert(){
        this.setState({errorServer:false});
    }

    render() {
        return (
            <Container id="signin-container">
            <h3>Registra tus datos</h3>
                <Alert dismissible onClose={this.handleCloseAlert} show={this.state.errorServer} variant='danger'>
                    Ups, se presentó un error por nuestra parte. Intenta nuevamente en un momento
                            </Alert>
                <Form onChange={this.handleChange} id="sigin-form">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Correo electrónico" name="email" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" name="password" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridNames">
                        <Form.Label>Nombres y apellidos</Form.Label>
                        <Form.Control placeholder="Juanito perez" name="name" />
                    </Form.Group>

                    <Form.Group controlId="formGridDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows="2" placeholder="Ocupación, estudios, hobbies" name="description" />
                    </Form.Group>

                    <Button id="sigin-button" variant="primary" onClick={this.handleSignin}>
                        Registrarme!
                </Button>
                </Form>
            </Container>
        );
    }
}