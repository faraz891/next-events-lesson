import React from 'react'
import Link from 'next/link'
import styles from "./button.module.css"

export default function Button(props) {
    if (props.link) {
        return (
            <Link href={props.link}>
                <a className={styles.btn}>{props.children}</a>
            </Link>
        )
    }

    return (
        <button className={styles.btn} type="submit" onClick={props.onClick}>{props.children}</button>
    )
}
