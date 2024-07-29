import React, { useState } from 'react';
import styles from './Pagination.module.css';

function Pagination({ page, setPage, functions }) {

  let [prevhandler, nexthandler] = functions;


  return (
    <section className={styles.PaginationContainer}>
      <button
        className={page === 1 ? styles.Disabled : null}
        onClick={prevhandler}
      >
        Prev
      </button>
      <div>
        <span className={page === 1 ? styles.Selected : null}>1</span>
        <span className={page === 2 ? styles.Selected : null}>2</span>

        {page > 2 && page < 9 ? (
          <>
            <p>...</p> <span className={styles.Selected}>{page}</span>{' '}
            <p>...</p>{' '}
          </>
        ) : (
          <p>...</p>
        )}

        <span className={page === 9 ? styles.Selected : null}>9</span>
        <span className={page === 10 ? styles.Selected : null}>10</span>
      </div>
      <button
        className={page === 10 ? styles.Disabled : null}
        onClick={nexthandler}
      >
        Next
      </button>
    </section>
  );
}

export default Pagination;
