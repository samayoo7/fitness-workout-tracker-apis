import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateToken = (userId: string) => {
	return jwt.sign(
		{ userId: userId },
		process.env.JWT_SECRET as string,
		{ expiresIn: '1h' }
	);
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const createHashedPassword = async (password: string) =>  {
	return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hashedPassword: string) => {
	return await bcrypt.compare(password, hashedPassword)
}