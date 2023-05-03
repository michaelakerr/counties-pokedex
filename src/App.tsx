
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Admin, Resource } from "react-admin";
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { dataProvider } from "./dataProvider";
import PokemonList from "./Pokemon/PokemonList";
import PokemonShow from "./Pokemon/PokemonShow";
import { theme } from "./theme";

// const dataProvider = jsonServerProvider('https://pokeapi.co/api/v2');

const App = () => (<BrowserRouter>
  <Admin theme={theme} dataProvider={dataProvider}>
    <Resource name="pokemon" list={PokemonList} show={PokemonShow} icon={CatchingPokemonIcon} />

  </Admin>
</BrowserRouter>)

export default App;
