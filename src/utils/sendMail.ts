import nodemailer from 'nodemailer';

export const sendMail = async (to: string, name: string) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject: 'Welcome to Fitness Workout Tracker',
		html: `<!DOCTYPE html>
			<html>
			<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Welcome to Fitness Workout Tracker</title>
			<style>
				body {
				font-family: 'Arial', sans-serif;
				line-height: 1.6;
				color: #333333;
				margin: 0;
				padding: 0;
				background-color: #f6f6f6;
				}
				.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				background-color: #ffffff;
				}
				.header {
				text-align: center;
				padding: 20px 0;
				background-color: #4CAF50;
				color: white;
				border-radius: 5px 5px 0 0;
				}
				.content {
				padding: 30px 20px;
				}
				.button {
				display: inline-block;
				padding: 12px 24px;
				background-color: #4CAF50;
				color: white;
				text-decoration: none;
				border-radius: 4px;
				margin: 20px 0;
				font-weight: bold;
				}
				.footer {
				text-align: center;
				padding: 15px;
				font-size: 12px;
				color: #777777;
				background-color: #f6f6f6;
				border-radius: 0 0 5px 5px;
				}
				.logo {
				margin-bottom: 10px;
				font-size: 24px;
				font-weight: bold;
				}
			</style>
			</head>
			<body>
			<div class="container">
				<div class="header">
				<div class="logo">🏋️‍♂️ Fitness Workout Tracker</div>
				<p>YOUR FITNESS JOURNEY STARTS HERE</p>
				</div>
				<div class="content">
				<h2>Welcome to Fitness Workout Tracker!</h2>
				<p>Hi ${name},</p>
				<p>Thank you for joining Fitness Workout Tracker! Your account has been successfully created and you're now ready to start your fitness journey.</p>
				<p>With our app, you can:</p>
				<ul>
					<li>Create personalized workout plans</li>
					<li>Track your progress over time</li>
					<li>Schedule your workouts</li>
					<li>Access a library of exercises</li>
				</ul>
				<p>Get started by logging in to your account and creating your first workout plan!</p>
				<p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
				<p>Stay strong and keep pushing!</p>
				<p>The Fitness Workout Tracker Team</p>
				</div>
				<div class="footer">
				<p>&copy; 2025 Fitness Workout Tracker. All rights reserved.</p>
				<p>Ahmedabad, Gujarat, India</p>
				<p>
					<a href="https://yourapp.com/privacy-policy">Privacy Policy</a> | 
					<a href="https://yourapp.com/terms">Terms of Service</a>
				</p>
				</div>
			</div>
			</body>
			</html>`,
		text: `Welcome to Fitness Workout Tracker. Your account has been created successfully.`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Verification email sent:', info.messageId);
		return true;
	} catch (error) {
		console.error('Error sending verification email:', error);
		return false;
	}
};