import React from 'react';
import './App.css';
import HomePage from "./pages/homepage/homepage";
import {Route, Switch, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop';
import Header from "./components/header/header";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selector";

import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {createStructuredSelector} from "reselect";
import CheckoutPage from "./pages/checkout/checkout";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    });
                });
            }
            setCurrentUser(userAuth);
            // this.setState({currentUser: userAuth})

            // await createUserProfileDocument(userAuth);
            // this.setState({currentUser: user});
            // console.log(user)
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {

        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route exact path="/checkout" component={CheckoutPage}/>
                    <Route exact path="/signin"
                           render={() => this.props.currentUser ? <Redirect to="/"/> : <SignInAndSignUpPage/>}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
