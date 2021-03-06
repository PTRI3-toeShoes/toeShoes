import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, Link, Toolbar, IconButton, Button, Typography, Badge, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {Link as RouterLink} from 'react-router-dom';
// import red from '@material-ui/core/colors/red';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: 'none',
    [theme.breakpoints.up('sm')]: {
      size: '30em',
      // display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  // sectionDesktop: {
  //   display: 'none',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'flex',
  //   },
  // },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default function PrimarySearchAppBar({ setDarkState, darkState, isLoggedIn, setIsLoggedIn, handleThemeChange, favoriteCount}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [goToSignOut, setGoToSignOut] = useState(false);
  const [goToSignIn, setGoToSignIn] = useState(false);
  const [favView, setFavView] = useState(false);
  const [goToSignup, setGoToSignup] = useState(false);
  // const [favoriteCount, setFavoriteCount] = useState(1);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  // const handleThemeChange = () => {
  //   setDarkState(!darkState);
  // };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const showFavs = () => {
    setFavView(true);
  };

  const handleSignup = () => {
    
      setGoToSignup(true);
  
  };

  const signInOut = isLoggedIn ? 'Sign Out' : 'Sign In';
  // const signInOrSignOut = isLoggedIn ? '/signin' : 
  const handleSignInOut = () => {
    console.log('triggered');
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setGoToSignOut(true);
    } else {
      setGoToSignIn(true);
    }
  };

  if (goToSignOut) return <Redirect to="/signin" />;
  if (goToSignIn) return <Redirect to="/signin" />;
  if (favView) return <Redirect to="/favs" />;
  if (goToSignup) return <Redirect to="/signup" />;

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component = {RouterLink} to='/profile' onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem component = {RouterLink} to='/account' onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem component = {RouterLink} to='/signin' onClick={handleSignInOut}>{signInOut}</MenuItem>
      <MenuItem component = {RouterLink} to='/signup' onClick={handleSignup}>Sign Up</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap >
            Rental Evaluator
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button onclick={handleThemeChange} />
            <IconButton color="inherit" onClick={handleThemeChange}>
              <Brightness4Icon />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit" component={RouterLink} to='/favs'>
              <Badge badgeContent={favoriteCount} color="secondary">
                <FavoriteIcon onClick={showFavs} />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {/* <MoreIcon /> */}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}