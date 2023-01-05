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
  
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);
  
  useEffect(() => {

  }, [])

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
      
      <div>
        {
          Array.from(Array(pages), (item, index) => {
            return <button value={index} onClick={(ev) => setCurrentPage(Number(ev.target.value))}>{index}</button> //consertar o erro de tipo
          })
        }
      </div>


      <div className="container-list">
        <Row gutter={[14, 14]} className="row">
          {currentItems.map((item) => ( // criar a condição para mostrar filteredItem ou currentItems
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
