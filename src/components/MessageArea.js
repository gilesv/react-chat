import React from "react";
import styles from '../../public/css/index.sass';
import Message from './Message.js';
import Notification from './Notification.js';

export default class MessageArea extends React.Component {
    componentDidUpdate() {
        this.messageList.scrollTop = this.messageList.scrollHeight;
    }

    componentDidMount() {
        this.messageList.scrollTop = this.messageList.scrollHeight;
    }

    render() {
        return (
            <div className={styles["chat__messages"]} ref={(el) => this.messageList = el }>
                {
                    this.props.messages.map(
                        (m, i) => {
                            let message = null;
                            if(m.type === 'message') {
                                return ( <Message user={m.user} date={m.date} message={m.message} key={m.user + "_" + i} /> )
                            } else {
                                return ( <Notification message={m.message} key={i}/>)
                            }
                        }
                    )
                }
            </div>
        );
    }
}