import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store'
import Navbar from '../components/Navbar'
import DisplayContents from '../components/DisplayContents'

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
    <Navbar/>
    <DisplayContents/>
    <Component {...pageProps}/>
    </Provider>
  )
}

export default MyApp
