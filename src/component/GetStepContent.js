import React from 'react';
import GetTimeDate from './GetTimeDate';
import GetItem from './GetItem';
import GetInfo from './GetInfo';
import Confirm from './Confirm';

class GetStepContent extends React.Component {

	render(){
	  switch (this.props.activeStep) {
	  	// 地點與日期
	    case 0:
	      return ( <GetTimeDate {...this.props} /> );
	    // 物資
	    case 1:
	      return ( <GetItem {...this.props}/> );
	    // 捐贈者資料
	    case 2:
	      return ( <GetInfo {...this.props}/> );
	    //確認資料
	    case 3:
		  return ( <Confirm {...this.props}/> );
	    default:
	      return 'Unknown step';
	  }
 }
}

export default GetStepContent;
