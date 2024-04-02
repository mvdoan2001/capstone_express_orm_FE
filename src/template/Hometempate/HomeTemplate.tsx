import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';


export default function HomeTemplate({ children }: any) {
  return (
    <Fragment>

      {children}

      <Outlet />
    </Fragment>
  )
}