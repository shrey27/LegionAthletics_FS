import { Fragment } from 'react';
import './profile.css';
import ProfileForm from './ProfileForm';
import { Navbar, Footer, Sidebar } from '../../components';

export default function Profile() {
  return (
    <Fragment>
      <Navbar />
      <Sidebar component={<ProfileForm />} />
      <Footer />
    </Fragment>
  );
}
