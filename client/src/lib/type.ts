export type Room = {
  number: string;
  current_status:
    | "vacant"
    | "occupied"
    | "maintenance"
    | "off_market"
    | "departing";
  name: string;
  price: number;
  picture_path: string;
};
