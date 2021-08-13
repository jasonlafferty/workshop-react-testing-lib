import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{}}>
      <Link href="/">home</Link>
      {" "}
      <Link href="/pokemon">Pokemon</Link>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
