import { describe, expect, it } from "bun:test";
import { app } from "../index";

let room_id;
let toDeleteRoomID : string;

describe("Elysia", () => {
  it("[create-room] wrong number format", async () => {
    // number need four digits
    const formData = new FormData();

    formData.append("number", "1234");
    formData.append("type_id", "");

    const response = await app
      .handle(
        new Request(`${process.env.HOST_NAME}/admin/rooms/create`, {
          method: "POST",
          body: formData,
        })
      )
      .then((res) => res);

    expect(response.status).toBe(400);
  });

  it("[create-room] wrong type id format.", async () => {
    const formData = new FormData();

    formData.append("number", "123");
    formData.append("type_id", "wrong-uuid");

    const response = await app
      .handle(
        new Request(`${process.env.HOST_NAME}/admin/rooms/create`, {
          method: "POST",
          body: formData,
        })
      )
      .then((res) => res);

    expect(response.status).toBe(400);
  });

  it("[create-room] wrong type id and number format.", async () => {
    const formData = new FormData();

    formData.append("number", "1234");
    formData.append("type_id", "wrong-uuid");

    const response = await app
      .handle(
        new Request(`${process.env.HOST_NAME}/admin/rooms/create`, {
          method: "POST",
          body: formData,
        })
      )
      .then((res) => res);

    expect(response.status).toBe(400);
  });

  it("[create-room] right-format", async () => {
    const formData = new FormData();

    formData.append("number", "456");
    formData.append("type_id", "b0ea90de-1c75-408f-8ff4-7e246a46c480");

    const response = await app
      .handle(
        new Request(`${process.env.HOST_NAME}/admin/rooms/create`, {
          method: "POST",
          body: formData,
        })
      )
      .then((res) => res);

    room_id = (await response.json()).room_id;
    toDeleteRoomID = room_id;
    expect(response.status).toBe(201);
  });                                  

  it("[get-room] get all.", async () => {
    const response = await app
      .handle(new Request(`${process.env.HOST_NAME}/admin/rooms/`, { method: "GET" }))

    expect(response.status).toBe(200);
    }
  );

  it("[get-room] get by id.", async () => {
    const response = await app
      .handle(new Request(`${process.env.HOST_NAME}/admin/rooms/73d58b20-b3db-46e7-a1aa-bb44bf8d01e3`, { method: "GET" }))

    expect(response.status).toBe(200);
  });

  it("[get-room] get by wrong id.", async () => {
    const response = await app
      .handle(new Request(`${process.env.HOST_NAME}/admin/rooms/wrong-id`, { method: "GET" }))

    expect(response.status).toBe(400);
  });

  it("[update-room] wrong data format", async () => {
    // number need four digits
    const formData = new FormData();

    formData.append("id", "73d58b20-b3db-46e7-a1aa-bb44bf8d01e3");
    formData.append("number", "1234");
    formData.append("type_id", "wrong-uuid");

    const response = await app
      .handle(
        new Request(`${process.env.HOST_NAME}/admin/rooms/update`, {
          method: "PUT",
          body: formData,
        })
      )
      .then((res) => res);

    expect(response.status).toBe(400);
  });

  it("[update-room] duplicate room number", async () => {
    const formData = new FormData();

    formData.append("id", "786bd07c-c9e8-4b38-a2cd-f5e0799bd302");
    formData.append("number", "101");
    formData.append("type_id", "b0ea90de-1c75-408f-8ff4-7e246a46c480");

    const response = await app
      .handle(
        new Request(`${process.env.HOST_NAME}/admin/rooms/update`, {
          method: "PUT",
          body: formData,
        })
      )
      .then((res) => res);

    expect(response.status).toBe(409);
  });

  it("[update-room] right data format", async () => {
    const formData = new FormData();

    formData.append("id", "786bd07c-c9e8-4b38-a2cd-f5e0799bd302");
    formData.append("number", "109");
    formData.append("type_id", "b0ea90de-1c75-408f-8ff4-7e246a46c480");

    const response = await app
      .handle(
        new Request(`${process.env.HOST_NAME}/admin/rooms/update`, {
          method: "PUT",
          body: formData,
        })
      )
      .then((res) => res);

    expect(response.status).toBe(200);
  });

  it("[delete-room] wrong id format", async () => {
    const response = await app
      .handle(new Request(`${process.env.HOST_NAME}/admin/rooms/delete/wrong-id`, { method: "DELETE" }))

    expect(response.status).toBe(400);
  });

  it("[delete-room] right id format", async () => {
    const response = await app
      .handle(new Request(`${process.env.HOST_NAME}/admin/rooms/delete/${toDeleteRoomID}`, { method: "DELETE" }))

    expect(response.status).toBe(200);
  });
});
