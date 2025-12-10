export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  title: string;
}

export interface OpeningHour {
  day: string;
  morning?: string;
  afternoon?: string;
  isClosed?: boolean;
}

export interface Insurance {
  abbr: string;
  fullName: string;
}