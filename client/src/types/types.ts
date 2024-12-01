// types.ts

// Тип для Area
export type Area = {
    id: string;
    name: string;
  };
  
// Тип для Parameters
export type Parameters = {
    text?: string;
    area?: Area;
};

// Основной тип для QueryItem
export type QueryItem = {
    id: number;
    parameters: Parameters;
    removeQuery: (id: number) => void;
};

export type PopularQueryItem = {
    query_id: number;
    parameters: Parameters;
};
  