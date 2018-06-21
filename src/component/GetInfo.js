import React from 'react';
import '../dist/form.css';

class GetInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  type: 'group',
		  groupName:'',
		  contactName:'',
		  contactTitle:'先生',
		  email:'',
		  phone:'',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
			},function() {
				console.log(this.state.type);
				console.log(this.state.groupName);
				console.log(this.state.contactName);
				console.log(this.state.contactTitle);
				console.log(this.state.email);
				console.log(this.state.phone);
      	});
	}

	render () {
		return (
			<div className="form-info">

				<div className="info">
					<h2>身份</h2>
					<select 
						type="text" 
						name="type" 
						onChange={this.handleInputChange}
						value={this.state.type}
					>
						<option value="group">團體</option>
						<option value="individual">個人</option>
					</select>
					<i className="fas fa-sort-down"></i>
				</div>
                {this.state.type === 'group' ? 
					<div className="info">
						<h2>團體名稱</h2>
						<input 
							type="text" 
							placeholder="團體名稱" 
							name="groupName" 
							onChange={this.handleInputChange}
							value={this.state.groupName}
						/>
					</div>
                	: null}
				<div className="info">
					<h2>聯絡人</h2>
					<input 
						type="text" 
						placeholder="姓名" 
						name="contactName" 
						onChange={this.handleInputChange}
						value={this.state.contactName}
					/>
					<select 
						type="text" 
						className="padding" 
						name="contactTitle" 
						onChange={this.handleInputChange}
						value={this.state.contactTitle}
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
						placeholder="電子信箱" 
						name="email" 
						onChange={this.handleInputChange}
						value={this.state.email}
						className="more-width"
					/>
				</div>

				<div className="info">
					<h2>電話</h2>
					<input 
						type="text" 
						placeholder="電話" 
						name="phone" 
						onChange={this.handleInputChange}
						value={this.state.phone}
					/>
					<h4>人生百味工作人員可能會在事後與您電話連絡確認捐贈事宜</h4>
				</div>
			</div>
		);
	}
}

export default GetInfo;