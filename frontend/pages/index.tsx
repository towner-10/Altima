import type { NextPage } from 'next'
import Head from 'next/head'
import { PointSelectorMap } from '../components/map'

const Home: NextPage = () => {
  return (
    <div className="bg-babyPowder p-6 h-screen">
      <Head>
        <title>Altima</title>
        <meta name="description" content="Find the best alternative to alternative energy!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="font-oswald text-6xl text-smokyBlack pb-2">Altima</h1>

      <PointSelectorMap style={{ width: '100%', height: '80vh' }}></PointSelectorMap>
    </div>
  )
}

export default Home
