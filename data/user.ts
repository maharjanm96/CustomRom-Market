import connectMongo from "@/lib/database";
import Users from "@/models/Users";

export const getUserByEmail = async (email: string) => {
  try {
    await connectMongo();
    const user = await Users.findOne({ email });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectMongo();
    const user = await Users.findOne({ _id: id });
    return user;
  } catch {
    return null;
  }
};
