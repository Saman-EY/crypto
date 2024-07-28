import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';
import { searchCoin } from '../../services/Api';
import { Hourglass } from 'react-loader-spinner';

function Search({ currency, setCurrency, search, setSearch }) {
  let [coins, setCoins] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  // get data when searching
  useEffect(() => {
    setIsLoading(true);
    setCoins([]);
    if (!search) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const getData = async () => {
      try {
        let res = await fetch(searchCoin(search), {
          signal: controller.signal
        });
        let json = await res.json();
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          alert(error.message);
        }
      }
    };

    setIsLoading(true);
    getData();

    return () => controller.abort();
  }, [search]);

  return (
    <section className={styles.SearchContainer}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className={styles.SearchInput}
        type="text"
      />
      <select
        className={styles.SelectInput}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        name="currency"
        id="currency"
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPR</option>
      </select>

      {(!!coins.length || !!isLoading) && (
        <ul className={styles.SearchBox}>
          {!!isLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Hourglass
                visible={true}
                height="50"
                width="50"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
              />
            </div>
          )}

          {coins.map((item) => (
            <li key={item.id}>
              <img src={item.thumb} alt="thumb" />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Search;
