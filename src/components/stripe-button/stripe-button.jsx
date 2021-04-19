import React from "react";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    // const priceForStripe = price* 100;
    const publishableKey = 'pk_test_51IfoibSFp92KoCq53gscJSsoL51UZeYanoxpIkMYuEsnH70CLiFN9eQ4FfgadgYseNcE7yCCss3ovYQrv9HNOWJu00BVAxrTFB';

    const onToken = token => {
        console.log(token);
        alert('payment successful!');
    }
    return (
        <StripeCheckout label='Pay Now' name='CRWN Clothing Ltd.' billingAddress shippingAddress
                        description={`Your total is $${price}`} token={onToken} stripeKey={publishableKey}/>
    );

}

export default StripeCheckoutButton;