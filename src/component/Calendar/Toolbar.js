import React from "react";
import PropTypes from 'prop-types';
import BigToolbar from "react-big-calendar/lib/Toolbar";
import LeftArrowIcon from "../../../node_modules/@material-ui/icons/KeyboardArrowLeft";
import RightArrowIcon from "../../../node_modules/@material-ui/icons/KeyboardArrowRight";

class Toolbar extends BigToolbar {
  render() {
    return (
      <div className='rbc-toolbar'>
        <LeftArrowIcon className='toolbar-arrow' onClick={() => this.navigate('PREV')} />
        <span className="rbc-toolbar-label">{this.props.label}</span>
        <RightArrowIcon className='toolbar-arrow' onClick={() => this.navigate('NEXT')} />
      </div>
    );
  }
}

Toolbar.propTypes = {
  label: PropTypes.string,
};

export default Toolbar;
