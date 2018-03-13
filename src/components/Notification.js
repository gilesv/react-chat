import React from 'react';
import styles from '../../public/css/index.sass';

export default class Notification extends React.Component {
    render() {
        return (
            <div className={styles.notification}>
                {this.props.message}
            </div>
        );
    }
}