import React from "react";
import styles from '../../public/css/index.sass';
import MessageArea from './MessageArea.js';
import UserList from './UserList.js';
import TypeArea from './TypeArea.js';
import RegisterPopup from './RegisterPopup.js';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: "",
            messages: [],
            users: []
        }

        /* Methods */
        this.configSocket = this.configSocket.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.notify = this.notify.bind(this);
        this.userRegistered = this.userRegistered.bind(this);
        this.userDisconnected = this.userDisconnected.bind(this);
        this.registerUser = this.registerUser.bind(this);

        /* Socket listeners */
        this.socket = this.configSocket();

    }

    configSocket() {
        let socket = io();
    
        socket.on('userConnected', (id) => {
            console.log('User #' + id + ' is online');
        });

        socket.on('userRegistered', (username) => {
            this.userRegistered(username);
            this.notify('~ '+ username + ' is online. ~');
        });

        socket.on('userDisconnected', (username) => {
            this.userDisconnected(username);
            this.notify('~ '+ username + ' went offline. ~');
        });

        socket.on('newMessage', (message) => {
            this.receiveMessage(message);
        })

        return socket;
    }

    registerUser(username) {
        this.setState({
            currentUser: username
        });
        this.socket.emit('userRegistered', username);
    }

    sendMessage(newMessage) {
        let now = new Date();

        let newMsg = {
            user: this.state.currentUser,
            message: newMessage,
            date: [now.toLocaleTimeString(), now.toLocaleDateString()],
            type: 'message'
        };

        this.socket.emit('newMessage', newMsg);

        this.setState({
            messages: this.state.messages.concat([newMsg])
        });
        
    }

    receiveMessage(msg) {
        this.setState({
            messages: this.state.messages.concat([msg])
        });
    }

    userRegistered(username) {
        let _users = this.state.users;
        _users.push(username);
        this.setState({
            users: _users
        });
    }

    userDisconnected(username) {
        let _users = this.state.users;
        if(_users.indexOf(username) >= 0) {
            _users.splice(_users.indexOf(username),1);
            console.log(_users);
            this.setState({
                users: _users
            });
        } else {
            console.log('nope');
        }
        
    }

    notify(message) {
        let notif = {
            type: 'notification',
            message: message
        };
        this.setState({
            messages: this.state.messages.concat([notif])
        });
    }

    render() {
        return (
            <main className={styles["chat-container"]}>
                <aside className={styles["chat__users"]}>
                    <UserList users={this.state.users} />
                </aside>
                <section className={styles["chat__main"]}>
                    <MessageArea messages={this.state.messages} />
                    <TypeArea sendMessage={this.sendMessage}/>
                </section>
                <RegisterPopup register={this.registerUser} />
            </main>
        )
    }
}