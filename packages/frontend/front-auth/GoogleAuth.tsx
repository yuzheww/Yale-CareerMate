import {gql, useMutation} from "@apollo/client";
import {useToast} from "@chakra-ui/react";
import axios from "axios";
import {useRouter} from "next/router";
import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {GoogleLogout} from 'react-google-login';

type LoginProps = {
    // logIn : Function;
}

// reference: https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
export const GoogleLoginButton = (props : LoginProps) => {
    const router = useRouter();
    const toast = useToast();

    const [loginWithGoogle, {loading: loginLoading}] = useMutation(gql`
        mutation LoginWithGoogle($token: String!) {
            loginWithGoogle(token: $token) {
                email
            }
        }
    `, {
        onError: err => {
            toast({
                title: "Failed to login.",
                description: err.message,
                status: "error"
            });
        }
    })

    // const handleLogin = async (googleData: any) => {
    //     console.log(googleData);
    //
    //     const res = await axios.post('/auth/google', {
    //         token: googleData.tokenObj.id_token
    //     }, {
    //         baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
    //     });
    //
    //     // const res = await fetch("http://localhost:8080/api/v1/auth/google", {
    //     //     method: "POST",
    //     //     body: JSON.stringify({
    //     //         token: googleData.tokenObj.id_token
    //     //     }),
    //     //     headers: {
    //     //         "Content-Type": "application/json"
    //     //     }
    //     // })
    //     // const data = await res.json();
    //     props.logIn();
    //     console.log(res.data);
    //     // store returned user somehow
    // }
    return (
        <span className="authButton">
            <GoogleLogin
                // clientId={process.env.NEXT_GOOGLE_CLIENT_ID}
                // NEXT_GOOGLE_CLIENT_ID=539193876-qgqjn7o8gkgui54a86c9sdpbmo2o2lnv.apps.googleusercontent.com

                clientId={(String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID))}
                // render={renderProps => (
                //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                //         Login with Google
                //     </button>)}
                onSuccess={(res: any) => {
                    console.log(res)
                    loginWithGoogle({
                        variables: {
                            token: res.tokenObj.id_token
                        }
                    }).then((user) => {
                        console.log(user)
                        console.log('Logged in—pushing to login');
                        router.push(`/account`);
                    }).catch(err => {
                        console.log(err);
                    });
                }}
                onFailure={(err) => {
                    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
                    console.log(err);
                }}
                // cookiePolicy={'single_host_origin'}
                autoLoad={false}
            />
        </span>);
};


// export const GoogleLogoutButton = () => {
//
//     const onSuccess = () => {
//         console.log("Successfully logged out");
//     }
//
//     return (
//         <span>
//             <GoogleLogout
//                 // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//                 clientId={"xxx"}
//                 buttonText="Logout"
//                 onLogoutSuccess={onSuccess}
//             />
//         </span>);
// };




