import React, {Component} from 'react'
import RecipeList from './RecipeList'
import {Provider} from 'react-redux'
import store from '../store'
import Visibility from "./Visibility";
import '../css/style.css';
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="main">
                    <h1 className="main_title">Recipe Book</h1>
                    <div className="main_content">
                        <RecipeList/>
                        <Visibility/>
                    </div>
                </div>
            </Provider>
        )
    }
}
export default App

