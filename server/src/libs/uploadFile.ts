import { join } from "path";
import { v4 as uuidv4 } from "uuid"

export const uploadFile = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const date = new Date();

  const fileName = `${uuidv4()}-${date.getDate()}-${date.getMonth()}.${file.type.split("/")[1]}`;
  const path = join(".", process.env.UPLOAD_FOLDER!, fileName);  
  const url = `/file/${fileName}`;

  try {
    await Bun.write(path, buffer as any);
    return url;
  } catch (error) {
    console.log(error)
    return null;
  }
};
