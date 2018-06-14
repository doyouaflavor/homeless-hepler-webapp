import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

import WhiteLogo from '../dist/images/life_whitelogo.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  navbar: {
    background: '#333333',
    boxShadow: 'none',

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    background: '#333333',
  },
  lifelogo: {
    width: '100px',
    marginRight:20,
  },
  TabRight:{
    display:'flex',
  },
  TabContent:{
    marginRight:'20px',
    '&:focus': {
      color: '#40a9ff',
    },
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <img src={WhiteLogo} alt="人生百味white-logo" className={classes.lifelogo}/>
          <Typography variant="title" color="inherit" className={classes.flex}>無家者小幫手</Typography>
          <Hidden smDown>
            <div className={classes.TabRight}>
              <Typography variant="title" color="inherit" className={classes.TabContent}>我想參與</Typography>
              <Typography variant="title" color="inherit" className={classes.TabContent}>物資日曆</Typography>
              <Typography variant="title" color="inherit" className={classes.TabContent}>專案緣起</Typography>        
            </div>    
          </Hidden>
          <Hidden mdUp>
            <MenuIcon />
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
