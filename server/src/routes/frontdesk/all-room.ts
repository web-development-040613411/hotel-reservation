import { sql } from '@/libs/db';
import Elysia, { t } from 'elysia';

export const allRoomsRoute = new Elysia({ prefix: '/all-room' }).get(
    '/',
    async ({ set }) => {
        const allRooms = await sql`
            SELECT rooms.id , rooms."number" , rooms.current_status , room_types."name" , room_types.detail , room_types.capacity , room_types.price , room_types.picture_path  FROM rooms INNER JOIN room_types ON rooms.type_id = room_types.id ORDER BY room_types.name
        `;

        const groupedRooms = allRooms.reduce((acc, room) => {
            const roomType = room.name;

            if (!acc[roomType]) {
                acc[roomType] = [];
            }

            acc[roomType].push({
                id: room.id,
                number: room.number,
                current_status: room.current_status,
                detail: room.detail,
                capacity: room.capacity,
                price: room.price,
                picture_path: room.picture_path,
            });

            return acc;
        }, {});

        return {
            status: 'success',
            data: groupedRooms,
        };
    }
);
