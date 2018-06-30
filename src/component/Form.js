import React from 'react';
import '../App.css';
import { Link as Rlink} from 'react-router-dom';
import WhiteLogo from '../dist/images/life_whitelogo.png';
import GetStepContent from './GetStepContent';
import ThanksGiving from './ThanksGiving';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';

import moment from 'moment';
import map from 'lodash/map';
import merge from 'lodash/merge';

import { getTaipeiStationEvents } from '../api/events';

let fieldValues ={
  locationId: '5b22852b0d5ab7225a23666d',
  giver:{
    type: '個人',
    name: "",
    email: "",
    phone: "",
    contactName: "",
    contactTitle: '先生'
  },
  items:{
    date: "",
    content:{}
  }
};

// Over write material-ui
const styles = {
  stepStyle:{
    fontSize:'20px',
  }
};
// step title
function getSteps() {
  return ['地點與日期', '物資', '捐贈者資料' , '確認資料'];
}


class Form extends React.Component {

  state = {
    activeStep: 0,
    date:'',
    time:'',
    registeredEvents: [],
    fetched: false,
  };

  async componentDidMount() {
    try {
      const events = await getTaipeiStationEvents();
      const registeredEvents = map(events, (event) => merge(event, {
        date: moment(event.date),
      }))

      this.setState({
        registeredEvents,
        fetched: true,
      })
    } catch (err) {
      // TODO(SuJiaKuan): 錯誤處理
      console.error(err);
    }
  }


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
  saveValues = (fields) => {
      return function() {
        fieldValues = Object.assign({},fieldValues, fields)
      }.bind(this)();
    };
  saveContentValues = (fields) => {
      return function() {
        fieldValues.items.content = Object.assign({}, fieldValues.items.content, fields)
      }.bind(this)();
    };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    },function() {
        console.log(fieldValues);
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };


  render() {
    const steps = getSteps();
    const { activeStep } = this.state;

    return (

      // nav
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

        <div className="form-inside">
  {/* 進度條 */}
          <Stepper activeStep={activeStep} className={this.props.classes.stepStyle}>
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
              <ThanksGiving/>
            ) : (
              <div>
              {/* 表單內容 */}
                  <GetStepContent
                    activeStep={this.state.activeStep}
                    saveValues={this.saveValues}
                    saveContentValues={this.saveContentValues}
                    handleNext={this.handleNext}
                    handleBack={this.handleBack}
                    fieldValues={fieldValues}
                    registeredEvents={this.state.registeredEvents}
                    fetched={this.state.fetched}
                  />
              </div>
            )}
          </div>
        </div>
      </div>

    );
  }
}

export default withStyles(styles)(Form);
