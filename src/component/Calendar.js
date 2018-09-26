import React from 'react';
import BigCalendar from 'react-big-calendar';
import BigToolbar from 'react-big-calendar/lib/Toolbar'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import AddIcon from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

import classnames from 'classnames'
import moment from 'moment';
import filter from 'lodash/filter';
import map from 'lodash/map';
import padStart from 'lodash/padStart';
import parseInt from 'lodash/parseInt';
import range from 'lodash/range';
import split from 'lodash/split';

import { matchEvent, getTimeStr } from '../utils';
import { ZH_WEEKDAY } from '../const';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

const GIVE_TIME = map(range(48), (idx) => {
  const hour = parseInt(idx / 2, 10);
  const minute = idx % 2 === 0 ? 0 : 30;

  return `${padStart(hour, 2, '0')}:${padStart(minute, 2, '0')}`;
});

const getItemStr = (item) => `${item.name} ${item.amount}`;

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
         <div className='day-event-title'>{getTimeStr(e.date)} {getItemStr(e.content[0])}</div>
        )).slice(0,2)
      ):
      null;

    return (
      <div className={className}>
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
              onClick={() => {}}
            >
              +還有 {matchedEvents.length - 2} 個
            </div>
        }
        { renderedItems }
      </div>
    );
  }
}

class Calendar extends React.Component {

  state = {
    shownDate: null,
    selectedTime: GIVE_TIME[0],
  }

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
          {...props}
        />
      ),
      toolbar: Toolbar,
    };

    return (
      <BigCalendar
        className={className}
        components={components}
        events={[]}
        views={['month']}
        formats={formats}
        defaultDate={new Date()}
      />
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
