import React from "react";
import styles from '../../public/css/index.sass';
import MessageArea from './MessageArea.js';
import UserList from './UserList.js';
import TypeArea from './TypeArea.js';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        let d = new Date();
        this.state = {
            currentUser: "HeyMrJack",
            messages: [
                {
                    user: 'heymrjack',
                    message: 'Hello world! First chat message',
                    date: [d.toLocaleTimeString(), d.toLocaleDateString()]
                },
                {
                    user: 'mrtomato',
                    message: 'cool chat by the way',
                    date: [d.toLocaleTimeString(), d.toLocaleDateString()]
                },
                {
                    user: 'pewdiepie',
                    message: 'BUT CAN U DO THISSSS',
                    date: [d.toLocaleTimeString(), d.toLocaleDateString()]
                }
            ],
            users: ['HeyMrJack', 'pewdiepie', 'mrtomato']
        }

        /* Methods */
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);

        /* Socket listeners */
        this.socket = io();
        this.socket.on('message', (msg) => {
            console.log(msg);
            this.receiveMessage(msg);
        });

        
    }

    sendMessage(newMessage) {
        let now = new Date();

        let newMsg = {
            user: this.state.currentUser,
            message: newMessage,
            date: [now.toLocaleTimeString(), now.toLocaleDateString()]
        }
        
        this.setState({
            messages: this.state.messages.concat([newMsg])
        });
        
        this.socket.emit('message', newMsg);
    }

    receiveMessage(msg) {
        this.setState({
            messages: this.state.messages.concat([msg])
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
            </main>
        )
    }
}