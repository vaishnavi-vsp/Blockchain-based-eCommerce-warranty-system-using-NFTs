/*eslint-disable*/

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StarsIcon from '@mui/icons-material/Stars';
import RedeemIcon from '@mui/icons-material/Redeem';

import './styles/custom.css'
export default function Sidebar() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
  
    return(
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} className="sidebar">
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding className="link">
            <ListItemButton selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}>
              <ListItemIcon>
                <TaskAltIcon />
              </ListItemIcon>
              <ListItemText primary="Challenges" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className="link">
            <ListItemButton selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}>
              <ListItemIcon>
                <MilitaryTechIcon />
              </ListItemIcon>
              <ListItemText primary="My Badges" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className="link">
            <ListItemButton selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}>
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary="Earn Coins" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding className="link">
            <ListItemButton selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}>
              <ListItemIcon>
                <RedeemIcon />
              </ListItemIcon>
              <ListItemText primary="Redeem gift" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
