# Tutorial 2

* *Date Created*: 29 May 2024
* *Last Modification Date*: 29 May 2024
* *Assignment URL*: <https://main--peaceful-pavlova-46f46f.netlify.app/>
* *Git URL*: <https://git.cs.dal.ca/nkukadiya/CSCI-5709-Tutorials/-/tree/main/Tutorial2?ref_type=heads>

## Authors

* Nikulkumar Kukadiya (nk865270@dal.ca)

## Deployment

I created a new private repository on github for tutorial 2 project deployment and pushed my code to that repository. Then, I imported the tutorial 2 project on netlify from github and setup build settings to deploy the application. Finally, it was deployed and live on the mentioned link.

## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used
* [npm](https://docs.npmjs.com//) - Dependency Management
* [TailwindCSS](https://tailwindcss.com/) - Used for application CSS

## Sources Used

### App.js

```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, Nikul Kukadiya
        </p>
        <a
          className="Linkedin"
          href="https://www.linkedin.com/in/nikul-kukadiya/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Linkedin Profile
        </a>
      </header>
    </div>
  );
}

export default App;

```
- The App.js file was created using the React application command "npx create-react-app tutorial-test".
- I changed the \<p> tag to include my name and also updated the reference link to my LinkedIn profile URL.

## Acknowledgments

* The code offered valuable insights, laying the groundwork for understanding the functionality and logic of several UI components. I am grateful for their work and dedication.
* It provided valuable insights and influenced my approach in understanding and learning the approaches and specific techniques. Their contribution is highly appreciated.