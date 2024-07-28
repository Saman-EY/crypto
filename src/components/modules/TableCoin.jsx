import ChartUp from '../../assets/chart-up.svg';
import ChartDown from '../../assets/chart-down.svg';
import styles from './TableCoin.module.css';
import { marketChart } from '../../services/Api';

function TableCoin({ coins, currency, setChart }) {
  return (
    <div className="TableContainer">
      <table>
        <thead className="TableHead">
          <tr className="TrParent">
            <th>Coin</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h</th>
            <th>Total Volume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coins &&
            coins.map((coin) => (
              <TableRow
                key={coin.id}
                coin={coin}
                currency={currency}
                setChart={setChart}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ coin, currency, setChart }) {
  let handleModal = async () => {
    try {
      const response = await fetch(marketChart(coin.id));
      const json = await response.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr className={styles.bodyTr}>
      <td>
        <div onClick={() => handleModal()} className={styles.coinImgCointainer}>
          <img className={styles.CoinImg} src={coin.image} alt="" />
          <span>{coin.symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{coin.name}</td>
      <td>
        {currency === 'usd'
          ? '$'
          : currency === 'eur'
          ? 'Є'
          : currency === 'jpy'
          ? '¥'
          : null}
        {coin.current_price.toLocaleString()}
      </td>
      <td
        className={
          coin.price_change_percentage_24h > 0 ? styles.txtgreen : styles.txtred
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{coin.total_volume.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <img src={ChartUp} alt="icon" />
        ) : (
          <img src={ChartDown} alt="icon" />
        )}
      </td>
    </tr>
  );
}

export default TableCoin;
