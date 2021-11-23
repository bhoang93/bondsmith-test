import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  FunctionComponent,
} from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const Searchbar: FunctionComponent<{}> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm) {
      navigate(`/details?search=${searchTerm}`);
    }
  };

  return (
    <Header>
      <Link to="/">
        <h1>Sav State</h1>
      </Link>
      <div>
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          onKeyPress={handleKeypress}
        />
      </div>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid black;
  margin-bottom: 20px;
  padding: 30px 0;

  & a {
    text-decoration: none;
    color: #000;
  }

  & input {
    border-radius: 10px;
    border: 1px solid black;
    padding: 3px 5px 3px 30px;
  }
`;

export default Searchbar;
