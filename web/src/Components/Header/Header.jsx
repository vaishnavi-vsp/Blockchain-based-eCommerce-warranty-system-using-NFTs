import { AppBar, Toolbar, makeStyles, Box, Typography, withStyles, IconButton, Drawer, List} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CustomButtons from './CustomButtons';
import Search from './Search';
import { Menu } from '@material-ui/icons';
import { useState } from 'react';

const useStyle = makeStyles(theme => ({
    header: {
        background: '#c9184a',
        height: 55
    },
    component: {
        marginLeft: '12%',
        lineHeight: 0,
        color: '#FFFFFF',
        textDecoration: 'none'
    },
    logo: {
        width: 75
    },
    container: {
        display: 'flex',
    },
    subHeading: {
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 800
    },
    subURL: {
        width: 10,
        height: 10,
        marginLeft: 4
    },
    list: {
        width: 250
    },
    menuButton: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    customButtons: {
        margin: '0 5% 0 auto', 
        marginRight: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        } 
    }
}));

const ToolBar = withStyles({
    root: {
      minHeight: 55
    },
})(Toolbar);

const Header = () => {
    const classes = useStyle();
    const logoURL = '';
    const subURL = '';

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
        <Box className={classes.list} onClick={handleClose}>
            <List>
                <listItem button>
                    <CustomButtons />
                </listItem>
            </List>
        </Box>
    );


    return (
        <AppBar position="fixed" className={classes.header}>
            <ToolBar>
                <IconButton
                    color="inherit"
                    className={classes.menuButton}
                    onClick={handleOpen}
                >
                    <Menu />
                </IconButton>

                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>

                <Link to='/' className={classes.component}>
                    <img src={logoURL} className={classes.logo} alt="" />
                    <Box component="span" className={classes.container}>
                        <Typography className = {classes.subHeading}>Flipkart<Box component="span" style={{color:'#000000'}}>Unstop</Box></Typography>
                        
                    </Box>
                </Link>
                <Search />
                <span className={classes.customButtons}><CustomButtons /></span>
            </ToolBar>
        </AppBar>
    )
}

export default Header;