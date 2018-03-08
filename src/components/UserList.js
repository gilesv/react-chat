import React from "react";
import styles from '../../public/css/index.sass';
import UserLabel from './UserLabel.js';

export default class UserList extends React.Component {
    render() {
        return (
            <div>
                <div className={[styles["chat__users__title"], styles["font14"]].join(' ')}>{"Online users (" + this.props.users.length + ")"}</div>
                <div className={styles["user-label__container"]}>
                    {
                        this.props.users.map(
                            (u, i) => <UserLabel username={u} key={u + "_" + i}/>
                        )
                    }
                </div>
            </div>

        );
    }
}