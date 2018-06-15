import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

import { Link as Rlink} from 'react-router-dom';

import '../dist/form.css';
import WhiteLogo from '../dist/images/life_whitelogo.png';


const styles = theme => ({
  root: {
    width: '90%',
    margin: '0 auto',
    backgroundColor: '#F7F7F7',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  stepstyle:{
    fontSize:'20px',
  },
});

function getSteps() {
  return ['地點與日期', '物資', '捐贈者資料' , '確認資料'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div className="form-one">
          <div className="form-title">請選擇您想要捐贈物資的地點與日期</div>
          <Grid container direction='row' alignItems='flex-start' justify='center'>
            <Grid item sm={12} md={4} className="form-one-left">
              <h2>地點</h2>
              <h2 className="form-framemark">台北車站</h2>
              <h3>目前系統僅開放登記台北車站，欲登記其他地點請私訊 <span className="c-link">人生百味粉絲專頁</span></h3>
            </Grid>
            <Grid item sm={12} md={8} className="form-one-right">
              <h2>日期</h2>
            </Grid>
          </Grid>
        </div>
      )
    case 1:
      return '物資';
    case 2:
      return '捐贈者資料';
    case 3:
      return '確認資料';
    default:
      return 'Unknown step';
  }
}

class Form extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  state = {
    activeStep: 0,
  };

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
                    <span className="stepp-style">{label}</span>
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
                <div className="form-frame">{getStepContent(activeStep)}</div>

                <div>
                  <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    );
  }
}

export default withStyles(styles)(Form);
