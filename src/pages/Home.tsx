import React, { useEffect, useState, FunctionComponent } from "react";
import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { fetchSchedule, IShow } from "../api";

const Home: FunctionComponent<{}> = () => {
  const [schedule, setSchedule] = useState<IShow[]>([]);
  useEffect(() => {
    const fetchAndSetSchedule = async () => {
      const schedule = await fetchSchedule();
      setSchedule(schedule);
    };

    fetchAndSetSchedule();
  }, []);

  return (
    <PageWrapper>
      <ContentGrid>
        {schedule.map((media: any) => {
          return (
            <Link to={`details?id=${media.show.id}`} key={media.id}>
              <Show image={media.show?.image?.original}>
                {!media.show?.image?.original && media.show.name}
              </Show>
            </Link>
          );
        })}
      </ContentGrid>
    </PageWrapper>
  );
};

const Show = styled.div`
  background-color: #333;
  background-image: url(${(props: { image: any }) => props.image});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding: 15px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  width: 100%;

  & a {
    color: #fff;
    text-decoration: none;
    display: flex;
    min-height: 140px;
  }
`;

export default Home;
