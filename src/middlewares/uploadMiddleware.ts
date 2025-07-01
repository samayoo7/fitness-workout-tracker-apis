import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb: Function) => {
		cb(null, 'uploads/profiles/');
	},
	filename: (req: Request, file: Express.Multer.File, cb: Function) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, `profile-${uniqueSuffix}${path.extname(file.originalname)}`);
	},
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
	const allowedTypes = /jpeg|jpg|png|gif|webp/;
	const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = allowedTypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed!'));
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5MB
	},
});

export const uploadProfilePhoto = upload.single('profilePhoto');