// @material-ui/icons
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import share from '../../assets/icons/share.png';
import socialMedia from '../../assets/icons/social_media.png';
import review from '../../assets/icons/review.png';
import Modal from '@material-ui/core/Modal';
import media1 from '../../assets/icons/media1.png';
import media2 from '../../assets/icons/media2.png';
import media3 from '../../assets/icons/media3.png';
import media4 from '../../assets/icons/media4.png';

import './styles/custom.css'


const SendReferral = (e) => {
  e.preventDefault();
  let message = 'Hi there!! Krutika Bhatt have invited you to Flipkart Unstop - A blockchain based eccomerce chain.Enjoy exciting offers and win rewards by completing challenged.\n\n*Referral Code:A78F9GH3*\n\nHoping to see you there soon😊'
  let url = `https://web.whatsapp.com/send?`;
  url += `text=${encodeURI(message)}&app_absent=0`
  window.open(url);
      
};

const EarnPoints = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };


    return (
    <>
    <h2>Earn More Points</h2>
    <div class="center__align__board">
    <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start" className="list_item" onClick={SendReferral}>
        <ListItemAvatar className="mr-4">
          <img src={share} width="80"/>
        </ListItemAvatar>
        <ListItemText className="earn_points_margins"
          primary="Friend Referrals"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Send Referral
              </Typography>
              {" to your friends and invite them to join the challengeBoard"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start"  className="list_item" onClick={handleOpen}>
        <ListItemAvatar className="mr-6">
        <img src={socialMedia} width="70"/>
        </ListItemAvatar>
        <ListItemText className="earn_points_margins"
          primary="Tag Us on Social Media"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Share Photos, Badges, NFTs and Tag Us
              </Typography>
              {" on Social Media platforms and earn points"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className="modal" >
                    <h3>Share on social media platforms</h3>
                    <p>
                        Share your amazing photos and content on social media with <span>#FlipKartUnstop</span> <span>#ChallengeCompleted</span>
                    </p>
                    <div className="social_media_share">
                      <a href="https://www.facebook.com/Meta/" target="_blank"><img src={media1} width="60"/></a>
                      <a href="https://www.instagram.com" target="_blank"><img src={media2} width="60" /></a>
                      <a href="https://twitter.com/" target="_blank"><img src={media3} width="60" /></a>
                      <a href="https://www.snapchat.com/" target="_blank"><img src={media4} width="60"/></a>
                    </div>
                </div>
            </Modal>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start"  className="list_item">
        <ListItemAvatar className="mr-6">
            <img src={review} width="70"/>
        </ListItemAvatar>
        <ListItemText className="earn_points_margins"
          primary="Challenge your friends for a challenge"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Interactive Challenge call
              </Typography>
              {'- earn exciting rewards and make your way to leaderboard with friends'}
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