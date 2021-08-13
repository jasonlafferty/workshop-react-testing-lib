import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Pokemon from '../src/Components/Pokemon'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Workshop react-testing-library</title>
        <meta name="description" content="Workshop react-testing-library" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Workshop react-testing-library</h1>

      <main className={styles.main}>
        <Pokemon />
      </main>
    </div>
  )
}
