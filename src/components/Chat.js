import React from "react";
import styles from '../../public/css/index.sass';
import Message from './Message.js';
import UserLabel from './UserLabel.js';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "HeyMrJack",
            messages: [
                {
                    user: 'heymrjack',
                    message: 'Hello world! First chat message',
                    date: new Date()
                },
                {
                    user: 'mrtomato',
                    message: 'cool chat by the way',
                    date: new Date()
                },
                {
                    user: 'pewdiepie',
                    message: 'BUT CAN U DO THISSSS',
                    date: new Date()
                }
            ],
            users: ['heymrjack', 'pewdiepie', 'mrtomato']
        }
    }
    render() {
        return (
            <main className={styles["chat-container"]}>
                <aside className={styles["chat__users"]}>
                    <div className={[styles["chat__users__title"], styles["font14"]].join(' ')}>{"Users on-line (" + this.state.users.length + ")"}</div>
                    <div className={styles["user-label__container"]}>
                        {
                            this.state.users.map(
                                (u, i) => <UserLabel username={u} key={u + "_" + i}/>
                            )
                        }
                    </div>
                </aside>
                <section className={styles["chat__main"]}>
                    <div className={styles["chat__messages"]}>
                        {
                            this.state.messages.map(
                                (m, i) => <Message user={m.user} date={m.date} message={m.message} key={m.user + "_" + i} />
                            )
                        }
                    </div>
                    <div className={styles["chat__textarea"]}>
                        <textarea>
                        </textarea>
                    </div>
                </section>
            </main>
        )
    }
}