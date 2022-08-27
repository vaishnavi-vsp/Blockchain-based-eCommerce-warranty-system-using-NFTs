import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';

const useStyle = makeStyles({
    component: {
        marginTop: 40,
    },
    logout: {
        fontSize: 14,
        marginLeft: 20
    }
})

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyle();

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        setAccount('');
        localStorage.removeItem("user");
        window.location.href="/";
    }
    
    return (
        <>
            <Link onClick={handleClick}><Typography style={{ marginTop: 2 }}>{account}</Typography></Link>
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                className={classes.component}
            >
                <MenuItem>
                    <Typography className={classes.logout}>{JSON.parse(localStorage.getItem("user")).email}</Typography>
                </MenuItem>

                <MenuItem>
                    <Typography className={classes.logout}>{localStorage.getItem("address")}</Typography>
                </MenuItem>

                <MenuItem>
                    <Typography className={classes.logout}>Network Type: {localStorage.getItem("networkType")}</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography className={classes.logout}>Balance :  {localStorage.getItem("balance")} Matic</Typography>
                </MenuItem>

                <MenuItem onClick={() => { handleClose(); logout();}}>
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Typography className={classes.logout}>Logout</Typography>
                </MenuItem>
               
            </Menu>
        </>
    )    
}

export default Profile;