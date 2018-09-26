import React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import classnames from 'classnames';

import { getTimeStr, matchEvent } from "../../utils";
import { getItemStr } from './helper';
import AddIcon from "../../../node_modules/@material-ui/icons/AddCircle";

class DateCellWrapper extends React.Component {
  render() {
    const { registeredEvents, canAdd, value } = this.props;
    const shownDate = moment(value);

    const matchedEvents = registeredEvents.filter(e => matchEvent(e.date, shownDate));

    const className = classnames('rbc-day-bg', {
      'day-event': matchedEvents[0],
      'read-only': !canAdd,
    });

    const renderedItems = matchedEvents.length ? (
        matchedEvents.map(e => (
          <div key={e._id} className='day-event-title'>
            {getTimeStr(e.date)} {getItemStr(e.content[0])}
          </div>
        )).slice(0,2)
      ):
      null;

    return (
      <div className={className} onClick={ () => { this.props.onDayClick(matchedEvents); }}>
        {
          canAdd &&
          <AddIcon
            className='add-event-btn'
            onClick={() => this.props.updateShownDate(shownDate)}
          />
        }
        {
          matchedEvents.length < 3 ?
            null :
            <div
              role="button"
              className="more-btn"
            >
              ...還有 {matchedEvents.length - 2} 個
            </div>
        }
        { renderedItems }
      </div>
    );
  }
}

DateCellWrapper.defaultProps = {
  canAdd: false,
};

DateCellWrapper.propTypes = {
  updateShownDate: PropTypes.func.isRequired,
  registeredEvents: PropTypes.array.isRequired,
  canAdd: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
  onDayClick: PropTypes.func,
};

export default DateCellWrapper;
