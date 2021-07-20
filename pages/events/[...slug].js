import { Fragment } from 'react'
import EventList from '../../components/events/event-list'
import EventTile from "../../components/events/results-title"
import ErrorAlert from "../../components/ui/error-alert"
import Button from "../../components/ui/button"
import { getFilteredEvents } from "../../helpers/api-util"


export default function FilteredEventPage(props) {
    //const router = useRouter()
    // const filteredData = router.query.slug

    // if (!filteredData) {
    //     return <p className="center">Loading</p>
    // }


    // const year = filteredData[0]
    // const month = filteredData[1]

    // const numYear = +year
    // const numMonth = +month


    if (props.hasError) {
        return (
            <Fragment>
                <ErrorAlert >
                    <p>Invalid Filter of Events</p>
                </ErrorAlert >
                <div className="center">
                    <Button link="/events">Show all events</Button>
                </div>
            </Fragment>
        )
    }

    const filteredEvents = props.events


    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No Events found</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show all events</Button>
                </div>
            </Fragment>
        )
    }


    const date = new Date(props.date.numYear, props.date.numMonth - 1)


    return (
        <Fragment>
            <EventTile date={date} />
            <EventList events={filteredEvents} />
        </Fragment>
    )
}


export async function getServerSideProps(context) {
    const { params } = context

    const filteredData = params.slug

    const year = filteredData[0]
    const month = filteredData[1]

    const numYear = +year
    const numMonth = +month

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return {
            props: {
                hasError: true
            }
        }
    }

    const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth })


    return {
        props: {
            events: filteredEvents,
            date: {
                numYear: numYear,
                numMonth: numMonth
            }
        },

    };
}
