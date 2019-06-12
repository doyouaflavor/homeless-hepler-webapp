import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

import validator from 'validator';
import map from 'lodash/map';

import { GIVER_TYPES, CONTACT_TITLES } from '../const';

import { Link as Rlink} from 'react-router-dom';
import * as helper from "../form-helper";


const styles = {
  confirmButton: {
    color: '#F7B815',
    fontWeight: '200'
  },
  cancleButton: {
    color: '#666666',
    fontWeight: '200'
  },
  button: {
    backgroundColor: '#F7B815'
  }
};

const getDefaultState = ( giver ) => {
  const defaultState =  {
    openCancelDialog: false,
    type: 'person',
    name: '',
    contactName: '',
    contactTitle: 'Mr.',
    email: '',
    phone: '',
    open: false,
    errors: [],
    isInfoRemembered: false,
  };
  const cachedGiver = helper.getCachedInputsByKey(helper.CONTACT_INFO_KEY);
  const checkBoxState = { isInfoRemembered: Boolean(cachedGiver)};

  if (isPropsGiverUsable(giver)) {
    return Object.assign({}, defaultState, giver, checkBoxState);
  } else if (cachedGiver) {
    return Object.assign({}, defaultState, cachedGiver, checkBoxState);
  } else {
    return defaultState;
  }

};

const isPropsGiverUsable = (propGiver) => {
  return propGiver && Object.keys(propGiver).length > 0;
};

class GetInfo extends React.Component {
  constructor(props) {
    super(props);
    const { giver } = this.props.fieldValues;
    this.state = getDefaultState(giver);

    this.nextStep = this.nextStep.bind(this);
    this.changeType = this.changeType.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCancelDialogOpen = this.handleCancelDialogOpen.bind(this);
    this.handleCancelDialogClose = this.handleCancelDialogClose.bind(this);
  }

  componentWillUnmount() {
    this.handleRememberInputs();
  }

  validate() {
    const errors = [];
    if (this.state.type === 'organization' && this.state.name === '') {
      errors.push("尚未填寫團體名稱");
    }
    if (this.state.type === 'store' && this.state.name === '') {
      errors.push("尚未填寫商家名稱");
    }
    if (this.state.contactName === '') {
      errors.push("尚未填寫聯絡人");
    }
    if (this.state.email === '') {
      errors.push("尚未填寫電子信箱");
    }
    if (!validator.isEmail(this.state.email)) {
      errors.push("電子信箱格式錯誤");
    }
    if (this.state.phone === '') {
      errors.push("尚未填寫聯絡電話");
    }
    return errors;
  }

  nextStep(event) {
    event.preventDefault();
    const errors = this.validate();
    if (errors.length > 0) {
      this.setState({errors});
      this.setState({open: true})
      return;
    } else {
      const {
        type,
        name,
        contactName,
        contactTitle,
        email,
        phone,
      } = this.state;
      const giver = {
        type: type,
        name: type === 'person' ? contactName : name,
        contactName,
        contactTitle,
        email,
        phone,
      };

      this.props.saveGiverValues(giver);
      this.props.handleNext();
    }
  }

  handlePrevStepClick = (e) => {
    e.preventDefault();
    this.props.saveGiverValues(this.extractGiverValues());
    this.props.handleBack();
  };

  extractGiverValues = () => {
    const {
      type,
      name,
      contactName,
      contactTitle,
      email,
      phone,
    } = this.state;

    return  {
      type: type,
      name: type === 'person' ? contactName : name,
      contactName,
      contactTitle,
      email,
      phone,
    };
  };

