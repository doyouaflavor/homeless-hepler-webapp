import React from 'react';
import '../dist/form.css';
import Grid from '@material-ui/core/Grid';

class Itemlist extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      shareholders: [{ nmae: '' }],
    };
  }
  
  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }
  
  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sod) => {
      if (idx !== sod) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });
    
    this.setState({ shareholders: newShareholders });
  }
  
  handleSubmit = (evt) => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  }
  
  handleAddShareholder = () => {
    this.setState({ shareholders: this.state.shareholders.concat([{ name: '' }]) });
  }
  
  handleRemoveShareholder = (idx) => () => {
    this.setState({ shareholders: this.state.shareholders.filter((element,indexbeselced) => idx !== indexbeselced) });
    console.log("idx:" + idx);
  }
  
  render() {    
    return (
      <form onSubmit={this.handleSubmit} className="form-two">
        <Grid container direction='row'>
          <div>項目</div>
          <div>數量</div>
          <div>備註</div>
        </Grid>
          {this.state.shareholders.map((shareholder, idx) => (
            <div className="foodlist">
              <input
                type="text"
                placeholder={`(例：便當)`}
                value={shareholder.name}
                onChange={this.handleShareholderNameChange(idx)}
              />
              <input
                type="text"
                placeholder={`(例：20~30個)`}
                value={shareholder.name}
                onChange={this.handleShareholderNameChange(idx)}
              />
              <input
                type="text"
                placeholder={`(例：素食)`}
                value={shareholder.name}
                onChange={this.handleShareholderNameChange(idx)}
              />
              <button type="button" onClick={this.handleAddShareholder} className="small">+</button>
              <button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">-</button>
            </div>
          ))}
      </form>
    )
  }
}

export default Itemlist;