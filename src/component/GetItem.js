import React from 'react';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { Link as Rlink} from 'react-router-dom';

class GetItem extends React.Component {
  constructor() {
    super();
    this.state = {
      content: [{ name: '', amount: '', description: '' }]
    };
    this.nextStep = this.nextStep.bind(this);
  }
    
  handleAddContent = () => {
    this.setState({ content: this.state.content.concat([{ name: '', amount: '', description: '' }]) });
    console.log(this.state.content);
  }
  
  handleRemoveContent = (idx) => () => {
    this.setState({ content: this.state.content.filter((element,indexbeselced) => idx !== indexbeselced) });
  }

  handleContentChange = (idx) => (event) => {
    const newContent = this.state.content.map((content, sidx) => {
      if (idx !== sidx) return content;
      return { ...content, [event.target.name]: event.target.value };
    });
    this.setState({ content: newContent });
  }

  nextStep(event) {
  event.preventDefault();
  const data = this.state.content;
  this.props.saveContentValues(data);
  this.props.handleNext();
}

  render() {    
    return (
      <div>
        <div className="form-frame">
          <div className="form-one">
            <div className="form-title">請填寫您這次預定捐贈的物資與數量</div>
            <div className="form-two">
              <Hidden smDown>
                <Grid container direction='row'>
                  <Grid item sm={6} md={4}>
                    <h2>項目</h2>
                  </Grid>
                  <Grid item sm={6} md={4}>
                    <h2>數量</h2>
                    <h4>若無確切數量，填寫大約範圍即可</h4>
                  </Grid>
                  <Grid item sm={6} md={4}>
                    <h2>備註</h2>
                  </Grid>
                </Grid>
              </Hidden>
                {this.state.content.map((content, idx) => (
                  <Grid container direction='row' className="item-list">
                    <Grid item xs={12} md={4} className="item">
                      <h2 className="hidden-md">項目</h2>
                      <input
                        type="text"
                        name="name"
                        onChange={this.handleContentChange(idx)}
                        value={content.name}
                        placeholder={`(例：便當)`}
                        key={ `${idx+1} name`}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} className="item">
                      <h2 className="hidden-md">數量</h2>
                      <input
                        type="text"
                        name="amount"
                        onChange={this.handleContentChange(idx)}
                        value={content.amount}
                        placeholder={`(例：20~30個)`}
                        key={ `${idx+1} amount`}
                      />
                      <h4 className="hidden-md">若無確切數量，填寫大約範圍即可</h4>
                    </Grid>
                    <Grid item xs={12} md={4} className="item">
                      <h2 className="hidden-md">備註</h2>
                      <input
                        type="text"
                        name="description"
                        onChange={this.handleContentChange(idx)}
                        value={content.description}
                        placeholder={`(例：素食)`}
                        key={ `${idx+1} description`}
                      />
                      <Hidden smDown>
                        <button type="button" onClick={this.handleAddContent}>+</button>
                        {this.state.content.length > 1 ? 
                          <button type="button" onClick={this.handleRemoveContent(idx)}>-</button> : null
                        }      
                      </Hidden>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                      <button type="button" onClick={this.handleAddContent} className="hidden-md">
                        + 新增項目
                      </button>
                      {this.state.content.length > 1 ? 
                        <button type="button" onClick={this.handleRemoveContent(idx)} className="hidden-md">
                        - 刪除項目
                        </button> : null}
                    </Grid>
                  </Grid>
                ))}
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
    )
  }
}

export default GetItem;