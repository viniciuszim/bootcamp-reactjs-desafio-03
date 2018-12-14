import React, { Fragment } from 'react';

import Maps from '../../components/Maps';
import Users from '../../components/NewUser';
import NewUser from '../../components/Users';

const Main = () => (
  <Fragment>
    <NewUser />
    <Users />
    <Maps />
  </Fragment>
);

export default Main;
