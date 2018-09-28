# ![cf](http://i.imgur.com/7v5ASc8.png) 32: Budget Tracker

## Submission Instructions

* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
* Submit a pull request to this repository
* Submit a link to your pull request on canvas
* Submit a question, observation, and how long you spent on canvas 

## Requirements  

### Feature Tasks

* complete the Lab 31 tasks

#### expense

* in this app an expense should contain at least the following properties
  * `id` a uuid
  * `categoryID` an id that corresponds to an existing category
  * `timestamp` a date from when the category was created
  * `name` a string that is the name of the category
  * `price` a number that is the total amount of $ in the category 
  * feel free to add more to your expense

#### redux

##### app reducer

* export a reducer that holds the entire app state from `reducer/index.js`
* create a reducer that will combine your categories reducer and expenses reducer

##### expenses reducer

* create a category reducer in your your reducer directory
* this reducer should support the following interactions
  * `EXPENSE_CREATE` -- store an expense
  * `EXPENSE_UPDATE` -- update an existing expense
  * `EXPENSE_DELETE` -- delete an existing expense
* if you need others feel free to add them

##### action creators

* you should create an action creator for each interaction supported by your expenses reducer

##### middleware

* add a `logger` middleware to your application's redux store
* add validation to your redux reducers

Decide what validation you want to add to your reducers. Ideas might include:

* Prevent an item from being added if it's over budget.
* Prevent a budget from being created with zero or less dollars.
* Prevent a budget or item from being created without a name.

##### store

* in `lib/store.js` exports a function that will return a redux store from your app reducer

#### Components

Create the following components and structure them according to the following diagram.  

```text
App
  Provider
    BrowserRouter
      Route / Dashboard
        CategoryForm -- for creating categories
        [CategoryItem] -- list of CategoryItems
          CategoryForm  -- for updating categories
          ExpenseForm -- for creating expenses
          [ExpenseItem]  -- list of ExpenseItems
            ExpenseForm -- for updating an expense
```

##### Update the CategoryItem Component

* should keep all of the features described in lab-31
* add an ExpenseForm to your category item that enables the user to create expenses on your app state
* display a list of all the ExpenseItems belonging to the category

##### ExpenseForm Component 

* should have an `onComplete` prop that will be invoked with the form state onSubmit
* should support an `expense` prop that will both set the initial form state, and update the state in the hook on `componentWillReceiveProps()`
* should have a `buttonText` prop that will configure the submit buttons text

##### ExpenseItem Component

* should have a button that will delete the expense from the Apps `onClick`
* should display the `name` and `price` of the component
* should display an ExpenseForm that will enable the user to update the expense in the app state

### Test

* Test your ExpenseForm and CategoryForm
* Test all of your action creators
* Test each reducer used in your combineReducers
  * test that the validation is working!

### Documentation

Write a description of the project in your README.md

## Example Validation Middleware

Here's an example validating middleware for an application that implements a
[kanban board](https://leankit.com/learn/kanban/kanban-board/).

This middleware ensures that data attached to the action satisfies requirements,
like having certain properties (id, content, categoryId).

```js
const validateCard = store => next => action => {
  const isCard = action.type && action.type.startsWith('CARD');
  if (isCard) {
    try {
      const card = action.payload;
      const notValid = !card.id || !card.content || !card.categoryID;
      if (notValid) {
        throw new Error('VALIDATION ERROR: card must include id, content, and categoryID');
      }

      return next(action);
    } catch (err) {
      console.error(err);

      return next({
        type: action.type,
        payload: err,
        error: true,
      });
    }
  } else {
    return next(action);
  }
}

export default validateCard;
```
