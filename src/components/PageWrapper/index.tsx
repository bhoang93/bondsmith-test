import React, { ReactNode, FunctionComponent } from "react";
import Searchbar from "../Searchbar";
import styled from "styled-components";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <Searchbar />
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 50px;
`;

export default PageWrapper;
