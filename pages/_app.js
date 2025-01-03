import '../styles/globals.css'
import { Inter } from 'next/font/google'
import 'leaflet/dist/leaflet.css'
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
