import React, { Component } from 'react';

const defaultState = {
  name: '',
  budget: 0,
};

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    // Initialize form
    this.state = props.category || defaultState;
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log('saving', this.state)
    this.props.handleComplete(this.state);

    if (!this.props.category) {
      this.setState(defaultState);
    }
    
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: type === 'number' ? +value : value,
    });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={this.state.name}
          onChange={this.handleChange}
          />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="price"
          value={this.state.budget}
          onChange={this.handleChange}
          />
        <button type="submit">
          {this.props.category ? 'Update' : 'Create'}
          {' '}
          Category
        </button>
      </form>
    );
  }
}