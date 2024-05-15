export type Game = {
  id: number;
  image: string;
  title: string;
  description: string;
  productionLink: string;
  youtubeUrl: string;
};

export type GameDetail = {
  title: string;
  description: string;
  productionLink: string;
  youtubeUrl: string;
};

export type Obstacle = {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
};

export type Character = {
  x: number;
  y: number;
};
