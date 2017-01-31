import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input'
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import uuid from 'uuid';
import _ from 'lodash'

const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

class ServerResponseAlert extends React.Component {

  render() {
    const actions = [
      <RaisedButton
        label="OK"
        primary={true}
        onTouchTap={this.props.onClose}/>
    ];
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.props.response !== undefined}
        onRequestClose={this.props.onClose}
      >
        { this.props.response === SUCCESS ? 'Message sent successfully' : 'Failed sending message' }
      </Dialog>
    );
  }
}

class ServiceEndpoint extends React.Component {

  render() {
    return (
      <TextField
        floatingLabelText='Service Endpoint'
        value={this.props.value}
        fullWidth={true}
        onChange={(event, newValue) => this.props.onUserInput(newValue)} />
    );
  }
}

class Recipients extends React.Component {

  constructor(props) {
    super(props);
    this.onRequestAdd = this.onRequestAdd.bind(this);
    this.onRequestDelete = this.onRequestDelete.bind(this);
  }

  onRequestAdd(recipientToAdd) {
    this.props.onRecipientsChange(_.flatten([this.props.recipientIds, recipientToAdd]));
  }

  onRequestDelete(recipientToDelete) {
    this.props.onRecipientsChange(_.without(this.props.recipientIds, recipientToDelete));
  }

  render() {
    return (<ChipInput
      floatingLabelText='Recipients'
      value={this.props.recipientIds}
      fullWidth={true}
      onRequestAdd={this.onRequestAdd}
      onRequestDelete={this.onRequestDelete}
      onChange={this.props.onRecipientsChange} />
    );
  }
}

class MessageSubject extends React.Component {

  render() {
    return (
      <TextField
        floatingLabelText='Message Subject'
        value={this.props.value}
        fullWidth={true}
        onChange={(event, newValue) => this.props.onUserInput(newValue)} />
    );
  }
}

class MessageBody extends React.Component {

  render() {
    return (
      <TextField
        floatingLabelText="Message Body"
        value={this.props.value}
        fullWidth={true}
        onChange={(event, newValue) => this.props.onUserInput(newValue)}
        multiLine={true}
        rows={8} />
    );
  }
}

class SendMessageButton extends React.Component {

  render() {
    return (
      <RaisedButton
        label='Send Message'
        primary={true}
        disabled={
          this.props.state.recipientIds.length === 0 ||
          this.props.state.serviceEndpoint === '' ||
          this.props.state.messageBody === ''
        }
        onClick={this.props.onClick} />
    );
  }
}

class MessageSender extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.onEndpointChange = this.onEndpointChange.bind(this);
    this.onRecipientsChange = this.onRecipientsChange.bind(this);
    this.onSubjectChange = this.onSubjectChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onAlertClose = this.onAlertClose.bind(this);
  }

  getDefaultState() {
    return {
      serviceEndpoint: 'http://localhost:3000/api/sendMessage',
      recipientIds: [],
      messageSubject: '',
      messageBody: '',
    };
  }

  onEndpointChange(serviceEndpoint) {
    this.setState({ serviceEndpoint });
  }

  onRecipientsChange(recipientIds) {
    this.setState({ recipientIds });
  }

  onSubjectChange(messageSubject) {
    this.setState({ messageSubject });
  }

  onBodyChange(messageBody) {
    this.setState({ messageBody });
  }

  onSendMessage () {
    axios.post(this.state.serviceEndpoint, {
        id: uuid.v4(),
        recipients: this.state.recipientIds,
        subject: this.state.messageSubject,
        body: this.state.messageBody
      })
      .then((response) => {
        this.setState({ response: SUCCESS });
      })
      .catch((error) => {
        this.setState({ response: FAILURE });
      });
  }

  onAlertClose () {
    this.setState({ response: undefined });
    if (this.state.response === SUCCESS) {
      this.setState(this.getDefaultState());
    }
  }

  render() {
    return (
      <div>
        <ServiceEndpoint value={this.state.serviceEndpoint} onUserInput={this.onEndpointChange}/><br />
        <Recipients recipientIds={this.state.recipientIds} onRecipientsChange={this.onRecipientsChange} /><br />
        <MessageSubject value={this.state.messageSubject} onUserInput={this.onSubjectChange} /><br />
        <MessageBody value={this.state.messageBody} onUserInput={this.onBodyChange} /><br />
        <SendMessageButton state={this.state} onClick={this.onSendMessage} /><br />
        <ServerResponseAlert response={this.state.response} onClose={this.onAlertClose}/>
      </div>
    );
  }
}

export default MessageSender;
