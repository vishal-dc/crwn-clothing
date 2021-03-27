import React from "react";

import './sign-in.styles.scss'
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import {sigInWithGoogle} from "../../firebase/firebase.utils";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''

        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with you email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput label='Email' name="email" type="email" value={this.state.email} required
                               handleChange={this.handleChange}/>
                    <FormInput label='Password' name="password" type="password" value={this.state.password} required
                               handleChange={this.handleChange}/>
                    <div className='buttons'>
                        <CustomButton type="submit"> Sign in</CustomButton>
                        <CustomButton onClick={sigInWithGoogle} isGoogleSignIn> Sign in with Google</CustomButton>
                    </div>
                </form>

            </div>
        );
    }
}

export default SignIn;