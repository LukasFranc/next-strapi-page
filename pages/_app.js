import {Roboto} from '@next/font/google'
import '../styles/main.scss'

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['italic', 'normal'],
    subsets: ['latin', 'latin-ext'],
})


export default function App({Component, pageProps}) {
    return (
        <main className={roboto.className}>
            <Component {...pageProps} />
        </main>
    )
}
