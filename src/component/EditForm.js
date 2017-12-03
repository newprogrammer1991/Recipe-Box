import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {mapToArr, propIs} from '../helpers'
import {updateRecipe, editRecipeFinish, addRecipeFinish, checkAndAddRecipe} from '../AC'
import {CSSTransitionGroup} from 'react-transition-group'
class EditFormRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            ingredients: ''
        }
    }
    componentDidMount() {
        findDOMNode(this.refs.firstActive).focus();
    }

    handleChange = type => (e) => {
        const {value} = e.target;
        const isGet = this.props.entities.length;
        let title, ingredients;
        if (isGet) {
            title = this.props.entities[0].title;
            ingredients = this.props.entities[0].ingredients;
        }
        else {
            title = this.state.title;
            ingredients = this.state.ingredients;
        }
        const updatedRecipe = {
            title: title,
            ingredients: ingredients
        }
        this.setState({
            [type]: value
        })
        updatedRecipe[type] = value;
        if (isGet) this.props.updateRecipe(this.props.entities[0].id, updatedRecipe);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.entities.length) this.props.editRecipeFinish(this.props.entities[0].id);
        else {
            this.props.checkAndAddRecipe(this.state);
            this.setState({
                title: '',
                ingredients: ''
            })

        }
    }


    render() {
        let template, title, ingredients;
        const {entities} = this.props;
        if (entities.length) {
            title = entities[0].title;
            ingredients = entities[0].ingredients;
        }
        else {
            title = this.state.title;
            ingredients = this.state.ingredients;
        }
        template =
            <form className="form" onSubmit={this.handleSubmit}>
                <h2 className="form_title">Edit Recipe Form</h2>
                <div className="form_item">
                    <label>Recipe
                        <input type="text" placeholder="Recipe Name" value={title}
                               onChange={this.handleChange('title')} ref='firstActive'/>
                    </label>
                </div>
                <div className="form_item">
                    <label>Ingredients
                        <textarea type="text" placeholder="Enter Ingredients,Separated,By Commas" value={ingredients}
                                  onChange={this.handleChange('ingredients')}
                        />
                    </label>
                </div>
                <input type="submit" value="Close"/>
            </form>
        return template;
    }
}
export default connect(state => {
    return {
        entities: mapToArr(state.recipes.entities).filter(recipe => recipe['isEdit'])
    }
}, {updateRecipe, editRecipeFinish, addRecipeFinish, checkAndAddRecipe})(EditFormRecipe);
