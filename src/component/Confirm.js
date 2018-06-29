import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { Link as Rlink} from 'react-router-dom';

class Confirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  confirmStatus: false,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		this.setState({

		});
	}

	render () {
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
									<h2>{this.props.fieldValues.items.date}</h2>
									<h2>時間!</h2>
								</Grid>
							</Hidden>
				            <Grid container direction='row' className="list-title">
								<Grid item md={2} className="hidden-sm">
								  <h2>{this.props.fieldValues.items.date}</h2>
								</Grid>
								<Grid item md={2} className="hidden-sm">
								  <h2>時間!</h2>
								</Grid>
								<Grid item xs={4} md={2}>
								  <h2>便當</h2>
								  <h2>小蛋糕</h2>
								</Grid>
								<Grid item xs={4} md={2}>
								  <h2>40</h2>
								  <h2>30~40個</h2>
								</Grid>
								<Grid item xs={4} md={2}>
								  <h2>素食</h2>
								  <h2>備註過長換行備註過長換行備註過長換行備註過長換行備註過長換行</h2>
								</Grid>  	
				            </Grid>
						</Grid>
						<Grid item xs={12} md={4} className="right-part">
							<div className="giver-info">
								<h1>身份</h1>
								<h2>
									<span>{this.props.fieldValues.giver.type}: </span>
									{this.props.fieldValues.giver.name}
								</h2>

								<h1>聯絡人</h1>
								<h2>
									<span>{this.props.fieldValues.giver.contactName} </span>
									<span> {this.props.fieldValues.giver.contactTitle}</span>
								</h2>

								<h1>電子信箱</h1>
								<h2>{this.props.fieldValues.giver.email}</h2>

								<h1>電話</h1>
								<h2>{this.props.fieldValues.giver.phone}</h2>
							</div>
						</Grid>
					</Grid>
					<div className='confirm-term'>
						<input type="checkbox"/>
						<h1>同意條款</h1>
					</div>
		           </div>
				</div>
				{/* 按鈕 */}
				<Grid container direction="row" justify="space-between">
				  <Button variant="outlined" onClick={this.props.handleBack} className="formbutton-back">
				    <i className="fas fa-arrow-left"></i> 
				    上一步</Button>
				  <Hidden smUp>
				    <Rlink to="/">
				      <div className="cancle-log">取消登記</div>
				    </Rlink>
				  </Hidden>
				  <div className="button-right-block">
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

export default Confirm;