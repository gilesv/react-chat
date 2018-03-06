import React from 'react';
import styles from '../../public/css/index.sass';

export default class UserLabel extends React.Component {
    render() {
        return (
            <div className={styles["user-label"]}>
                <UserBlob color="#386f7b" />
                {this.props.username}
            </div>
        );
    }
}

export class UserBlob extends React.Component {
    render() {
        return (
            <div className={styles["user-blob"]} style={{backgroundColor: this.props.color}} />
        );
    }
}