import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

import ContactFormCreate from "./pages/contacts/ContactFormCreate";
import ContactFormView from "./pages/contacts/ContactFormView";
import ContactFormEdit from "./pages/contacts/ContactFormEdit";
import About from "./pages/about/About";
import ParkCreateForm from "./pages/parks/ParkCreateForm";
import ParkEditForm from "./pages/parks/ParkEditForm";
import ParkPage from "./pages/parks/ParkPage";
import ParksPage from "./pages/parks/ParksPage";
import ProfilesPage from "./pages/profiles/ProfilesPage";
import ProfilesEditForm from "./pages/profiles/ProfilesEditForm";
import NotFound from "./pages/404/NotFound";


function App() {

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route 
                exact 
                path="/" 
                render={() => (
                  <ParksPage message="No results found. Adjust the search keyword."/>
                )}
              />       
              <Route exact path="/about" render={() => <About />} />
              <Route exact path="/contact" render={() => <ContactFormCreate />} />
              <Route path="/contact/view/:edit_token" 
                render={({ match }) => <ContactFormView edit_token={match.params.edit_token} />} />
              <Route path="/contact/update/:edit_token" 
                render={({ match }) => <ContactFormEdit edit_token={match.params.edit_token} />} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/parks/add" render={() => <ParkCreateForm />} />
              <Route exact path="/parks/:id/edit" render={() => <ParkEditForm />} />
              <Route exact path="/parks/:id" render={() => <ParkPage />} />
              
              <Route exact path="/profiles/:id" render={() => <ProfilesPage />} />
              <Route exact path="/profiles/:id/edit" render={() => <ProfilesEditForm />} />

              <Route render={() => <NotFound />} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;