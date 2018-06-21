import React from 'react';
import '../dist/form.css';
import { Link as Rlink} from 'react-router-dom';
import WhiteLogo from '../dist/images/life_whitelogo.png';
import GetStepContent from './GetStepContent';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

// Over write material-ui
const styles = theme => ({
  root: {
    width: '90%',
    margin: '0 auto',
    backgroundColor: '#F7F7F7',
  },
  stepstyle:{
    fontSize:'20px',
  },
});

// form title
function getSteps() {
  return ['地點與日期', '物資', '捐贈者資料' , '確認資料'];
}

class Form extends React.Component {

  state = {
    activeStep: 0,
    date:'',
    time:'',
  };

// 獲取日期跟時間的資訊，其他的表單資訊還沒串到這裡
  getDate = (newDate) => {
      this.setState({
        date: newDate,
      }, function() {
          console.log('date:' + this.state.date);
      })
  };
  getTime = (newTime) => {
      this.setState({
        time: newTime,
      }, function() {
          console.log('time:' + this.state.time);
      })
  };


//按鈕控制
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className="form-page">
        <AppBar position="static" className="navbar">
          <Toolbar>
            <img src={WhiteLogo} alt="人生百味white-logo" className="life-logo"/>
            <Rlink to="/">
              <Typography variant="title" color="inherit" className="flex">無家者小幫手</Typography>
            </Rlink>
          </Toolbar>
        </AppBar>

        <div className="form-nav">
            <span><i className="fas fa-utensils"></i> 物資登記發放</span>
        </div>
        <div className={classes.root}>
  {/* 進度條 */}
          <Stepper activeStep={activeStep} className="stepp-style">
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps} className="step-number">
                    <span className="stepp-style">
                      <Hidden xsDown>{label}</Hidden>
                    </span>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <div>
            {activeStep === steps.length ? (

              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&quot;re finished
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <div className="form-frame">

{/* 判斷是哪一個填表步驟 */}
                  <GetStepContent
                    activeStep={this.state.activeStep}
                    callGetDate={this.getDate}
                    callGetTime={this.getTime}
                    childData={this.state.data}
                  />

                </div>
                <Grid container direction="row" justify="space-between">
                  <Button variant="outlined" disabled={activeStep === 0} onClick={this.handleBack} className="formbutton-back">
                    <i className="fas fa-arrow-left"></i> 
                    上一步</Button>
                  <Hidden smUp>
                      <div className="cancle-log">取消登記</div>
                  </Hidden>
                  <div className="button-right-block">
                    <Hidden xsDown>
                      <div className="cancle-log">取消登記</div>
                    </Hidden>
                    <Button variant="contained" color="primary" onClick={this.handleNext} className="formbutton-next">
                      {activeStep === steps.length - 1 ? '確定登記' : '下一步'}
                      <i className="fas fa-arrow-right"></i></Button>
                  </div>
                </Grid>
              </div>
            )}
          </div>
        </div>
      </div>

    );
  }
}

export default withStyles(styles)(Form);
