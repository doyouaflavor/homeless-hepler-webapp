import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { Link as Rlink} from 'react-router-dom';

class GetTimeDate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: null
		};
		this.nextStep = this.nextStep.bind(this);
		this.getDate = this.getDate.bind(this);
		this.resetDate = this.resetDate.bind(this);
	}
	nextStep(event) {
		event.preventDefault();
		const data = {
				items:{
				    date: this.state.date,
			        content:{}
				}
		};
		this.props.saveValues(data);
		this.props.handleNext();
	}
	getDate(event) {
		this.setState({
			date: event.target.value
		});
	}

	resetDate = (event) => {
		this.setState({
			date: ''
		});
	}

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
					    		{( () => {
									switch (this.props.viewTimeForm) {
										// 時間
										case true:
										  return (
										    <div className="form-time">
										    	<div className="form-time-title">2018年7月3日 (星期二) 
										    		<span 
											    		onClick={(event) => {this.props.dateReset(); this.resetDate();}} 
											    		className="form-time-little">
											    		重選日期
										    		</span>
										    	</div>
										    	<Grid container direction="row" justify="space-between">
										    		<Grid item sm={12} md={6} className="time-select">
										    			<h3>您預計發放的時間</h3>
										    			<input 
															type="text" 
															ref="time" 
															placeholder="(例： 18:00)" 
										    			/>
										    		</Grid>
										    		<Grid item sm={12} md={6} className="form-time-current">
										    			<h3>當天已有的登記</h3>
										    			<Grid container direction="row" className="current-item">
										    				<Grid item sm={4} md={4}>
										    					<h4>12:00</h4>
										    				</Grid>
										    				<Grid item sm={8} md={8}>
										    					<h4>便當 20個</h4>
										    					<h4>飲料 20杯</h4>
										    				</Grid>
										    			</Grid>
										    		</Grid>
										    	</Grid>
										    </div>
										  );
										// 日期
										default:
										  return (
										  	<div>
												{/* 這裡放日曆 */}
												<input 
													type="text" 
													ref="date" 
													placeholder="這裡改日曆" 
													defaultValue={this.props.fieldValues.items.date}
													onChange={this.getDate}
												/>
											    <Button onClick={this.props.dateSelect}>送出日期</Button>
										  	</div>
										  );
										}
					    			}
					    		)()}
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
	            </div>
		);
	}
}

export default GetTimeDate;