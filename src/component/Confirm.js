import React from 'react';
import '../dist/form.css';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

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
				<Grid container direction="row" justify="space-between" className="form-confirm">
					<Grid item xs={12} md={8} className="left-part">
						<div className="location">
							<h1>地點</h1>
							<h2>台北車站</h2>
						</div>
						<Hidden smDown>
							<Grid container direction='row' className="list-title">
								<Grid md={2}>
								  <h1>日期</h1>
								</Grid>
								<Grid md={2}>
								  <h1>時間</h1>
								</Grid>
								<Grid xs={4} md={2}>
								  <h1>物資</h1>
								</Grid>
								<Grid xs={4} md={2}>
								  <h1>數量</h1>
								</Grid>
								<Grid xs={4} md={2}>
								  <h1>備註</h1>
								</Grid>
							</Grid>		
						</Hidden>

						{/* 以下為假資料 */}
						<Hidden mdUp>
							<Grid container direction="row" justify="space-between" className="mobile-date-time hidden-md">
								<h2>2018/7/3 (二)</h2>
								<h2>18:00</h2>
							</Grid>
						</Hidden>
			            <Grid container direction='row' className="list-title">
							<Grid md={2} className="hidden-sm">
							  <h2>2018/7/3 (二)</h2>
							</Grid>
							<Grid md={2} className="hidden-sm">
							  <h2>18:00</h2>
							</Grid>
							<Grid xs={4} md={2}>
							  <h2>便當</h2>
							  <h2>小蛋糕</h2>
							</Grid>
							<Grid xs={4} md={2}>
							  <h2>40</h2>
							  <h2>30~40個</h2>
							</Grid>
							<Grid xs={4} md={2}>
							  <h2>素食</h2>
							  <h2>備註過長換行備註過長換行備註過長換行備註過長換行備註過長換行</h2>
							</Grid>  	
			            </Grid>
					</Grid>
					<Grid item xs={12} md={4} className="right-part">
						<div className="giver-info">
							<h1>身份</h1>
							<h2>
								<span>團體: </span>
								財團法人慈善基金會
							</h2>

							<h1>聯絡人</h1>
							<h2>
								<span>陳筱玲 </span>
								<span> 女士</span>
							</h2>

							<h1>電子信箱</h1>
							<h2>longlonglonglonglonglong@gmail.com</h2>

							<h1>電話</h1>
							<h2>(02)2345-6789</h2>
						</div>
					</Grid>
				</Grid>
				<div className='confirm-term'>
					<input type="checkbox"/>
					<h1>同意條款</h1>
				</div>
			</div>
		);
	}
}

export default Confirm;