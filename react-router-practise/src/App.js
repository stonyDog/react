import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';

const posts = [
  { id: 1, title: 'React', content: 'React Tutorial' },
  { id: 2, title: 'Vue', content: 'Vue.js Tutorial' },
  { id: 3, title: 'Laravel', content: 'Laravel Tutorail' },
];

function App() {
  return (
    <BrowserRouter>
      <h1>Hello React Router</h1>
      <ul>
        <li>
          <NavLink activeClassName="active" exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/contact">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/posts">
            Posts
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
        {/* <Route path="/posts" component={Posts} /> */}
        {/* <Route path="/posts/:id" component={Post} /> */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}

function Posts() {
  const { path, url } = useRouteMatch();
  console.log(useRouteMatch());
  console.log(useLocation());
  console.log(useHistory());
  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <NavLink activeClassName="active" to={`${url}/${post.id}`}>
              {post.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <Route path={`${path}/:id`}>
        <Post />
      </Route>
    </div>
  );
};

function Post() {
  // const id = Number(props.match.params.id);
  const { id } = useParams();
  const post = posts.find((post) => post.id === Number(id));
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
function NotFound() {
  return <h2>Not Found Page</h2>;
}

export default App;
