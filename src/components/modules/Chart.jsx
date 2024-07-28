import React, { useState } from 'react';
import styles from './Chart.module.css';
import convertData from '../../helpers/convertData';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

function Chart({ chart, setChart }) {
  let [type, setType] = useState('prices');

  let handleType = (e) => {
    let newType = e.target.innerText.toLowerCase().replace(' ', '_');
    setType(newType);
  };

  return (
    <section className={styles.ModalParent}>
      <section className={styles.Chart}>
        <div className={styles.ChartHeader}>
          <img src={chart.coin.image} alt="coinImg" />
          <p>{chart.coin.name}</p>
        </div>

        <div className={styles.Graph}>
          <ChartComponent chart={chart} type={type} />
        </div>

        <div className={styles.ChartTypes}>
          <button
            onClick={handleType}
            className={type === 'prices' ? styles.active : null}
          >
            Prices
          </button>
          <button
            onClick={handleType}
            className={type === 'market_caps' ? styles.active : null}
          >
            Market Caps
          </button>
          <button
            onClick={handleType}
            className={type === 'total_volumes' ? styles.active : null}
          >
            Total Volumes
          </button>
        </div>

        <section className={styles.Details}>
          <div>
            <p>Price:</p>
            <span>${chart.coin.current_price}</span>
          </div>
          <div>
            <p>ATH:</p>
            <span>${chart.coin.ath}</span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>{chart.coin.market_cap}</span>
          </div>
        </section>
      </section>

      <span onClick={() => setChart(null)} className={styles.CloseBtn}>
        X
      </span>
    </section>
  );
}

function ChartComponent({ chart, type }) {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart width={400} height={400} data={convertData(chart, type)}>
        <Line
          type={'monotone'}
          stroke="#3874ff"
          strokeWidth="2px"
          dataKey={type}
        />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={['auto', 'auto']} />
        <XAxis dataKey={type} hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
