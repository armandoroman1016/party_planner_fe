import React from "react";

// Routing
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

// CSS
import "semantic-ui-css/semantic.min.css";

// Components
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Events from "./components/Events";
import EventForm from "./components/EventForm";
import ListContainer from "./components/Lists/EventLists";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
            <Route path="/" component={NavBar} />
            <div className="content">
                <Route
                    exact
                    path="/"
                    render={() =>
                        localStorage.getItem("token") ? (
                            <Redirect
                                to={`/dashboard/${localStorage.getItem(
                                    "user_id"
                                )}`}
                            />
                        ) : (
                            <Redirect to={"/login"} />
                        )
                    }
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute
                    path="/events/edit/:eventId"
                    component={EventForm}
                />
                <PrivateRoute path="/create-event" component={EventForm} />
                <PrivateRoute
                    path="/shopping/:eventId"
                    component={ListContainer}
                />
                <PrivateRoute path="/todo/:eventId" component={ListContainer} />
                <PrivateRoute path="/dashboard/:id" component={Events} />
            </div>
            <Footer />
        </div>
    );
}

export default App;
