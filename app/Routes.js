import React from 'react'
import { BrowserRouter, Switch, Route, Link, useParams } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/about">About</Link>
        </div>
    )
}

const About = () => {
    return (
        <div>
            <h1>About</h1>
        </div>
    )
}
const NotFound = () => {
    return (
        <div>
            <h1>not found</h1>
        </div>
    )
}

const Article = () => {
    return (
        <div>
            <h1>Article</h1>
        </div>
    )
}

function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { slug } = useParams()

    return (
        <div>
            <h3>ID: {slug}</h3>
        </div>
    )
}

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/articles" component={Article} />
                <Route exact path="/articles/:slug" children={<Child />} />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
