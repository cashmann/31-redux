import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import CategoryForm from './category-form';

class DashboardContatiner extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: null,
    }
  }
  handleAddCategory = (cat) =>{
    if(!cat.name){
      this.setState({ error: 'Category name is required.'});
      return;
    }
    cat._id = uuid();
    cat.timeStamp = new Date();
    this.props.categoryCreate(cat);
    this.setState({error: null});
  }
  handleUpdateCategory = (cat) =>{
    if(!cat.name){
      this.setState({ error: 'Category name is required.'});
      return;
    }
    cat.timeStamp = new Date();
    this.props.categoryUpdate(cat);
    this.setState({error: null});
  }
  handleDeleteCategory = (cat) =>{
    if(!cat._id){
      this.setState({ error: 'Category id is required for a delete.'});
      return;
    }
    this.props.categoryDestroy(cat);
    this.setState({error: null});
  }
  render(){
    return (
      <React.Fragment>
        <h1>Dashboard</h1>
        {this.state.error &&
          <div className='error'>{this.state.error}</div>}
        <CategoryForm handleComplete = {this.handleAddCategory} />
        <div>
          {this.props.categories.map(category =>(
            <CategoryItem handleUpdate={this.handleUpdateCategory} handleDelete={this.handleDeleteCategory} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) =>{
  console.log(state);
  return{
    categories: state.categories
  };
}

const mapDispatchToProps = (dispatch) =>({
  categoryCreate: (category) => dispatch({type: 'CATEGORY_CREATE', payload: category}),
  categoryUpdate: (category) => dispatch({type: 'CATEGORY_UPDATE', payload: category}),
  categoryDestroy: (category) => dispatch({type: 'CATEGORY_DESTROY', payload: category}),
});

var connector = connect(mapStateToProps, mapDispatchToProps);
console.log(connector);
export default connector(DashboardContatiner);