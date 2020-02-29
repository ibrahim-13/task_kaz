import React from 'react';
import './App.css';
import { Util } from './util';

function App() {
  // Reference to the input element
  const inputRef = React.createRef<HTMLInputElement>();

  const [result, setResult] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState<string>('OK');
  const [loading, setLoading] = React.useState<boolean>(false);
  
  // React.useCallback(), so that React can memorize the callback and doesn't calculate it
  // on every render
  const shortenUrl = React.useCallback((surl: string | undefined, api: 'shorten' | 'original') => {
    if (surl) {
      setLoading(true);
      setStatus('Loading...');
      setResult(undefined);
      fetch(`/${api}?url=${encodeURI(surl)}`)
        .then(async (res) => {
          if (res.status === 200) {
            setStatus('OK');
            await res.text().then(text => setResult(text));
          } else {
            setResult(undefined);
            await res.text().then(text => setStatus(text));
          }
        })
        .then(() => setLoading(false))
        .catch(e => {
          console.log(e);
          setResult(undefined);
          setStatus('Network Error');
          setLoading(false);
        });
    }
  }, []);
  
  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <input ref={inputRef} placeholder="Type URL here" />
      <br />
      <button
        onClick={() => shortenUrl(inputRef.current?.value, 'shorten')}
        disabled={loading}
      >
        Shorten URL
      </button>
      <button
        onClick={() => shortenUrl(inputRef.current?.value, 'original')}
        disabled={loading}
      >
        Original URL
      </button>
      <br />
      <br />
      <span>Status : {status}</span>
      <br />
      {result ? (
        <a
          href={Util.prependHttp(result)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {Util.prependHttp(result)}
        </a>
      ) : <></>}
    </div>
  );
}

export default App;
