import React, { useEffect, useState, FunctionComponent } from "react";
import PageWrapper from "../components/PageWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  fetchCast,
  fetchSeasons,
  fetchShowById,
  fetchShowBySearch,
} from "../api";

const Details: FunctionComponent<{}> = () => {
  const [media, setMedia] = useState<any>({});
  const [mediaCast, setMediaCast] = useState<any>([]);
  const [mediaSeasons, setMediaSeasons] = useState<any>([]);

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery();
  const id: number = Number(query.get("id"));
  const search: string | null = query.get("search");

  const navigate = useNavigate();

  const renderDate = (date: string): string => {
    if (date) {
      return `(${date.split("-")[0]})`;
    }
    return "";
  };

  useEffect(() => {
    const fetchAndSetCastAndSeasons = async (id: number) => {
      const cast = await fetchCast(id);
      const seasons = await fetchSeasons(id);

      setMediaCast(cast);
      setMediaSeasons(seasons);
    };

    const fetchAndSetShowById = async (id: number) => {
      const show = await fetchShowById(id);
      if (show) {
        setMedia(show);
        fetchAndSetCastAndSeasons(id);
      } else {
        navigate("/?error");
      }
    };

    const fetchAndSetShowBySearch = async (search: string) => {
      const show = await fetchShowBySearch(search);
      if (show) {
        setMedia(show);
        fetchAndSetCastAndSeasons(show.id);
      } else {
        navigate("/?error");
      }
    };

    if (id) {
      fetchAndSetShowById(id);
    } else if (search) {
      fetchAndSetShowBySearch(search);
    } else {
      navigate("/");
    }
  }, [id, search]);

  const renderCast = (): string => {
    return mediaCast
      .slice(0, 3) // take first 3 cast members
      .map((castMember: any) => castMember.person.name) // take their names
      .join(", "); // return them as a string seperated with commas
  };

  const renderSeasons = (
    episodeCount: number,
    image: string | undefined
  ): string => {
    //generate a number of images for the season based on episode order
    let i = 0;
    const episodeArray: any = [];

    while (i < episodeCount) {
      episodeArray.push("");
      i++;
    }

    return episodeArray.map(() => {
      return <Episode key={Math.random()} image={image} />;
    });
  };

  const renderGenres = (genres: string[]): string => {
    return genres.join(", ");
  };

  return (
    <PageWrapper>
      <ShowDetailsContainer>
        <img src={media.image?.medium} alt={media.name} />
        <div>
          <h2>
            {media.name} {renderDate(media.premiered)}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: media.summary }} />
          <p>
            <b>Cast: </b>
            {renderCast()}
          </p>
          <p>
            <b>Status: </b> {media.status}
          </p>
          {media.genres?.length > 0 && (
            <p>
              <b>Genres: </b> {renderGenres(media.genres)}
            </p>
          )}
        </div>
      </ShowDetailsContainer>

      {mediaSeasons.map((season: any) => {
        return (
          season?.episodeOrder && (
            <SeasonContainer key={season.id}>
              <SeasonTitle>Season {season.number}</SeasonTitle>
              <SeasonsGrid>
                {renderSeasons(
                  season.episodeOrder,
                  season.image?.original || media.image?.original
                )}
              </SeasonsGrid>
            </SeasonContainer>
          )
        );
      })}
    </PageWrapper>
  );
};

const SeasonContainer = styled.div`
  width: 100%;
`;

const Episode = styled.div`
  background-image: url(${(props: { image: any }) => props.image});
  width: 100%;
  height: 150px;
  background-size: cover;
  background-position: top center;
`;

const SeasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-bottom: 30px;
  width: 100%;
`;

const SeasonTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 24px;
`;

const ShowDetailsContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  width: 100%;

  & h2 {
    margin-bottom: 15px;
  }

  & img {
    margin-right: 50px;
  }

  p {
    margin-bottom: 5px;
  }

  p:first-of-type {
    margin-bottom: 20px;
  }
`;

export default Details;
