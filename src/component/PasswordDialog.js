import React, { PureComponent } from 'react';

import { chpasswd } from '../api/users';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  withStyles,
} from '@material-ui/core'

const styles = () => ({
  error: {
    color: 'red',
  },
});

class LoginDialog extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errorVisible: false,
      confirmVisible: false,
    };
  }

  handleOldPasswordChange(event) {
    this.setState({
      oldPassword: event.target.value,
    });
  }

  handleNewPasswordChange(event) {
    this.setState({
      newPassword: event.target.value,
    });
  }

  handleConfirmPasswordChange(event) {
    this.setState({
      confirmPassword: event.target.value,
    });
  }

  async handleApply() {
    this.setState({
      errorVisible: false,
      confirmVisible: false,
    });

    const { oldPassword, newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      this.setState({
        confirmVisible: true,
      });
    } else {
      try {
        const response = await chpasswd(oldPassword, newPassword);
        this.props.onClose();
      } catch (error) {
        this.setState({
          errorVisible: true,
        });
      }

    }
  }

  render() {
    const { open, onClose, classes } = this.props;
    const { oldPassword, newPassword, confirmPassword, errorVisible, confirmVisible } = this.state;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>變更密碼</DialogTitle>
        <DialogContent>
          {errorVisible
            ? (
              <DialogContentText className={classes.error}>舊密碼錯誤</DialogContentText>
            )
            : null
          }
          {confirmVisible
            ? (
              <DialogContentText className={classes.error}>確認密碼錯誤</DialogContentText>
            )
            : null
          }
          <TextField
            autoFocus
            fullWidth
            id="oldPassword"
            margin="dense"
            type="password"
            label="舊密碼"
            value={oldPassword}
            onChange={this.handleOldPasswordChange}
          />
          <TextField
            fullWidth
            id="newPassword"
            margin="dense"
            type="password"
            label="新密碼"
            value={newPassword}
            onChange={this.handleNewPasswordChange}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            margin="dense"
            type="password"
            label="確認密碼"
            value={confirmPassword}
            onChange={this.handleConfirmPasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>取消</Button>
          <Button
            color="primary"
            disabled={!oldPassword || !newPassword || !confirmPassword}
            onClick={this.handleApply}
          >
            確定
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(LoginDialog);
