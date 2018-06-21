import React from 'react';
import '../dist/form.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class GetTimeDate extends React.Component {
	constructor(props) {
		super(props);
		this.getDate = this.getDate.bind(this);
		this.getTime = this.getTime.bind(this);
	}

	 state = {
	 	date:'',
	 	time:'',
	 };

	getDate = (event) => {
		this.setState({
			date: event.target.value
		},	function() {
				var newDate = this.state.date;
				this.props.callGetDate(newDate);
		});
	}

	resetDate = (event) => {
		this.setState({
			date: ''
		},	function() {
				var newDate = this.state.date;
				this.props.callGetDate(newDate);
		});
	}

	getTime = (event) => {
		this.setState({
			time: event.target.value
		},	function() {
				var newTime = this.state.time;
				this.props.callGetTime(newTime);
		});
	}

	render () {
		switch (this.props.viewTimeForm) {
		// 時間
		case true:
		  return (
		    <div className="form-time">
		    	<div className="form-time-title">2018年7月3日 (星期二) 
		    		<span 
			    		onClick={ (event) => {this.props.dateReset(); this.resetDate();}} 
			    		className="form-time-little">
			    		重選日期
		    		</span>
		    	</div>
		    	<Grid container direction="row" justify="space-between">
		    		<Grid item sm={12} md={6} className="time-select">
		    			<h3>您預計發放的時間</h3>
		    			<input 
		    				type="text" 
		    				placeholder="(例： 18:00)"
		    				onChange={this.getTime}
		    				value={this.state.time}
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

{/* 這裡之後用日曆替換 */}
				<input 
					type="text" 
					placeholder="填入日期"
					onChange={this.getDate}
				/>
			    <Button onClick={this.props.dateSelect}>送出日期</Button>
			    
		  	</div>
		  );
		}
	}
}

export default GetTimeDate;