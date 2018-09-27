import React from 'react';
import BigCalendar from 'react-big-calendar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import CircularProgress from '@material-ui/core/CircularProgress';

import classnames from 'classnames';
import moment from 'moment';
import filter from 'lodash/filter';
import map from 'lodash/map';
import parseInt from 'lodash/parseInt';
import split from 'lodash/split';

import DateCellWrapper from './DateCellWrapper';
import Toolbar from './Toolbar';
import { matchEvent, getTimeStr } from '../../utils';
import { ZH_WEEKDAY } from '../../const';
import { getItemStr, GIVE_TIME } from './helper';
import DayDetailDialog from './DayDetailDialog';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);


class Calendar extends React.Component {

  state = {
    shownDate: null,
    selectedTime: GIVE_TIME[0],
    hideDayDetailDialog: true,
    dialogEvents: [],
  };

  updateState = (shownDate, selectedTime) => {
    this.setState({
      shownDate,
      selectedTime,
    });

    if (!shownDate) {
      this.props.setDate(null)
    } else {
      const splitTime = split(selectedTime, ':');
      const hour = parseInt(splitTime[0]);
      const minute = parseInt(splitTime[1]);
      const date = moment(shownDate).set({
        hour,
        minute,
      });

      this.props.setDate(date.toISOString());
    }
  }

  updateShownDate = (shownDate) => {
    this.updateState(shownDate, this.state.selectedTime);
  }

  handleResetClick = () => {
    this.updateState(null, GIVE_TIME[0]);
  }

  handleSelectedTimeChange = (e) => {
    this.updateState(this.state.shownDate, e.target.value);
  }

  handleDayClick = (eventsArr) => {
    if(eventsArr && eventsArr.length) {
      this.setState({
        hideDayDetailDialog: false,
        dialogEvents: eventsArr,
      })
    }
  };

  handleDayDialogClose = () => {
    if (!this.state.hideDayDetailDialog){
      this.setState({
        hideDayDetailDialog: true,
      });
    }
  };

  renderBigCalendar() {
    const className = classnames({
      transparent: !this.props.fetched,
    });
    const formats = {
      dateFormat: (date) => date.getDate().toString(),
      weekdayFormat: (date) => `星期${ZH_WEEKDAY[date.getDay()]}`,
      monthHeaderFormat: (date) => `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`,
    };
    const components = {
      dateCellWrapper: (props) => (
        <DateCellWrapper
          registeredEvents={this.props.registeredEvents}
          canAdd={this.props.canAdd}
          updateShownDate={this.updateShownDate}
          onDayClick={this.handleDayClick}
          {...props}
        />
      ),
      toolbar: Toolbar,
    };

    return (
      <React.Fragment>
        <BigCalendar
          className={className}
          components={components}
          events={[]}
          views={['month']}
          formats={formats}
          defaultDate={new Date()}
        />
        <DayDetailDialog
          hidden={this.state.hideDayDetailDialog}
          events={this.state.dialogEvents}
          onClose={this.handleDayDialogClose}
        />
      </React.Fragment>
    )
  }

  renderDatesSelector() {
    const { registeredEvents } = this.props;
    const { shownDate, selectedTime } = this.state;
    const matchedEvents = filter(registeredEvents, ({ date }) => (
      matchEvent(date, shownDate)
    ))
    const headerDay =
      `${shownDate.year()} 年 ${shownDate.month() + 1} 月 ` +
      `${shownDate.date()} 日 (星期${ZH_WEEKDAY[shownDate.day()]})`;
    const timeSelectItems = map(GIVE_TIME, (time) => (
      <MenuItem
        key={time}
        value={time}
      >
        {time}
      </MenuItem>
    ))
    const eventItems =
      matchedEvents.length === 0 ?
      <div>尚未有人登記</div> :
      map(matchedEvents, ({ _id, date, content }) => {
        const time = (
          <div className='Dates-Selector-Event-Time'>
            {getTimeStr(date)}
          </div>
        );
        const itemList = map(content, (item, idx) => (
          <div
            key={idx}
            className='Dates-Selector-Event-Item'
          >
            {getItemStr(item)}
          </div>
        ));

        return (
          <div
            key={_id}
            className='Dates-Selector-Event'
          >
            {time}
            <div className='Dates-Selector-Event-Items'>
              {itemList}
            </div>
          </div>
        )
      })

    return (
      <div className='Dates-Selector'>
        <div className='Dates-Selector-Header'>
          <div className='Dates-Selector-Header-Day'>{headerDay}</div>
          <div
            className='Dates-Selector-Header-Reset'
            onClick={this.handleResetClick}
          >
            重選日期
          </div>
        </div>
        <div className='Dates-Selector-Content'>
          <div className='Dates-Selector-Content-Part'>
            <div className='Dates-Selector-Content-Header'>您預計發放的時間：</div>
            <Select
              className='Dates-Selector-Select Dates-Selector-Time'
              value={selectedTime}
              onChange={this.handleSelectedTimeChange}
              IconComponent={DownArrowIcon}
            >
              {timeSelectItems}
            </Select>
          </div>
          <div className='Dates-Selector-Content-Part'>
            <div className='Dates-Selector-Content-Header'>當天已有的登記：</div>
            {eventItems}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='Calendar'>
        {
          this.state.shownDate && this.props.canAdd ?
          this.renderDatesSelector() :
          this.renderBigCalendar()
        }
        {
          !this.props.fetched &&
          <div className='Calendar-Loading-Overlay'>
            <CircularProgress className='Calendar-Loading' />
          </div>
        }
      </div>
    );
  }
}

export default Calendar;
