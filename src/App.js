import React, { Component } from 'react';
import './App.css';
import { Link, Element , Events, animateScroll as scroll, scroller } from 'react-scroll'
import Calendar from 'react-calendar';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import WhiteLogo from './dist/images/life_whitelogo.png';
// import Main from './component/main';
// import { Link } from 'react-router-dom';

class App extends Component {
  state ={
    date: new Date()
  }

  constructor (props){
      super(props);
      this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    Events.scrollEvent.register('begin', function() {
      console.log("begin", arguments);
    });
    Events.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }

  scrollToWithContainer() {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });
      scroller.scrollTo('scroll-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    });

    goToContainer.then(() =>  
        scroller.scrollTo('scroll-container-second-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            containerId: 'scroll-container'
        }));
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }


  render() {
    return (
      <div>
{/* navbar */}
        <AppBar position="static" className="navbar">
          <Toolbar>
            <img src={WhiteLogo} alt="人生百味white-logo" className="life-logo"/>
            <Typography variant="title" color="inherit" className="flex">無家者小幫手</Typography>
            <Hidden smDown>
              <div className="tab-right">
                <Typography variant="title" color="inherit" className="tab-content">
                  <Link activeClass="active" to="join" spy={true} smooth={true} duration={500}>我想參與</Link>
                </Typography>
                <Typography variant="title" color="inherit" className="tab-content">
                  <Link activeClass="active" to="calendar" spy={true} smooth={true} duration={500}>物資日曆</Link>
                </Typography>
                <Typography variant="title" color="inherit" className="tab-content">
                  <Link activeClass="active" to="motivation" spy={true} smooth={true} duration={500}>專案緣起</Link>
                </Typography>           
              </div>    
            </Hidden>
            <Hidden mdUp>
              <MenuIcon />
            </Hidden>
          </Toolbar>
        </AppBar>

{/* Join */}
          <Grid container name="join" className="root intro-page" direction='row' alignItems='center' justify='center' >
            <Grid item sm={12} md={7} alignItems='center' justify='center' >
                <Grid container className="intro-left" direction='row' alignItems='center' justify='center'>
                    <Hidden smDown>
                      <img src={WhiteLogo} alt="人生百味white-logo" className="intro-life-logo"/>
                      <Typography variant="display3" className="intro-title">無家者小幫手</Typography>
                    </Hidden>
                    <Hidden mdUp>
                      <div className="intro-left-sm">
                        <img src={WhiteLogo} alt="人生百味white-logo" className="intro-life-logo" />
                        <Typography variant="display3" className="intro-title">無家者小幫手</Typography>    
                      </div>
                    </Hidden>
                  <div>
                    <Typography className="intro-left-content" variant="title">這是一個整合街頭資源的網站，包含食物分享的資訊、登記與查閱的功能，讓街上的資源能更有效地運用，並穩定無家者的基本生活需求</Typography>
                    <Typography className="intro-left-content" variant="title">志工系統建置中，欲擔任志工請私訊 <span className="c-link">人生百味粉絲專頁</span> </Typography>
                  </div>
                </Grid>
            </Grid>
            <Grid container className="intro-right" sm={12} md={5} direction="column"alignItems='center' justify='center'>
              <Typography className="intro-content-right">我有物資想要分享</Typography>
              <Button variant="contained" component="span" className="intro-button">登記發放物資</Button>
              <Typography className="intro-content-right">想要參與</Typography>
              <Typography className="intro-content-right">但不知道從何開始嗎?</Typography>
              <Typography className="c-link-big" variant="display1">看看參與指南</Typography>
            </Grid>
          </Grid>
{/* Calendar */}
          <Grid container name="calendar" className="root calendar-page" direction='row' alignItems='flex-start' justify='center'>
            <Grid container sm={12} md={5} className="calendarpage-left"  alignItems='center' justify='center'>
              <Grid className="calendarpage-left-content" direction='column'>
                <h1>物資日曆</h1>           
                <p>地點</p>
                <TextField id="margin-dense" defaultValue="台北車站"/>
                <p>今日登記狀況</p>
                <div className="log-status">尚未有人登記</div>
                <Hidden smDown>
                  <Button variant="contained" component="span" className="calendarpage-left-button">登記發放物資</Button>
                </Hidden>
              </Grid>
            </Grid>
            <Grid container sm={12} md={7} alignItems='center' justify='center' className="calendarpage-right">
              <Calendar
              onChange={this.onChange}
              value={this.state.date}
              tileContent=
              {({ date, view }) => view === 'month' && date.getDay() === 3 ? <span>&nbsp;&nbsp;<i class="fas fa-people-carry"></i></span> : null}
              />
            </Grid>
          </Grid>
{/* Motivation */}
          <Grid container name="motivation" className="root motiv-page" direction='column' alignItems='center' justify='center'>
            <Grid container direction='column' alignItems='center' justify='center' className="motiv-block-first">
              <Grid container direction='row' alignItems='flex-start' justify='center' className="motiv-block-second">
                <Grid item sm={12} md={4} className="motiv-block-left"><h1>專案緣起</h1></Grid>
                <Grid item sm={12} md={8}></Grid>
              </Grid>

              <Grid container direction='row' alignItems='flex-start' justify='center' className="motiv-block-second">
                <Grid item sm={12} md={4} className="motiv-block-left"><h1>為什麼會有無家者小幫手?</h1><div className="buttom-line"></div></Grid>
                <Grid item sm={12} md={8}>
                  <h2>街頭上存在<span>資源供給不穩定</span>的現象</h2>
                  <h3>物資常集中在寒流來襲或媒體報導的特定幾天，有時食物多到吃不完造成浪費，但大多時候卻有一餐沒一餐。</h3>
                  <h3>對無家者而言，這樣的現象卻是有口難言，怕主動拒絕了善心人士的好意，會讓對方留下不好的印象。</h3>
                  <h3>「有得吃就要感恩了，怎麼可以抱怨！」</h3>
                  <h3>一名流浪資歷豐富的大哥如是說。</h3>
                </Grid>
              </Grid>

              <Grid container direction='row' alignItems='flex-start' justify='center' className="motiv-block-second">
                <Grid item sm={12} md={4} className="motiv-block-left"><h1>無家者小幫手如何運作?</h1><div className="buttom-line"></div></Grid>
                <Grid item sm={12} md={8}>
                  <span>查詢</span><span>登記</span><span>一份可預期的日曆</span>
                  <h3>我們希望透過網路平台的方式，提供想要發放物資的人登錄自己的街頭發餐、發物資紀錄。</h3>
                </Grid>
              </Grid>

              <Grid container direction='row' alignItems='flex-start' justify='center' className="motiv-block-second">
                <Grid item sm={12} md={4} className="motiv-block-left"><h1>無家者小幫手可以達到什麼效果?</h1><div className="buttom-line"></div></Grid>
                <Grid item sm={12} md={8}>
                  <h2>透過公開資訊、協調機制，改善物資供給不穩定的現象</h2>
                  <h2>對於<span>無家者</span></h2>
                  <h3>(1) 獲得一個可預期的行事曆，避免有一餐沒一餐</h3>
                  <h3>(2) 讓街頭的食物不會擠在同一天發放</h3>
                  <h3>(3) 對年紀大、行動不便而無法工作來購買食物的無家者影響最大</h3>
                  <h2>對於<span>分享者</span></h2>
                  <h3>(1) 分散資源供給，愛心不容易被打槍</h3>
                  <h3>(2) 資源不造成浪費，用在真正的需要上</h3>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default App;

{/*         <Main/> */}
{/*         <Link to="/Form">form</Link> */}