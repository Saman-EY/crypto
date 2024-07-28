import React from 'react';
import Navbar from '../components/modules/Navbar';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <section className={styles.Layout}>
      <Navbar />
      {children}
      <footer className={styles.footer}>Developed by Saman</footer>
    </section>
  );
}

export default Layout;
