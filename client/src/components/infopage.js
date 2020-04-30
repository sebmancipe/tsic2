import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
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
            <Container>
                <Alert dismissible onClose={this.handleCloseAlert} show={this.state.closed} variant='success'>
                            Se ha cerrado tu sesión correctamente 
                </Alert>
                <Button variant="primary" size="lg" block onClick={this.onClickRegister}>
                    Registrarse
                </Button>
                <Button variant="secondary" size="lg" block onClick={this.onClickLogIn}>
                    Iniciar sesión
                </Button>
            </Container>
        );
    }


}