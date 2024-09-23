import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';

type uniqueRoom = {
    type: string;
    room: number;
};

export const reservationRoute = new Elysia({ prefix: '/reservations' })
    .get('/', async () => {
        const response = await sql`SELECT * FROM reservation`;

        return {
            status: 'success',
            data: response,
        };
    })
    .get('/unique-room', async ({ set }) => {
        const response = await sql`SELECT * FROM reservation`;

        return {
            status: 'success',
            data: response,
        };
    })
    .post('/', async ({ body }) => {
        const roomTypes = await sql`SELECT id FROM room_type`;
        const uniqueRooms = [];

        const { check_in, check_out } = body;
        const diffDate = new Date(check_out).getDate() - new Date(check_in).getDate();
      
        for (const roomType of roomTypes) {
            const res = await sql`
                                  SELECT
                                  	rooms."id" AS room_id,
                                    rooms."number",
                                    room_type."name",
                                    ${diffDate} * room_type.price AS price,
                                    room_type.detail,
                                    room_type.picture_path
                                  FROM
                                  	rooms
                                  	LEFT JOIN room_type ON rooms.type_id = room_type."id" 
                                  WHERE
                                  	(
                                  	SELECT
                                  		reservations."id" 
                                  	FROM
                                  		reservations
                                  		INNER JOIN ( SELECT rooms.NUMBER, rooms.ID FROM rooms ) room_id_num ON room_id_num.ID = reservations.room_id 
                                  	WHERE
                                  		reservations.room_id = rooms."id" 
                                  		AND (
                                  			( ( ( ${check_out} ) > reservations.check_in ) AND ( ( ${check_in} ) < reservations.check_out ) ) 
                                  			OR ( ( ( ${check_in} ) < reservations.check_out ) AND ( ( ${check_out} ) > reservations.check_in ) ) 
                                  			OR ( ( ( ${check_in} ) > reservations.check_in ) AND ( ( ${check_out} ) < reservations.check_out ) ) 
                                  			OR ( ( ( ${check_out} ) > reservations.check_out ) AND ( ( ${check_in} ) < reservations.check_in ) ) 
                                  		) 
                                  		LIMIT 1 
                                  	) IS NULL 
                                  	AND rooms.type_id = ${roomType.id}
                                  ORDER BY
                                  	rooms."number" ASC
                                  	LIMIT 1;
                                      `;
            uniqueRooms.push(...res);
        }

        return {
            status: 'success',
            data: uniqueRooms,
        }
    }, {
      body : t.Object({
        check_in : t.Date(),
        check_out : t.Date()
      })
    });



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