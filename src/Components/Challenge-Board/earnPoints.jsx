// @material-ui/icons
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import share from '../../assets/icons/share.png';
import socialMedia from '../../assets/icons/social_media.png';
import review from '../../assets/icons/review.png';
import './styles/custom.css'


const EarnPoints = () => {
    return (
    <>
    <h2>Earn More Points</h2>
    <div class="center__align__board">
    <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" className="list_item">
        <ListItemAvatar className="mr-4">
          <img src={share} width="80"/>
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start"  className="list_item">
        <ListItemAvatar className="mr-6">
        <img src={socialMedia} width="70"/>
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start"  className="list_item">
        <ListItemAvatar className="mr-6">
            <img src={review} width="70"/>
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    </div>
    </>
    );
}

export default EarnPoints;