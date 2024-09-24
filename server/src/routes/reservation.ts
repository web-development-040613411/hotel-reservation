import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';

type uniqueRoom = {
    type: string;
    room: number;
};

export const reservationRoute = new Elysia({ prefix: '/reservations' })

//   {
//     "status": "success",
//     "data": [
//         {
//             "id": "152d23f3-cd23-43ea-a995-61a649a1d83f",
//             "number": "102",
//             "name": "Standard",
//             "price": 100,
//             "detail": "Standard room",
//             "picture_path": "standard.jpg"
//         },
//         {
//             "id": "243c797b-061d-4a3f-9c91-ef1fce8d374c",
//             "number": "201",
//             "name": "King Room",
//             "price": 200,
//             "detail": "A spacious room with a king-sized bed, perfect for couples or business travelers.",
//             "picture_path": "/images/rooms/king_room.jpg"
//         },
//         {
//             "id": "a81e096c-2782-4979-a603-bef991677cf4",
//             "number": "107",
//             "name": "Queen Room",
//             "price": 150,
//             "detail": "A comfortable room with a queen-sized bed, offering great value for solo travelers or couples.",
//             "picture_path": "/images/rooms/queen_room.jpg"
//         },
//         {
//             "id": "e2985a72-6b3a-4534-b1aa-3d934cb5eab7",
//             "number": "110",
//             "name": "Suite",
//             "price": 350,
//             "detail": "A luxurious suite with separate living and sleeping areas, ideal for those seeking comfort and elegance.",
//             "picture_path": "/images/rooms/suite.jpg"
//         }
//     ]
// }

//   {
//     "status": "success",
//     "data": [
//         {
//             "id": "2f1a9a38-f851-4f87-abba-d473737c5475",
//             "number": "103",
//             "name": "Standard",
//             "price": 100,
//             "detail": "Standard room",
//             "picture_path": "standard.jpg"
//         },
//         {
//             "id": "243c797b-061d-4a3f-9c91-ef1fce8d374c",
//             "number": "201",
//             "name": "King Room",
//             "price": 200,
//             "detail": "A spacious room with a king-sized bed, perfect for couples or business travelers.",
//             "picture_path": "/images/rooms/king_room.jpg"
//         },
//         {
//             "id": "a81e096c-2782-4979-a603-bef991677cf4",
//             "number": "107",
//             "name": "Queen Room",
//             "price": 150,
//             "detail": "A comfortable room with a queen-sized bed, offering great value for solo travelers or couples.",
//             "picture_path": "/images/rooms/queen_room.jpg"
//         },
//         {
//             "id": "e2985a72-6b3a-4534-b1aa-3d934cb5eab7",
//             "number": "110",
//             "name": "Suite",
//             "price": 350,
//             "detail": "A luxurious suite with separate living and sleeping areas, ideal for those seeking comfort and elegance.",
//             "picture_path": "/images/rooms/suite.jpg"
//         }
//     ]
// }
