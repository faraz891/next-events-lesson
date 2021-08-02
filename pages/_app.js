import Head from 'next/head'
import Layout from '../components/layout/layout'
import '../styles/globals.css'
import NotificationContextProvider from "../context/notificationContext"

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="Nextjs Events" />
          <meta name="keywords" content="Nextjs, Events" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>

  )

}

export default MyApp
