import React from 'react';
import '../dist/form.css';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

class GetItem extends React.Component {
  constructor() {
    super();

    // 不確定state要怎麼設比較好，目前只有新增item功能，表單資訊尚未串接
    this.state = {
      foodname: '',
      amount: '',
      description: '',
      content: [{ foodname: '', amount: '', description: '' }],
    };
  }
    
  handleAddShareholder = () => {
    this.setState({ content: this.state.content.concat([{ name: '' }]) });
  }
  
  handleRemoveShareholder = (idx) => () => {
    this.setState({ content: this.state.content.filter((element,indexbeselced) => idx !== indexbeselced) });
    console.log("idx:" + idx);
  }
  
  render() {    
    return (
      <form onSubmit={this.handleSubmit} className="form-two">
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
                  placeholder={`(例：便當)`}
                  value={this.state.foodname}
                  onChange={this.handleShareholderNameChange(idx)}
                />
              </Grid>
              <Grid item xs={12} md={4} className="item">
                <h2 className="hidden-md">數量</h2>
                <input
                  type="text"
                  placeholder={`(例：20~30個)`}
                  value={this.state.amount}
                  onChange={this.handleShareholderNameChange(idx)}
                />
                <h4 className="hidden-md">若無確切數量，填寫大約範圍即可</h4>
              </Grid>
              <Grid item xs={12} md={4} className="item">
                <h2 className="hidden-md">備註</h2>
                <input
                  type="text"
                  placeholder={`(例：素食)`}
                  value={this.state.description}
                  onChange={this.handleShareholderNameChange(idx)}
                />
                <Hidden smDown>
                  <button type="button" onClick={this.handleAddShareholder}>+</button>
                  {this.state.content.length > 1 ? 
                    <button type="button" onClick={this.handleRemoveShareholder(idx)}>-</button> : null
                  }      
                </Hidden>
              </Grid>
              <Grid container direction="row" justify="space-between">
                <button type="button" onClick={this.handleAddShareholder} className="hidden-md">
                  + 新增項目
                </button>
                {this.state.content.length > 1 ? 
                  <button type="button" onClick={this.handleRemoveShareholder(idx)} className="hidden-md">
                  - 刪除項目
                  </button> : null}
              </Grid>
            </Grid>
          ))}
      </form>
    )
  }
}

export default GetItem;