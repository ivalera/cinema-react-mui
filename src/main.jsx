import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './root.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routes/error-page';
import FilmInfo from './films/film-info';
import MainPage from './main-page/main-page'
import { filmInfoLoader } from './films/film-info-loader.ts';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        
        children: [
            {
                path: 'cinema-react-mui',
                element: <MainPage />,
            },
            {
                path: "cinema-react-mui/movies/:movieId",
                element: <FilmInfo />,
                loader: filmInfoLoader,
            },
          ],
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
