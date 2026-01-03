import { Toaster } from 'react-hot-toast'
import './App.css'
import PagesRoute from './routes'
import Loader from './components/ui/loader'
function App() {

    return (
        <>
        <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {notification.loading ? (
        <Loader
          active={notification.loading}
          loadingMessage={notification.loadingMessage}
        />
      ) : null}
            <PagesRoute />
        </>
    )
}

export default App
