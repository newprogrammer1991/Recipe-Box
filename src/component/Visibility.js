import React, {Component} from 'react'
import EditFormRecipe from './EditForm'
import {connect} from 'react-redux'
import {CSSTransitionGroup} from 'react-transition-group'
class Visibility extends Component {
    constructor(props) {
        super(props)
    }

    getbody() {
        const {isEdit} = this.props;
        if (!isEdit) return null;
        return <EditFormRecipe/>
    }

    render() {
        const {isEdit} = this.props;
        return (
            <div className={isEdit ? "recipeform" : ''}>
                <CSSTransitionGroup
                    transitionName="recipe_form"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    component="div"
                >
                    {this.getbody()}
                </CSSTransitionGroup>
            </div>
        )
    }

}

export default connect(state => {
        return {isEdit: state.recipes.isEdit}
    }
)(Visibility)
