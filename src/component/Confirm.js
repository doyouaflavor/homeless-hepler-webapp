import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';

import { Link as Rlink} from 'react-router-dom';

import moment from 'moment';
import map from 'lodash/map';

import { createEvents } from '../api/events'
import { getDateStr, getTimeStr } from '../utils';
import { GIVER_TYPES, CONTACT_TITLES } from '../const';

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

class Confirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openCancelDialog:false,
	  		confirmStatus: false,
	  		open: false,
                        creating: false,
		};
		this.handleCheck = this.handleCheck.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleCancelDialogOpen = this.handleCancelDialogOpen.bind(this);
		this.handleCancelDialogClose = this.handleCancelDialogClose.bind(this);
	}

	handleCheck(event) {
		this.setState({ confirmStatus: !this.state.confirmStatus});
	}

	handleClose = () => {
		this.setState({ open: false });
	}

	handleCancelDialogOpen = (event) =>{
		this.setState({ openCancelDialog: true });
	}

	handleCancelDialogClose = (event) => {
		this.setState({ openCancelDialog: false });
	}

        handleConfirmBtnClick = async (event) => {
		event.preventDefault();

		if (this.state.confirmStatus === false) {
			this.setState({open:true});
                        return;
		}

                this.setState({
                        creating: true,
                });

                try {
                        await createEvents(this.props.fieldValues)
                        this.props.handleNext();
                } catch (err) {
                        // TODO(SuJiaKuan): 錯誤處理.
                        console.error(err);

                        this.setState({
                                creating: false,
                        });
                }
        }

	render () {
                const date = moment(this.props.fieldValues.items[0].date);
                const { content } = this.props.fieldValues.items[0];
                const dateStr = getDateStr(date);
                const timeStr = getTimeStr(date);

                const prevBtnDisalbed = this.state.creating;
                const nextBtnDisalbed = this.state.creating;

		return (
			<div>
			<div className="form-frame">
		        <div className="form-four">
		         	<div className="form-title">請確認您的資料是否有誤</div>
					<Grid container direction="row" justify="space-between" className="form-confirm">
						<Grid item xs={12} md={8} className="left-part">
							<div className="location">
								<h1>地點</h1>
								<h2>台北車站</h2>
							</div>
							<Hidden smDown>
								<Grid container direction='row' className="list-title">
									<Grid item md={2}>
									  <h1>日期</h1>
									</Grid>
									<Grid item md={2}>
									  <h1>時間</h1>
									</Grid>
									<Grid item xs={4} md={2}>
									  <h1>物資</h1>
									</Grid>
									<Grid item xs={4} md={2}>
									  <h1>數量</h1>
									</Grid>
									<Grid item xs={4} md={2}>
									  <h1>備註</h1>
									</Grid>
								</Grid>		
							</Hidden>

							<Hidden mdUp>
								<Grid container direction="row" justify="space-between" className="mobile-date-time hidden-md">
									<h2>{dateStr}</h2>
									<h2>{timeStr}</h2>
								</Grid>
							</Hidden>
				            <Grid container direction='row' className="list-title">
								<Grid item md={2} className="hidden-sm">
								  <h2>{dateStr}</h2>
								</Grid>
								<Grid item md={2} className="hidden-sm">
								  <h2>{timeStr}</h2>
								</Grid>
								<Grid item xs={4} md={2}>
                                                                  {map(content, ({ name }, idx) => <h2 key={idx}>{name}</h2>)}
								</Grid>
								<Grid item xs={4} md={2}>
                                                                  {map(content, ({ amount }, idx) => <h2 key={idx}>{amount}</h2>)}
								</Grid>
								<Grid item xs={4} md={2}>
                                                                  {map(content, ({ description }, idx) => <h2 key={idx}>{description}</h2>)}
								</Grid>
				            </Grid>
						</Grid>
						<Grid item xs={12} md={4} className="right-part">
							<div className="giver-info">
								<h1>身份</h1>
								<h2>
									<span>{GIVER_TYPES[this.props.fieldValues.giver.type]}: </span>
									{this.props.fieldValues.giver.name}
								</h2>

								<h1>聯絡人</h1>
								<h2>
									<span>{this.props.fieldValues.giver.contactName} </span>
									<span> {CONTACT_TITLES[this.props.fieldValues.giver.contactTitle]}</span>
								</h2>

								<h1>電子信箱</h1>
								<h2>{this.props.fieldValues.giver.email}</h2>

								<h1>電話</h1>
								<h2>{this.props.fieldValues.giver.phone}</h2>
							</div>
						</Grid>
					</Grid>
					<div className='confirm-term'>
						<input type="checkbox" onClick={this.handleCheck}/>
						<h1>同意條款</h1>
					</div>
		           </div>
				</div>
				{/* 按鈕 */}
				<Grid container direction="row" justify="space-between">
				  <Button variant="outlined" onClick={this.props.handleBack} className="formbutton-back" disabled={prevBtnDisalbed}>
				    <i className="fas fa-arrow-left"></i> 
				    上一步</Button>
				  <Hidden smUp>
					<div className="cancle-log" onClick={this.handleCancelDialogOpen}>取消登記</div>
				  </Hidden>
				  <div className="button-right-block">
				    <Hidden xsDown>
				    	<div className="cancle-log" onClick={this.handleCancelDialogOpen}>取消登記</div>
				    </Hidden>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={this.handleConfirmBtnClick}
                                      className={`formbutton-next ${this.props.classes.button}`}
                                      disabled={nextBtnDisalbed}
                                    >
				      確認登記
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
		            	請勾選同意條款
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

export default withStyles(styles)(Confirm);
