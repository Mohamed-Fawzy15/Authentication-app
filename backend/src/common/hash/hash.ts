import { hash, compare } from 'bcryptjs';

export const Hash = async (text: string, saltRound: number = 12) => {
  try {
    const hashedText = await hash(text, saltRound);

    return hashedText;
  } catch (error) {
    console.error(`Hash function error: ${error}`);
    throw error;
  }
};

export const Compare = async (text: string, hashedText: string) => {
  try {
    const result = await compare(text, hashedText);

    return result;
  } catch (error) {
    console.error(`Compare function error: ${error}`);
    throw error;
  }
};
