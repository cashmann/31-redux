import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import uuid from 'uuid';
import './App.css';
import {Provider} from 'react-redux';
import createAppStore from './lib/store';
import Dashboard from './component/dashboard';
const store = createAppStore();
console.log(store);

class App extends Component {
  componentDidMount(){
    store.subscribe(()=>{
      console.log('STATE', store.getState());
    });
    setTimeout(()=>{
      store.dispatch({
        type: 'CATEGORY_CREATE',
        payload: {_id: uuid(), timeStamp: new Date(), name: 'test', budget:'$0'},
      });
    }, 2000);
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
