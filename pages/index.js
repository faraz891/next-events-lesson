import React, { Fragment } from 'react'
import Head from 'next/head'
import EventList from '../components/events/event-list'
import NewsletterRegistration from "../components/input/newsletter-registration"
import { getFeaturedEvents } from '../helpers/api-util'


export default function HomePage(props) {

    return (
        <Fragment>
            <Head>
                <title>Nextjs Events</title>
                <meta name="description" content="Find all greate events that you can go" />
            </Head>
            <NewsletterRegistration />
            <EventList events={props.events} />

        </Fragment>
    )
}

export async function getStaticProps() {

    const featuredEvents = await getFeaturedEvents()

    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800,
    };
}