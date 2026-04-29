import data from "./board-data.json";

export type Person = {
  name: string;
  title?: string;
};

export type Board = {
  honoraryAdvisors: Person[];
  advisors: Person[];
  president: Person;
  vicePresidents: Person[];
  committee: Person[];
  subCommittees: Person[];
  secretaries: Person[];
};

export const board: Board = data as Board;
