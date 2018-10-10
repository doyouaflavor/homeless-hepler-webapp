import React, { PureComponent } from 'react';

import { login } from '../api/users';

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

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      username: '',
      password: '',
      errorVisible: '',
    };
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  async handleLogin() {
    this.setState({
      errorVisible: false,
    });

    try {
      const response = await login(this.state.username, this.state.password);
      this.props.onSuccess(response.data);
      this.props.onClose();
    } catch (error) {
      this.setState({
        errorVisible: true,
      });
    }
  }

  render() {
    const { open, onClose, classes } = this.props;
    const { username, password, errorVisible } = this.state;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>登入</DialogTitle>
        <DialogContent>
          {errorVisible
            ? (
              <DialogContentText className={classes.error}>使用者名稱或密碼錯誤</DialogContentText>
            )
            : null
          }
          <TextField
            autoFocus
            fullWidth
            id="username"
            margin="dense"
            label="使用者名稱"
            value={username}
            onChange={this.handleUsernameChange}
          />
          <TextField
            fullWidth
            id="password"
            margin="dense"
            type="password"
            label="密碼"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>取消</Button>
          <Button color="primary" disabled={!username || !password} onClick={this.handleLogin}>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(LoginDialog);
