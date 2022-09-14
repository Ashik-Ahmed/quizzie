import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Home/Banner'
import Services from '../components/Home/Services'
import Stats from '../components/Home/Stats'
import Quizes from '../components/Quizes/Quizes'
import DefaultLayout from '../DefaultLayout/DefaultLayout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner />
      <Services />
      <Stats />


    </div>
  )
}
