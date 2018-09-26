import React from 'react';
import CategoryForm from './category-form';

const defaultState = {
  _id: null,
  name: '',
  budget: 0,
};

export default class CategoryItem extends React.Component{
  constructor(props){
    super(props);
    this.state = props.category || defaultState;
  }
  updateCategory = (category) =>{
    this.props.handleUpdate(category);
  }
  handleClick = (e) =>{
    this.props.handleDelete(this.state);
    if(!this.props.category){
      this.setState(defaultState);
    }
  }

  render(){
    const { category } = this.props;
    return(
      <li>
        {category.name} : ${category.budget}
        <button onClick={this.handleClick}>Delete Category</button>
        <CategoryForm category={category} handleComplete={this.updateCategory} />
      </li>
    );
  }
}