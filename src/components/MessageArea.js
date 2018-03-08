import React from "react";
import styles from '../../public/css/index.sass';
import Message from './Message.js';

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
                        (m, i) => <Message user={m.user} date={m.date} message={m.message} key={m.user + "_" + i} />
                    )
                }
            </div>
        );
    }
}