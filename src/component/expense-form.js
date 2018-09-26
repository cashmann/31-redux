import React, { Component } from 'react';

const defaultState = {
  title: '',
  price: 0,
};

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = props.expense || defaultState;
  }

  componentDidUpdate() {
    console.log('__FORM_STATE__', this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log('saving', this.state);
    this.props.handleComplete(this.state);

    if (!this.props.expense) {
      this.setState(defaultState);
    }
  }

  handleChange = (e) => {
    const { name, value, type } = e.target;


    this.setState({
      [name]: type === 'number' ? +value : value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <button type="submit">
          {this.props.expense ? 'Update' : 'Create'}
          {' '}
          Expense
        </button>
        {
          !this.props.expense &&
            <button onClick={this.addParking}>Add Parking ($7.50)</button>
        }
      </form>
    );
  }
}