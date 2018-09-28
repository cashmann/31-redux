import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import uuid from 'uuid';
import './App.css';
import {Provider} from 'react-redux';
import createAppStore from './lib/store';
import Dashboard from './component/dashboard';
const store = createAppStore();


class App extends Component {
  componentDidMount(){
    store.dispatch(
      promiseLater({
        type: 'CATEGORY_CREATE',
        payload: {_id: uuid(), timeStamp: new Date(), name: 'test', budget:'$0'},
      }, 5000)
    );
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <nav>
                <ul>
                  <li><Link to='/'>Dashboard</Link></li>
                </ul>
              </nav>
            </header>
            <main>
              <Route exact path='/' component={Dashboard} />
            </main>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

const promiseLater = (result, timeout) =>
  new Promise((resolve) =>{
    setTimeout(() => resolve(result), timeout);
  });