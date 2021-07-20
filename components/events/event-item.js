import DateIcon from "../icons/date-icon"
import AddressIcon from "../icons/address-icon"
import ArrowRightIcon from "../icons/arrow-right"
import Button from "../../components/ui/button"
import styles from "./event-item.module.css"




export default function EventListItem(props) {

    const { id, title, date, image, location, } = props.event

    const formatedDate = new Date(date).toLocaleDateString('en-us', {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    const formatedAddress = location.replace(',', "\n")
    const link = `/events/${id}`

    return (
        <li className={styles.item}>
            <img src={image} alt={title} />
            <div className={styles.content}>
                <div className={styles.summary}>
                    <h2>{title}</h2>
                    <div className={styles.date}>
                        <DateIcon />
                        <time>{formatedDate}</time>
                    </div>
                    <div className={styles.address}>
                        <AddressIcon />
                        <address>{formatedAddress}</address>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button link={link}>
                        <span>Explore Links</span>
                        <span className={styles.icon}><ArrowRightIcon /></span>
                    </Button>
                </div>
            </div>
        </li >
    )
}
