import React from 'react';
import { Link as Rlink} from 'react-router-dom';
import '../dist/form.css';
import HollowLogo from '../dist/images/logo_frame.png';

import Grid from '@material-ui/core/Grid';

class ThanksGiving extends React.Component {

	render () {
		return (
			<div>
				<div className="form-one thanks">
					<Grid container direction='row' alignItems='center' justify='center' className="logo-block">
						<img src={HollowLogo} alt="人生百味white-logo"/>
						<div variant="display3" className="end-title">無家者小幫手</div>					
					</Grid>
					<h1>感謝您的參與!</h1>
					<h2>請在接下來的數分鐘內留意您的</h2>
					<h2>電子信箱內是否有收到確認信</h2>
					<h3>有任何問題請私訊 
						<a href="https://www.facebook.com/Do.you.a.flavor/"> 人生百味粉絲專頁</a>
					</h3>
				</div>	
				<Rlink to="/">
					<div className="end-block">回到 <span>無家者小幫手 </span> 首頁</div>	
				</Rlink>		
			</div>
		);
	}
}

export default ThanksGiving;