import React, {Component} from 'react'
import {deleteRecipe, editRecipe} from '../AC'
import {connect} from 'react-redux'
import {CSSTransitionGroup} from 'react-transition-group'
class Recipe extends Component {
    constructor(props) {
        super(props)
    }

    handleButtonDelete(event) {
        event.preventDefault();
        this.props.deleteRecipe(this.props.recipe.id);
    }

    handleButtonEdit(event) {
        event.preventDefault();
        this.props.editRecipe(this.props.recipe.id)
    }

    getBody() {
        if (!this.props.isOpen) return null;
        const {recipe} = this.props;
            const ingredients = recipe.ingredients.split(',').map(ingredient => <li className="recipe_item"
                                                                                key={ingredient}>{ingredient}</li>);
        return (
            <div>
                <ol>
                    {ingredients}
                </ol>
                <button onClick={(e) => this.handleButtonDelete(e)} name="delete">Delete Recipe</button>
                <button onClick={(e) => this.handleButtonEdit(e)} name="edit">Edit Recipe</button>
            </div>
        )
    }

    render() {
        const {isEdit} = this.props.recipe;
        return (
            <li>
                <h3>
                    <a href="#"
                       onClick={(e) => this.props.handleButtonLoad(e, this.props.recipe.id)}>{this.props.recipe.title}</a>
                    {isEdit && <span>Edit</span>}
                </h3>
                <CSSTransitionGroup
                    transitionName="recipeitem"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {this.getBody()}
                </CSSTransitionGroup>
            </li>
        )
    }
}
export default connect(null, {deleteRecipe, editRecipe})(Recipe);


