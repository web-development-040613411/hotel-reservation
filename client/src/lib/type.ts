export type User = {
  id: string;
  username: string;
  profile_picture: string;
  role:
    | "administrator"
    | "frontdesk"
    | "house_keeping_manager"
    | "house_keeping";
};