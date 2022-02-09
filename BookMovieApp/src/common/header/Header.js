import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


const customStyles = {                  // Modal styling
    
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        
        super();
        
        this.state = {

            modalIsOpen: false,
            value: 0,
            usernameRequired : "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    //modal handler when modal will open

    modalHandler = () => {

        this.setState({

            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: ""

        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }


            // Login handler


    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });

        let login = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closeModalHandler();
            }
        });


        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        // authentication
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(login);

    }


    // login parameter handler 


    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }
    passwordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }


        // singup handler 


    registerClickHandler = () => {

        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });

        let signup = JSON.stringify({
            
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "email_address": this.state.email,
            "password": this.state.registerPassword,
            "mobile_number": this.state.contact
            
        });

            
        let xhrRegister = new XMLHttpRequest();
        let that = this;
        xhrRegister.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    registrationSuccess: true
                });
            }
        });

        xhrRegister.open("POST", this.props.baseUrl + "signup");
        xhrRegister.setRequestHeader("Content-Type", "application/json");
        xhrRegister.setRequestHeader("Cache-Control", "no-cache");
        xhrRegister.send(signup);
    }


    // all register parameter handler


    firstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }
    lastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }
    emailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }
    registerPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }
    contactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    // logout

    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        
        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (
            <div>
                <header className="header">
                    <img src={logo} className=" logo" alt="Movies App Logo" />
                    {!this.state.loggedIn ?
                        <div className="login">
                            <Button onClick={this.modalHandler} variant="contained" color="default"> Login </Button>
                        </div>
                        :
                        <div className="login">
                            <Button onClick={this.logoutHandler} variant="contained" color="default"> Logout  </Button>
                        </div>
                    }


                      {/******************** bookshow button *************************/}

                    {this.props.showBookShowButton === "true" && this.state.loggedIn
                        ? <div className="bookshow">
                            <Link to={"/bookshow/" + this.props.id}>
                                <Button onClick={this.modalHandler} variant="contained" color="primary"> Book Show </Button>
                            </Link>
                        </div>
                        : ""
                    }

                </header>
                

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModalHandler}
                    contentLabel="Login"
                    style={customStyles}
                    ariaHideApp={false}
                >
                
                <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>



                {/******************** Login *************************/}

                    {this.state.value === 0 &&
                        <TabContainer>   


                            <FormControl required>
                                <InputLabel htmlFor="username">User Name</InputLabel>
                                <Input onChange={this.usernameChangeHandler} id="username" type="text" username={this.state.username}  />

                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="colour">required</span>
                                </FormHelperText>

                            </FormControl>
            
                            <br/>
                            <br/>

                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" type="password" password={this.state.loginPassword} onChange={this.passwordChangeHandler} />
                              
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="colour">required</span>
                                </FormHelperText>

                            </FormControl>

                            <br/>
                        
                            {this.state.loggedIn === true &&
                                <FormControl>
                                    <span>Login Successful!!!</span>
                                </FormControl>
                            }

                            <br/>

                            <Button onClick={this.loginClickHandler} variant="contained" color="primary" >LOGIN</Button>

                        </TabContainer>
                    }



                    
                {/******************** Register *************************/}


                    {this.state.value === 1 &&
                        <TabContainer>


                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input  onChange={this.firstNameChangeHandler} id="firstname" type="text" firstname={this.state.firstname}/>
                               
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="colour">required</span>
                                </FormHelperText>

                            </FormControl>

                            <br/>
                            
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input  onChange={this.lastNameChangeHandler} id="lastname" type="text" lastname={this.state.lastname}/>
                                
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="colour">required</span>
                                </FormHelperText>
                            
                            </FormControl>
                            
                            <br />
                            
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input  onChange={this.emailChangeHandler}  id="email" type="text" email={this.state.email}/>
                                
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="colour">required</span>
                                </FormHelperText>
                            
                            </FormControl>
                            
                            <br />
                            
                            <FormControl required>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input onChange={this.registerPasswordChangeHandler}  id="registerPassword" type="password" registerpassword={this.state.registerPassword} />
                                
                                <FormHelperText className={this.state.registerPasswordRequired}>
                                    <span className="colour">required</span>
                                </FormHelperText>
                            
                            </FormControl>
                            
                            <br />
                            
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input onChange={this.contactChangeHandler}  id="contact" type="text" contact={this.state.contact} />
                                
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="colour">required</span>
                                </FormHelperText>
                            
                            </FormControl>
                            
                            <br />
                            
                            {this.state.registrationSuccess === true &&
                                <FormControl>
                                    <span>Registration Successful. Please Login!</span>
                                </FormControl>
                            }

                            <br />

                            <Button onClick={this.registerClickHandler} variant="contained" color="primary">REGISTER</Button>

                        </TabContainer>
                    }

                </Modal>
            
            </div>
        )
    }
}

export default Header;