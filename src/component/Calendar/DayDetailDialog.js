import React from 'react';
import PropType from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import { getDateStr, getTimeStr } from '../../utils';

const styles = {
  timeList: {
    margin: '12px',
    marginLeft: '24px',
    display: 'flex',
  },
  time: {
    fontSize: '18px',
    width: '100px',
  },
  ul: {
    marginTop: '0',
  },
  li: {
    fontSize: '18px',
  }
};

const dialogStyles = {
  minWidth: '300px',
};

const DayDetailDialog = ({events, hidden, onClose}) => {
  const sortedEvents = events.slice().sort(function(e1, e2){
    // date is a moment() object
    return e1.date.hour() - e2.date.hour();
  });
  const groupByLocation = groupBy(sortedEvents, 'location.name');
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="day-detail-dialog"
      fullWidth={true}
      maxWidth = {'sm'}
      open={!hidden}
    >
      <DialogTitle style={{textAlign: 'center'}}>{events.length ? getDateStr(moment(events[0].date)) : ''}</DialogTitle>
      <DialogContent>
        {
          Object.keys(groupByLocation).map((locationName) => (
            <div key={locationName}>
              <Typography variant={'subheading'}>{locationName}</Typography>
                {
                  groupByLocation[locationName].map((event) => (
                    <div style={styles.timeList}>
                      <div style={styles.time}>{getTimeStr(event.date)}</div>
                      <ul style={styles.ul}>
                        {
                          event.content.map((item, index) => (
                            <li key={`${event._id}-${index}`} style={styles.li}>{item.name}&emsp;{item.amount}</li>
                          ))
                        }
                      </ul>
                    </div>
                  ))
                }
            </div>
          ))
        }
      </DialogContent>
    </Dialog>
  )
};


DayDetailDialog.defaultProps = {
  hidden: true,
};

DayDetailDialog.propTypes = {
  events: PropType.array.isRequired,
  hidden: PropType.bool,
  onClose: PropType.func.isRequired,
};

export default DayDetailDialog;
