import React, { Component } from 'react'
import { getArticles, sortArticles, orderArticles } from '../../api';
import ArticlesList from './ArticlesList';
import SortArticles from './SortArticles';
import OrderArticles from './OrderArticles';


export default class ArticlesPage extends Component {
    state = {
        articles: null,
        sortBy: '',
        order: '',
    }
    componentDidMount() {
        getArticles()
            .then(articles => {
                this.setState({ articles: articles })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sortBy !== this.state.sortBy) {
            sortArticles(this.state.sortBy)
                .then(articles => {
                    this.setState({ articles })
                })
        } else {
            if (prevState.order !== this.state.order) {
                orderArticles(this.state.order)
                    .then(articles => {
                        this.setState({ articles })
                    })
            }
        }
    }

    render() {
        const { articles } = this.state
        const { loggedInUser } = this.props
        return (
            <div>
                <SortArticles handleChange={this.handleChange} />
                <OrderArticles handleChange={this.handleChange} />
                {loggedInUser && <p>You've Been Logged In!</p>}
                {articles && <ArticlesList articles={articles} />}
            </div>
        )
    }
    handleChange = event => {
        if (event.target.value) {
            console.log(event.target.value)
            this.setState({ [event.target.name]: event.target.value })
        }
    }
}