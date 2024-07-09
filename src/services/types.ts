export interface Country {
  country: string;
  country_name: string;
}

export interface Leadership {
  id: number;
  country_name: string;
  performance_oriented: number;
  autocratic: number;
  modesty: number;
  country_cluster: string;
  charisma: number;
  decisive: number;
  date_added: string;
}