import React, {Component} from 'react'
import  {connect} from 'react-redux'
import {loadAllRecipes, addRecipe} from '../AC'
import Recipe from './Recipe'
import {mapToArr} from '../helpers'

class RecipeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openRecipeId: null,
        }
    }

    componentWillMount() {
        this.props.loadAllRecipes();
    }

    handleButtonLoad = (e, id) => {
        e.preventDefault();
        this.setState({
            openRecipeId: this.state.openRecipeId === id ? null : id,
        });
    }

    render() {
        const {recipes, isEdit} = this.props;
        console.log('list',recipes);
        const result = mapToArr(recipes).map(recipe => <Recipe key={recipe.id} recipe={recipe}
                                                               handleButtonLoad={this.handleButtonLoad}
                                                               isOpen={recipe.id == this.state.openRecipeId}/>)
        const name = isEdit ? 'recipe recipeEdit' : 'recipe';
        return (
            <div className={name}>
                <ul className="recipe_list">{result}</ul>
                <button onClick={this.props.addRecipe}>Add Recipe</button>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        recipes: state.recipes.entities,
        isEdit: state.recipes.isEdit
    }
}, {loadAllRecipes, addRecipe})(RecipeList)