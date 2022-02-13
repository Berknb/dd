import Head from 'next/head'
import DisplayContents from '../components/DisplayContents'

export default function Home() {
  
  return (
    <div>
      <Head>
        <title>myblog</title>
        <meta name="description" content="share what you want" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <DisplayContents/>
      </main>

      <footer>
      </footer>
    </div>
  )
}
