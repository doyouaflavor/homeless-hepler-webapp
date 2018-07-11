import React, { Component } from 'react';
import '../App.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import filter from 'lodash/filter';
import map from 'lodash/map';
import merge from 'lodash/merge';
import sortBy from 'lodash/sortBy';

import { getTaipeiStationEvents } from '../api/events';
import { getDateStr, getTimeStr } from '../utils';
import { GIVER_TYPES, CONTACT_TITLES } from '../const';

const NAVIGATE_ACTION = {
  PREV: 'PREV',
  NEXT: 'NEXT',
};

const styles = () => ({
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
  },
});

class Period {
  constructor(year, month) {
    this.year = year;
    this.month = month;
  }

  toString = () => `${this.year} 年 ${this.month + 1} 月`

  set = (year, month) => {
    this.year = year;
    this.month = month;
  }

  prevMonth = () => {
    if (this.month === 0) {
      return new Period(this.year - 1, 11);
    }

    return new Period(this.year, this.month - 1);
  }

  nextMonth = () => {
    if (this.month === 11) {
      return new Period(this.year + 1, 0);
    }

    return new Period(this.year, this.month + 1);
  }

  isEqual = (period) => (
    period.month === this.month && period.year === this.year
  )

  contains = (date) => (
    date.month() === this.month && date.year() === this.year
  )
}

class Admin extends Component {
  state ={
    shownPeriod: new Period(-1, -1),
    oldestPeriod: new Period(-1, -1),
    newwstPeriod: new Period(-1, -1),
    registeredEvents: [],
    fetched: false,
  }

  async componentDidMount() {
    try {
      const result = await getTaipeiStationEvents();
      const events = map(result.events, (event) => merge(event, {
        created: moment(event.created),
        date: moment(event.date),
      }));
      const registeredEvents = sortBy(events, (event) => event.created);

      const shownPeriod = new Period(-1, -1);
      const oldestPeriod = new Period(-1, -1);
      const newestPeriod = new Period(-1, -1);

      if (registeredEvents.length > 0) {
        const oldestDate = registeredEvents[0].created;
        const newestDate = registeredEvents[registeredEvents.length - 1].created;

        shownPeriod.set(oldestDate.year(), oldestDate.month())
        oldestPeriod.set(oldestDate.year(), oldestDate.month())
        newestPeriod.set(newestDate.year(), newestDate.month())
      }

      this.setState({
        shownPeriod,
        oldestPeriod,
        newestPeriod,
        registeredEvents,
        fetched: true,
      });
    } catch (err) {
      // TODO(SuJiaKuan): 錯誤處理
      console.error(err);
    }
  }

  navigate = (action) => {
    if (action === NAVIGATE_ACTION.PREV) {
      this.setState({
        shownPeriod: this.state.shownPeriod.prevMonth(),
      })
    } else if (action === NAVIGATE_ACTION.NEXT) {
      this.setState({
        shownPeriod: this.state.shownPeriod.nextMonth(),
      })
    }
  }

  renderControl(shownPeriod, oldestPeriod, newestPeriod) {
    return (
      <div>
        <IconButton
          disabled={shownPeriod.isEqual(oldestPeriod)}
          onClick={() => this.navigate(NAVIGATE_ACTION.PREV)}
        >
          <LeftArrowIcon />
        </IconButton>
        <span>{shownPeriod.toString()}</span>
        <IconButton
          disabled={shownPeriod.isEqual(newestPeriod)}
          onClick={() => this.navigate(NAVIGATE_ACTION.NEXT)}
        >
          <RightArrowIcon />
        </IconButton>
      </div>
    )
  }

  renderEvents(events) {
    const { classes } = this.props;

    return (
      <Paper className={classes.tableWrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>登記日期</TableCell>
              <TableCell>發放日期</TableCell>
              <TableCell>身份</TableCell>
              <TableCell>名稱</TableCell>
              <TableCell>聯絡人</TableCell>
              <TableCell>電子信箱</TableCell>
              <TableCell>電話</TableCell>
              <TableCell>物資</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(events, (e) => {
              const created =`${getDateStr(e.created)} ${getTimeStr(e.created)}`;
              const date = `${getDateStr(e.date)} ${getTimeStr(e.date)}`;
              const type = GIVER_TYPES[e.giver.type];
              const name = e.giver.name;
              const contact =
                `${e.giver.contactName} ${CONTACT_TITLES[e.giver.contactTitle]}`;
              const email = e.giver.email;
              const phone = e.giver.phone;
              const content = map(e.content, ({ name, amount, description }, idx) => (
                <div key={idx}>
                  {`${name} ${amount} ${description ? `(${description})` : ''}`}
                </div>
              ));

              return (
                <TableRow key={e._id}>
                  <TableCell>{created}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{type}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{contact}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{phone}</TableCell>
                  <TableCell>{content}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  render() {
    const {
      shownPeriod,
      oldestPeriod,
      newestPeriod,
      registeredEvents,
      fetched,
    } = this.state;
    const events = filter(registeredEvents, (e) => (
      shownPeriod.contains(e.created)
    ));

    return (
      <div>
        {
          !fetched ? '資料讀取中' :
          registeredEvents.length === 0 ? '尚無任何登記' :
          <div>
            {this.renderControl(shownPeriod, oldestPeriod, newestPeriod)}
            {this.renderEvents(events)}
          </div>
        }
      </div>
    )
  }
}

export default withStyles(styles)(Admin);
