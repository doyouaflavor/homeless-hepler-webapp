import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Calendar from './Calendar';

import { Link as Rlink} from 'react-router-dom';

class GetTimeDate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			date: null,
			errors: []
		};
		this.nextStep = this.nextStep.bind(this);
		this.validate = this.validate.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	validate(date) {
		const errors = [];
		if (!this.state.date) {
				errors.push("您尚未提供日期或時間");
		};
		return errors;
	}

	nextStep(event) {
		event.preventDefault();
		const errors = this.validate(this.state.date);
		if (errors.length > 0) {
			this.setState({ errors });
			this.setState({ open: true })
			return;
		} else {
			const data = {
					items:{
					    date: this.state.date,
				        content:{}
					}
			};
			this.props.saveValues(data);
			this.props.handleNext();
		}
	}

        setDate = (date) => {
          this.setState({
            date,
          });
        }

	  handleClose = () => {
	    this.setState({ open: false });
	  };

	render () {
		return (
			<div>
				<div className="form-frame">
					<div className="form-one">
					  <div className="form-title">請選擇您想要捐贈物資的地點與日期</div>
					  <Grid container direction='row' alignItems='flex-start'>
					    <Grid item sm={12} md={4} className="form-one-left">
					      <h2>地點</h2>
					      <h2 className="form-framemark">台北車站</h2>
					      <h3>目前系統僅開放登記台北車站，欲登記其他地點請私訊 <span className="c-link">人生百味粉絲專頁</span></h3>
					    </Grid>
					    <Grid item sm={12} md={8} className="form-one-right">
					    	<h2>日期</h2>
                                                <Calendar
                                                  registeredEvents={this.props.registeredEvents}
                                                  canAdd={true}
                                                  fetched={this.props.fetched}
                                                  setDate={this.setDate}
                                                />
						    </Grid>
						  </Grid>
						</div>
		            </div>
		            {/* 按鈕 */}
		            <Grid container direction="row" justify="flex-end">
		              <Hidden smUp>
		                <Rlink to="/">
		                  <div className="cancle-log">取消登記</div>
		                </Rlink>
		              </Hidden>
		              <div className="button-right-block flex-end">
		                <Hidden xsDown>
		                  <Rlink to="/">
		                    <div className="cancle-log">取消登記</div>
		                  </Rlink>
		                </Hidden>
		                <Button variant="contained" color="primary" onClick={this.nextStep} className="formbutton-next">
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
			            	{this.state.errors}
			            </DialogContentText>
			          </DialogContent>
			          <DialogActions>
			            <Button onClick={this.handleClose} color="primary" autoFocus>
			              Ok
			            </Button>
			          </DialogActions>
			        </Dialog>
	            </div>
		);
	}
}

export default GetTimeDate;
