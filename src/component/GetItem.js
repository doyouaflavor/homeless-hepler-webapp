import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

import map from 'lodash/map';
import some from 'lodash/some';

import { Link as Rlink} from 'react-router-dom';

import * as helper from '../form-helper';
import GetStepContent from "./GetStepContent";

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

const getDefaultContentArray = () => (
  [{ name: '', amount: '', description: '' }]
);

class GetItem extends React.Component {
  constructor(props) {
    super(props);
    const contentProp = this.props.fieldValues.items[0].content;
    this.state = {
      openCancelDialog:false,
      content: contentProp.length ? contentProp : getDefaultContentArray(),
      open: false,
      isInputRemembered: Boolean(helper.getDonationInputs()),
    };
  }

  componentWillUnmount() {
    this.handleRememberInputs()
  }

  handleAddContent = () => {
    this.setState({ content: this.state.content.concat(getDefaultContentArray()) });
  }

  handleRemoveContent = (idx) => () => {
    this.setState({ content: this.state.content.filter((element,indexbeselced) => idx !== indexbeselced) });
  }

  handleContentChange = (idx) => (event) => {
    const newContent = this.state.content.map((content, sidx) => {
      if (idx !== sidx) return content;
      return { ...content, [event.target.name]: event.target.value };
    });
    this.setState({ content: newContent });
  }

  handleClose = () => {
    this.setState({
      errors: [],
      open: false,
    });
  };

  nextStep = (event) => {
    event.preventDefault();

    const data = this.state.content;
    const failed = some(data, ({ name, amount }) => (
      name === '' || amount === ''
    ));

    if (failed) {
      this.setState({
        errors: ['尚未填寫物資項目或數量'],
        open: true,
      });
    } else {
      this.props.saveContentValues(data);
      this.props.handleNext();
    }
  }

  handleCancelDialogClose = (event) => {
    this.setState({ openCancelDialog: false });
  }

  handleMemorizeInputCheckboxChange = (e) => {
    const { checked } = e.target
    this.setState({ isInputRemembered : checked })
  };

  handleRememberInputs = () => {
    // save inputs if checkbox is checked; remove stored data if unchecked
    if (this.state.isInputRemembered) {
      helper.saveDonationInputs(this.state.content)
    } else {
      helper.removeDonationInputs()
    }
  };

  render() {
    return (
      <div>
        <div className="form-frame">
          <div className="form-one">
            <div className="form-title">請填寫您這次預定捐贈的物資與數量</div>
            <div className="form-two">
              <Hidden smDown>
                <Grid container direction='row'>
                  <Grid item sm={6} md={4}>
                    <h2>項目</h2>
                  </Grid>
                  <Grid item sm={6} md={4}>
                    <h2>數量</h2>
                    <h4>若無確切數量，填寫大約範圍即可</h4>
                  </Grid>
                  <Grid item sm={6} md={4}>
                    <h2>備註</h2>
                  </Grid>
                </Grid>
              </Hidden>
                {this.state.content.map((content, idx) => (
                  <Grid container direction='row' className="item-list">
                    <Grid item xs={12} md={4} className="item">
                      <h2 className="hidden-md">項目</h2>
                      <input
                        type="text"
                        name="name"
                        onChange={this.handleContentChange(idx)}
                        value={content.name}
                        placeholder={`(例：便當)`}
                        key={ `${idx+1} name`}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} className="item">
                      <h2 className="hidden-md">數量</h2>
                      <input
                        type="text"
                        name="amount"
                        onChange={this.handleContentChange(idx)}
                        value={content.amount}
                        placeholder={`(例：20~30個)`}
                        key={ `${idx+1} amount`}
                      />
                      <h4 className="hidden-md">若無確切數量，填寫大約範圍即可</h4>
                    </Grid>
                    <Grid item xs={12} md={4} className="item">
                      <h2 className="hidden-md">備註</h2>
                      <input
                        type="text"
                        name="description"
                        onChange={this.handleContentChange(idx)}
                        value={content.description}
                        placeholder={`(例：素食)`}
                        key={ `${idx+1} description`}
                      />
                      <Hidden smDown>
                        <button type="button" onClick={this.handleAddContent}>+</button>
                        {this.state.content.length > 1 ?
                          <button type="button" onClick={this.handleRemoveContent(idx)}>-</button> : null
                        }
                      </Hidden>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                      <button type="button" onClick={this.handleAddContent} className="hidden-md">
                        + 新增項目
                      </button>
                      {this.state.content.length > 1 ?
                        <button type="button" onClick={this.handleRemoveContent(idx)} className="hidden-md">
                        - 刪除項目
                        </button> : null}
                    </Grid>
                  </Grid>
                ))}
            </div>
            </div>
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.isInputRemembered}
                  onChange={this.handleMemorizeInputCheckboxChange}
                  value="remembered"
                  color="primary"
                />
              }
              label="記住我的輸入"
            />
          </div>
          {/* 按鈕 */}
          <Grid container direction="row" justify="space-between">
            <Button variant="outlined" onClick={this.props.handleBack} className="formbutton-back">
              <i className="fas fa-arrow-left"></i>
              上一步</Button>
            <Hidden smUp>
              <div className="cancle-log" onClick={this.handleCancelDialogOpen}>取消登記</div>
            </Hidden>
            <div className="button-right-block">
              <Hidden xsDown>
                <div className="cancle-log" onClick={this.handleCancelDialogOpen}>取消登記</div>
              </Hidden>
              <Button variant="contained" color="primary" onClick={this.nextStep} className={`formbutton-next ${this.props.classes.button}`}>
                下一步
                <i className="fas fa-arrow-right"></i></Button>
            </div>
          </Grid>
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
          {/*輸入檢查訊息 */}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {map(this.state.errors, (error) => (
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
        </div>
    )
  }
}

GetItem.propTypes = {
  fieldValues: PropTypes.shape({
    locationId: PropTypes.string,
    giver: PropTypes.object,
    items: PropTypes.shape({
      date: PropTypes.string,
      content: PropTypes.array,
    }),
  }).isRequired,
  saveDateValues: PropTypes.func,
  saveContentValues: PropTypes.func,
  saveGiverValues: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};

export default withStyles(styles)(GetItem);
