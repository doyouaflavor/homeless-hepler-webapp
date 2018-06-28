import React from 'react';
import BigCalendar from 'react-big-calendar';
import BigToolbar from 'react-big-calendar/lib/Toolbar'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown';
import AddIcon from '@material-ui/icons/AddCircle';

import classnames from 'classnames'
import moment from 'moment';
import find from 'lodash/find';
import filter from 'lodash/filter';
import map from 'lodash/map';
import padStart from 'lodash/padStart';
import range from 'lodash/range';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

const ZH_WEEKDAY = [
  '日',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
];

const GIVE_TIME = map(range(48), (idx) => {
  const hour = parseInt(idx / 2, 10);
  const minute = idx % 2 === 0 ? 0 : 30;

  return `${padStart(hour, 2, '0')}:${padStart(minute, 2, '0')}`;
});

const getTimeStr = (date) => (
  `${padStart(date.hour(), 2, '0')}：${padStart(date.minute(), 2, '0')}`
);
const getItemStr = (item) => `${item.name} ${item.amount}`;

const matchEvent = (e0, e1) => (
  e0.year() === e1.year() &&
  e0.month() === e1.month() &&
  e0.date() === e1.date()
);

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
    const { registeredEvents, value } = this.props;
    const shownDate = moment(value);
    const matchedEvent = find(registeredEvents, ({ date }) => (
      matchEvent(date, shownDate)
    ))
    const className = classnames('rbc-day-bg', {
      'day-event': matchedEvent,
    });
    let title;

    if (matchedEvent && matchedEvent.content.length > 0) {
      const { date, content } = matchedEvent;

      title = `${getTimeStr(date)} ${getItemStr(content[0])}`;
    }

    return (
      <div className={className}>
        <AddIcon
          className='add-event-btn'
          onClick={() => this.props.updateShownDate(shownDate)}
        />
        {
          matchedEvent &&
          <div className='day-event-title'>{title}</div>
        }
      </div>
    );
  }
}

class Calendar extends React.Component {

  state = {
    shownDate: null,
    selectedTime: GIVE_TIME[0],
  }

  updateShownDate = (shownDate) => {
    this.setState({
      shownDate,
    });
  }

  handleResetClick = () => {
    this.setState({
      shownDate: null,
      selectedTime: GIVE_TIME[0],
    })
  }

  handleSelectedTimeChange = (e) => {
    this.setState({
      selectedTime: e.target.value,
    });
  }

  renderBigCalendar() {
    const formats = {
      dateFormat: (date) => date.getDate().toString(),
      weekdayFormat: (date) => `星期${ZH_WEEKDAY[date.getDay()]}`,
      monthHeaderFormat: (date) => `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`,
    };
    const components = {
      dateCellWrapper: (props) => (
        <DateCellWrapper
          registeredEvents={this.props.registeredEvents}
          updateShownDate={this.updateShownDate}
          {...props}
        />
      ),
      toolbar: Toolbar,
    };

    return (
      <BigCalendar
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
    const eventItems = map(matchedEvents, ({ _id, date, content }) => {
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
            <div>您預計發放的時間</div>
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
            <div>當天已有的登記</div>
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
          this.state.shownDate ?
          this.renderDatesSelector() :
          this.renderBigCalendar()
        }
      </div>
    );
  }
}

export default Calendar;
