import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, TextField, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { authenticateLogin, authenticateSignup } from '../../service/api';

const useStyle = makeStyles({
    component: {
        height: '85vh',
        width: '130vh',
        maxWidth: 'unset !important'
    },
    image: {
        backgroundImage: `url(${'https://wallpapercave.com/wp/wp2252568.jpg'})`,
        background: '#2874f0',
        backgroundPosition: 'center 85%',
        backgroundRepeat: 'no-repeat',
        height: '85vh',
        width: '45%',
        padding: '45px 35px',
        '& > *': {
            marginTop: '430px',
            marginLeft: '50px',
            fontSize: 28,
            color: '#fff',
            textShadowColor: 'rgba(0, 0, 0, 0.9)',
            fontWeight: 600
        }
    },
    login: {
        padding: '25px 35px',
        display: 'flex',
        flex: 1,
        color: '#c9184a',
        flexDirection: 'column',
        '& > *': {
            marginTop: 20
        }
    },
    loginbtn: {
        textTransform: 'none',
        background: '#c9184a',
        color: '#fff',
        height: 48,
        borderRadius: 2,
        '&:hover': {
            color: '#000',
            border: '1px solid'
        }
    },

    requestbtn: {
        textTransform: 'none',
        background: '#fff',
        color: '#c9184a',
        height: 48,
        borderRadius: 2,
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    text: {
        color: '#c9184a',
        fontSize: 11
    },
    createText: {
        margin: '10px 0 5px 0',
        textAlign: 'center',
        color: '#2874f0',
        fontWeight: 500,
        fontSize: 14,
        cursor: 'pointer'
    },
    error: {
        fontSize: 10,
        color: '#ff6161',
        lineHeight: 0,
        marginTop: 10,
        fontWeight: 600
    }
})

const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    username: '',
    email: '',
    password: '',
    phone: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: '',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here!",
        subHeading: 'Signup to get started'
    }
}

const LoginDialog = ({ open, setOpen, setAccount }) => {
    const classes = useStyle();
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState(false);
    const [account, toggleAccount] = useState(accountInitialValues.login);

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await authenticateLogin(login);
        if (!response)
            showError(true);
        else {
            showError(false);
            handleClose();
            setAccount(response.data.username);
        }
    }

    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
        setAccount(signup.username);
    }

    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }
    const toggleLogin = () => {
        toggleAccount(accountInitialValues.login)
    }

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    return (
        <Dialog open={open} onClose={handleClose} className={classes.dialog_container}>
            <DialogContent className={classes.component} >
                <Box style={{ display: 'flex' }}>
                    <Box className={classes.image}>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography variant="h6" style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    </Box>
                    {
                        account.view === 'login' ?
                            <Box className={classes.login}>
                                <TextField onChange={(e) => onValueChange(e)} name='email' label='Enter Email/Mobile number' />
                                {error && <Typography className={classes.error}>Please enter valid Email ID/Mobile number</Typography>}
                                <TextField onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                                <Typography className={classes.text}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Typography>
                                <Button className={classes.loginbtn} onClick={() => loginUser()} >Login</Button>
                                <Typography className={classes.text} style={{ textAlign: 'center' }}>OR</Typography>
                                <Button className={classes.requestbtn}>Request OTP</Button>
                                <Typography className={classes.createText} onClick={() => toggleSignup()}>New to Flipkart? Create an account</Typography>
                            </Box> :
                            <Box className={classes.login}>
                                <TextField onChange={(e) => onInputChange(e)} name='username' label='Enter Full Name' />
                                <TextField onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                                <TextField onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                                <TextField onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                                <Button className={classes.loginbtn} onClick={() => signupUser()} >Continue</Button>

                                <Typography className={classes.createText} onClick={() => toggleLogin()}>Already have account? Login here</Typography>
                            </Box>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog;