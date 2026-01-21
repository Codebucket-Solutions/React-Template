import { Toaster } from 'react-hot-toast'
import './App.css'
import PagesRoute from './routes'
import Loader from './components/ui/loader'
import { useSelector } from 'react-redux';
function App() {
    const notification = useSelector((state) => state.Loader);
    console.log(notification)

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
