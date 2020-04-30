import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import history from './history/history';


export default class InfoPage extends Component {
    constructor(props){
        super(props);
        this.state={
            closed: sessionStorage.getItem('closed')?sessionStorage.getItem('closed'):false,
        }
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    onClickRegister(e){
        e.preventDefault();
        history.push("/signin");
    }

    onClickLogIn(e){
        e.preventDefault();
        history.push('/login');
    }

    handleCloseAlert(){
        this.setState({closed:false});
    }


    render() {
        return (
            <Container id="info-container">
            <Container id="info-text-container">
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel eros at enim rhoncus ultrices. Morbi quis euismod sem. Duis rutrum tellus at ex ullamcorper, nec efficitur ligula varius. Sed gravida ligula dolor, 
                ac lobortis nulla fringilla quis. In molestie laoreet porttitor. In fringilla, urna vitae sollicitudin vehicula, nulla nibh ultrices lacus, quis tempus nunc elit non turpis. Proin pellentesque dapibus orci, at condimentum diam 
                semper ut. Aenean vel elit quis metus rhoncus lobortis. Duis sodales quam id elementum porttitor. Donec ut eleifend massa. Vestibulum velit massa, interdum sed accumsan vitae, fermentum vel risus. 
                Duis felis nulla, dapibus vitae orci vitae, faucibus venenatis sem. Duis eu mauris auctor, condimentum velit et, bibendum arcu.</div>
            </Container>
            <Container id="info-buttons-container">
            <Alert dismissible onClose={this.handleCloseAlert} show={this.state.closed} variant='success'>
                            Se ha cerrado tu sesión correctamente 
                </Alert>
                <Button variant="primary" size="lg" block onClick={this.onClickLogIn}>
                    Iniciar sesión
                </Button>
                <Button variant="secondary" size="lg" block onClick={this.onClickRegister}>
                    Registrarse
                </Button>
            </Container>
            </Container>
        );
    }


}