import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { Link as Rlink} from 'react-router-dom';

class GetInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			giverType:'group'
		};
		this.nextStep = this.nextStep.bind(this);
		this.changeType = this.changeType.bind(this);
	}

	nextStep(event) {
		event.preventDefault();
		const data = {
				giver:{
				    type: this.refs.type.value,
				    name: this.refs.name.value,
				    email: this.refs.email.value,
				    phone: this.refs.phone.value,
				    contactName: this.refs.contactName.value,
				    contactTitle: this.refs.contactTitle.value
				}
		};
		this.props.saveValues(data);
		this.props.handleNext();
	}

	changeType(event) {
		event.preventDefault();
		this.setState({
			giverType: event.target.value
		});
	}

	render () {
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
								defaultValue={this.props.fieldValues.giver.type}
								onChange={this.changeType}
							>
								<option value="group">團體</option>
								<option value="individual">個人</option>
							</select>
							<i className="fas fa-sort-down"></i>
						</div>
						{this.state.giverType === 'group' ? 
							<div className="info">
								<h2>團體名稱</h2>
								<input 
									type="text" 
									ref="name"
									placeholder="團體名稱" 
									defaultValue={this.props.fieldValues.giver.name}
								/>
							</div>
						: <input ref="name" className="none"/> }
						<div className="info">
							<h2>聯絡人</h2>
							<input 
								type="text" 
								ref="contactName" 
								placeholder="姓名" 
								defaultValue={this.props.fieldValues.giver.contactName}
							/>
							<select 
								type="text" 
								ref="contactTitle"
								defaultValue={this.props.fieldValues.giver.contactTitle}
								className="padding" 
							>
								<option value="mr">先生</option>
								<option value="miss">女士</option>
							</select>
							<i className="fas fa-sort-down"></i>
						</div>

						<div className="info">
							<h2>電子信箱</h2> 
							<input 
								type="text" 
								ref="email"
								placeholder="電子信箱" 
								defaultValue={this.props.fieldValues.giver.email}
								className="more-width"
							/>
						</div>

						<div className="info">
							<h2>電話</h2>
							<input 
								type="text" 
								ref="phone"
								placeholder="電話"  
								defaultValue={this.props.fieldValues.giver.phone}
							/>
							<h4>人生百味工作人員可能會在事後與您電話連絡確認捐贈事宜</h4>
						</div>
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

export default GetInfo;