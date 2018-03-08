import React from 'react';
import styles from '../../public/css/index.sass';

export default class Message extends React.Component {
    render() {
        return (
            <div className={styles.message}>
                <div className={styles.message__left}>
                    <div className={styles.message__username}>{this.props.user}</div>
                    <div className={styles.message__text}>{this.props.message}</div>
                </div>
                <div className={styles.message__date}>
                    <div>{this.props.date[0]}</div>
                    <div>{this.props.date[1]}</div>
                </div>
            </div>
        );
    }
}