
import { Admin, Resource } from "react-admin";
import './App.css';
import { dataProvider } from "./dataProvider";
import PokemonList from "./Pokemon/PokemonList";
import PokemonShow from "./Pokemon/PokemonShow";
import { theme } from "./theme";

// const dataProvider = jsonServerProvider('https://pokeapi.co/api/v2');

const App = () => <Admin theme={theme} dataProvider={dataProvider}>
  <Resource name="pokemon" list={PokemonList} show={PokemonShow} />
</Admin>

export default App;
