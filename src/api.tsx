export const rootUrl = "https://api.tvmaze.com";

export const fetchSchedule = (): Promise<IShow[]> | [] => {
  return fetch(`${rootUrl}/schedule?country=gb`)
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      alert("Something went wrong, please try again later.");
      return [];
    });
};

export const fetchShowById = (id: number): Promise<IShow> | null => {
  return fetch(`${rootUrl}/shows/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      document.title = `Sav State | ${data.name}`;
      return data;
    })
    .catch(() => {
      return null;
    });
};

export const fetchShowBySearch = (search: string): Promise<IShow | null> => {
  return fetch(`${rootUrl}/singlesearch/shows?q=${search}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (data) {
        document.title = `Sav State | ${data.name}`;
        return data;
      } else {
        return null;
      }
    })
    .catch(() => {
      return null;
    });
};

export const fetchCast = (id: number): Promise<ICast[]> => {
  return fetch(`${rootUrl}/shows/${id}/cast`)
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export const fetchSeasons = (id: number): Promise<ISeason[]> => {
  return fetch(`${rootUrl}/shows/${id}/seasons`)
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export interface ISeason {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number | null;
  premiereDate: string;
  endDate: string | null;
  network: INetwork;
  webChannel: null | string;
  image: null | IImage;
  summary: string;
  links: ILinks;
}

export interface ICast {
  person: {
    id: number;
    url: string;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
      birthday: string;
      deathday: string | null;
      gender: string;
    };
    image: null | IImage;
    updated: number;
  };
  _links: ILinks;
  character: {
    id: number;
    url: string;
    name: string;
    image: null | IImage;
    _links: ILinks;
    self: boolean;
    voice: boolean;
  };
}

export interface IShow {
  id: number;
  url: string;
  name: string;
  season: number;
  type: string;
  airdate: string;
  airstamp: string;
  runtime: number;
  rating: { average: number | null };
  image: null | IImage;
  summary: null | string;
  updated: number;
  show: {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: null | string;
    officialSite: string;
    schedule: {
      time: string;
      days: {
        0?: string;
        1?: string;
        2?: string;
        3?: string;
        5?: string;
        6?: string;
      };
    };
    rating: {
      average: null | number;
      weight: number;
    };
    network: INetwork;
    webChannel: string | null;
    dvdCountry: string | null;
    externals: {
      tvrage: number | null;
      thetvdb: number | null;
      imdb: number | null;
    };
    image: null | IImage;
    summary: null | string;
    updated: number;
    _links: ILinks;
  };
  _links: ILinks;
}

interface INetwork {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
    timezone: string;
  };
}

interface ILinks {
  self: { href: string };
  previousepisode?: { href: string };
  nextepisode?: { href: string };
}

interface IImage {
  medium: string;
  original: string;
}
