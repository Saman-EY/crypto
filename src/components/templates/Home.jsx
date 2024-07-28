import { useEffect, useState } from 'react';
import { getCoinList } from '../../services/Api';
import TableCoin from '../modules/TableCoin';
import Navbar from '../modules/Navbar';
import Pagination from '../modules/Pagination';
import { Hourglass } from 'react-loader-spinner';
import Search from '../modules/Search';
import Chart from '../modules/Chart';

function Home() {
  let [coins, setCoins] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [page, setPage] = useState(1);
  let [currency, setCurrency] = useState('usd');
  let [search, setSearch] = useState('');
  let [chart, setChart] = useState(null);

  // handle pagination
  let prevhandler = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };
  let nexthandler = () => {
    if (page === 10) return;
    setPage((prev) => prev + 1);
  };

  // get data
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      let response = await fetch(getCoinList(page, currency));
      let json = await response.json();
      setCoins(json);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    getData();
  }, [page, currency]);

  // handle scroll lock for modal
  useEffect(() => {
    if (chart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [chart]);


  // show loading
  if (isLoading)
    return (
      <section className="MainContainer">
        {/* <Navbar /> */}

        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10rem'
          }}
        >
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        </section>
      </section>
    );

  return (
    <section className="MainContainer">
      {/* <Navbar /> */}
      <Search
        search={search}
        setSearch={setSearch}
        currency={currency}
        setCurrency={setCurrency}
      />
      <TableCoin coins={coins} currency={currency} setChart={setChart} />
      <Pagination
        page={page}
        setPage={setPage}
        functions={[prevhandler, nexthandler]}
      />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </section>
  );
}

export default Home;
