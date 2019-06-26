import React, { Component } from 'react'
import { getTopic } from '../../api';
import TopicCard from './TopicCard';
import TopicArticlesList from './TopicArticlesList';

export default class SingleTopicPage extends Component {
    state = {
        topic: null
    }

    componentDidMount() {
        getTopic(this.props.slug)
            .then(topic => {
                this.setState({ topic })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.slug !== this.props.slug) {
            getTopic(this.props.slug)
                .then(topic => {
                    this.setState({ topic })
                })
        }
    }


    render() {
        const { topic } = this.state;
        return (
            <div>
                {topic && <TopicCard topic={topic} />}
                <TopicArticlesList slug={this.props.slug} />
            </div>
        )
    }
    handleChange = event => {
        if (event.target.value) {
            this.setState({ sortBy: event.target.value })
        }
    }
}