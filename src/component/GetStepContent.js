import React from 'react';
import GetTimeDate from './GetTimeDate';
import GetItem from './GetItem';
import GetInfo from './GetInfo';
import Confirm from './Confirm';

import Grid from '@material-ui/core/Grid';

class GetStepContent extends React.Component {
	constructor(props) {
	    super(props);
		this.state = {
			viewTimeForm: false
		};
	  }

 	dateSelect = (evt) => {
		this.setState({ viewTimeForm: true });
 	}
 	dateReset = (evt) => {
		this.setState({ viewTimeForm: false });
 	}

	render(){
	  switch (this.props.activeStep) {
	  	// 地點與日期
	    case 0:
	    	return (
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
				    	<GetTimeDate
				    		viewTimeForm={this.state.viewTimeForm}
				    		dateSelect={this.dateSelect}
				    		dateReset={this.dateReset}
				    		{...this.props}
				    	/>
				    </Grid>
				  </Grid>
				</div>
	    	);
	    // 物資
	    case 1:
	      return (
	        <div className="form-one">
	          <div className="form-title">請填寫您這次預定捐贈的物資與數量</div>
	          <GetItem/>
	        </div>
	      );
	    // 捐贈者資料
	    case 2:
	      return (
	        <div className="form-one">
	          <div className="form-title">請填寫您的身份與聯絡資訊</div>
	          <GetInfo/>
	        </div>
	      );
	    //確認資料
	    case 3:
		  return (
	        <div className="form-four">
	          <div className="form-title">請確認您的資料是否有誤</div>
	          <Confirm/>
	        </div>	
		  );
	    default:
	      return 'Unknown step';
	  }
 }
}

export default GetStepContent;