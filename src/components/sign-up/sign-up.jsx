import React from 'react';
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";
import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    }

    handleSubmit = async event =>{
        event.preventDefault();

        const{displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword){
            alert("password don't match");
            return;
        }
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName})
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

        }catch (error) {
            console.log(error);
        }
    }

    handleChange = event =>{
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>signup with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        label='Email'
                        required/>

                    <FormInput
                        type='text'
                        name='displayName'
                        value={this.state.displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required/>

                    <FormInput
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        label='Password'
                        required/>

                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required/>
                    <CustomButton type='submit'>Sign up</CustomButton>
                </form>
            </div>
        );
    }
}
export default SignUp;