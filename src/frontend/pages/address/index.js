import { Fragment } from 'react';
import './address.css';
import { Navbar, Footer, Sidebar } from '../../components';
import AddressCards from './AddressCards';

export default function Address() {
  return (
    <Fragment>
      <Navbar />
      <Sidebar component={<AddressCards />} />
      <Footer />
    </Fragment>
  );
}
