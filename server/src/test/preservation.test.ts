import { describe, expect, it } from 'bun:test';
import { app } from '../index';

let room_id;
let toDeleteRoomID: string;
const updateRoomIdTarget = '2d317330-1d5a-42e7-90c1-2c62f589737e';

describe('Elysia', () => {
    it('[preserve room] wrong room_id', async () => {
        // number need four digits
        const formData = new FormData();

        formData.append('room_id', 'wrong');
        formData.append('check_in', '2024-09-01');
        formData.append('check_out', '2024-09-07');

        const response = await app
            .handle(
                new Request(`${process.env.HOST_NAME}/admin/rooms/`, {
                    method: 'POST',
                    body: formData,
                })
            )
            .then((res) => res);

        expect(response.status).toBe(400);
    });
});