  changeType(event) {
    event.preventDefault();

    const {value} = event.target;

    this.setState({
      type: event.target.value,
      name: value === 'person' ? '' : this.state.name,
    });
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  handleContactNameChange = (event) => {
    this.setState({
      contactName: event.target.value,
    });
  }

  handleContactTitleChange = (event) => {
    this.setState({
      contactTitle: event.target.value,
    });
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  handlePhoneChange = (event) => {
    this.setState({
      phone: event.target.value,
    });
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleCancelDialogOpen = (event) => {
    this.setState({openCancelDialog: true});
  }

  handleCancelDialogClose = (event) => {
    this.setState({openCancelDialog: false});
  }

  handleMemorizeChkBoxChange = (e) => {
    this.setState({
      isInfoRemembered: e.target.checked,
    });
  };

  handleRememberInputs = () => {
    // save inputs if checkbox is checked; remove stored data if unchecked
    if (this.state.isInfoRemembered) {
      helper.saveContactInfo(this.extractGiverValues());
    } else {
      helper.removeCachedInputsByKey(helper.CONTACT_INFO_KEY);
    }
  };

  render() {
    return (
      <div>
        <div className="form-frame">
          <div className="form-one">
            <div className="form-title">請填寫您的身份與聯絡資訊</div>
            <div className="form-info">
              <div className="info">
                <h2>身份</h2>
                <select
                  type="text"
                  ref="type"
                  value={this.state.type}
                  onChange={this.changeType}
                >
                  {map(GIVER_TYPES, (shownValue, value) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {shownValue}
                    </option>
                  ))}
                </select>
                <i className="fas fa-sort-down"></i>
              </div>
              {this.state.type === 'person' ?
                <input ref="name" className="none"/> :
                <div className="info">
                  <h2>{this.state.type === 'organization' ? '團體名稱' : '商家名稱'}</h2>
                  <input
                    type="text"
                    ref="name"
                    placeholder={this.state.type === 'organization' ? '團體名稱' : '商家名稱'}
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </div>}
              <div className="info">
                <h2>聯絡人</h2>
                <input
                  type="text"
                  ref="contactName"
                  placeholder="姓名"
                  value={this.state.contactName}
                  onChange={this.handleContactNameChange}
                />
                <select
                  type="text"
                  ref="contactTitle"
                  className="padding"
                  value={this.state.contactTitle}
                  onChange={this.handleContactTitleChange}
                >
                  {map(CONTACT_TITLES, (shownValue, value) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {shownValue}
                    </option>
                  ))}
                </select>
                <i className="fas fa-sort-down"></i>
              </div>

              <div className="info">
                <h2>電子信箱</h2>
                <input
                  type="text"
                  ref="email"
                  placeholder="電子信箱"
                  className="more-width"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>

              <div className="info">
                <h2>電話</h2>
                <input
                  type="text"
                  ref="phone"
                  placeholder="電話"
                  value={this.state.phone}
                  onChange={this.handlePhoneChange}
                />
                <h4>人生百味工作人員可能會在事後與您電話連絡確認捐贈事宜</h4>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.isInfoRemembered}
                onChange={this.handleMemorizeChkBoxChange}
                value="remembered"
                color="primary"
              />
            }
            label="記住我的聯絡資訊"
          />
        </div>
        {/* 按鈕 */}
        <Grid container direction="row" justify="space-between">
          <Button variant="outlined" onClick={this.handlePrevStepClick} className="formbutton-back">
            <i className="fas fa-arrow-left"></i>
            上一步</Button>
          <Hidden smUp>
            <div className="cancle-log" onClick={this.handleCancelDialogOpen}>取消登記</div>
          </Hidden>
          <div className="button-right-block">
            <Hidden xsDown>
              <div className="cancle-log" onClick={this.handleCancelDialogOpen}>取消登記</div>
            </Hidden>
            <Button variant="contained" color="primary" onClick={this.nextStep}
                    className={`formbutton-next ${this.props.classes.button}`}>
              下一步
              <i className="fas fa-arrow-right"></i></Button>
          </div>
        </Grid>
        {/*輸入檢查訊息 */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {/*取消確認視窗 */}
        <Dialog
          open={this.state.openCancelDialog}
          onClose={this.handleCancelDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              您即將取消登記，已經填的資料可能會遺失。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelDialogClose} className={this.props.classes.confirmButton} autoFocus>
              繼續登記
            </Button>
            <Rlink to="/">
              <Button className={this.props.classes.cancleButton} autoFocus>
                取消登記
              </Button>
            </Rlink>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

GetInfo.propTypes = {
  fieldValues: PropTypes.shape({
    locationId: PropTypes.string,
    giver: PropTypes.object,
    items: PropTypes.shape({
      date: PropTypes.string,
      content: PropTypes.array,
    }),
  }).isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  saveGiverValues: PropTypes.func.isRequired,
};

export default withStyles(styles)(GetInfo);
