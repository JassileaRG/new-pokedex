import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Row, Col } from "antd";

import CardPokemon from "./components/cardPokemon";
import { Pokemon } from "../../@types/pokemon";

import "./index.css";

const App = (): JSX.Element => {
  const [data, setData] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
      )
      .then((result) => {
        setData(result.data.pokemon);
      })
      .catch((error) => console.log(error));
  }, []);

  // Armazenar o state da busca
  const [search, setSearch] = useState('');

  // Realizar a filtragem de itens
  const filteredItem = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    return data.filter((item) => item.name.toLowerCase().includes(lowerSearch));
  }, [search]);

  return (
    <div className="container-main">
      <h1>Cabeçalho</h1>

      <div>
        <h4>Pesquisa</h4>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="container-list">
        <Row gutter={[14, 14]} className="row">
          {filteredItem.map((item) => (
            <Col span={6} key={item.id}>
              <CardPokemon objeto={item} />
            </Col>
          ))}
        </Row>
      </div>

    </div>
  );
};

export default App;
