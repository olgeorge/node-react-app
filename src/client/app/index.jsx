import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MessageSender from './MessageSender.jsx';

// Get rid of unknown prop `onTouchTap` warnings https://github.com/callemall/material-ui/issues/5208
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title='Message Sender' />
          <MessageSender />
        </div>
      </MuiThemeProvider>
    );
  }
}

render(<App/>, document.getElementById('app'));
