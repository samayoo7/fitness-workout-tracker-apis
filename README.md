# Fitness Workout Tracker APIs

A comprehensive REST API service for tracking fitness workouts, managing workout plans, and scheduling exercise routines.

## Features

- 👤 User Authentication & Authorization
- 📋 Workout Plan Management
- 📅 Workout Scheduling
- 📝 Workout Logging
- 📊 Exercise Tracking
- 📈 Progress Statistics
- 📧 Email Notifications for Scheduled Workouts

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Email Service**: Nodemailer
- **Scheduling**: Cron Jobs

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/samayoo7/fitness-workout-tracker-apis.git
cd fitness-workout-tracker-apis
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/fitness_db"
JWT_SECRET="your-jwt-secret"
EMAIL_USER=sender_email_id
EMAIL_PASSWORD=sender_email_app_password
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Seed the database (optional):
```bash
npm run seed
```

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## API Documentation

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Workout Plans

#### Create Workout Plan
```http
POST /api/workouts
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Full Body Workout",
  "description": "Complete full body workout routine",
  "items": [
    {
      "exerciseId": "exercise-id",
      "sets": 3,
      "repetitions": 12,
      "weight": 50.5,
      "restTime": 60,
      "order": 1,
      "notes": "Keep proper form"
    }
  ]
}
```

### Workout Schedules

#### Create Workout Schedule
```http
POST /api/workout-schedules
Content-Type: application/json
Authorization: Bearer <token>

{
  "workoutPlanId": "plan-id",
  "scheduledDate": "2024-04-20T10:00:00Z",
  "duration": 60,
  "notes": "Morning workout"
}
```

### Workout Logs

#### Log Workout
```http
POST /api/workout-logs
Content-Type: application/json
Authorization: Bearer <token>

{
  "workoutPlanId": "plan-id",
  "workoutScheduleId": "schedule-id",
  "startTime": "2024-04-20T10:00:00Z",
  "endTime": "2024-04-20T11:00:00Z",
  "exercises": [
    {
      "exerciseId": "exercise-id",
      "setsCompleted": 3,
      "repsCompleted": 12,
      "weightUsed": 50.5,
      "notes": "Felt strong today"
    }
  ],
  "notes": "Great workout session",
  "rating": 5
}
```

## Error Handling

The API uses standard HTTP response codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Success responses follow this format:
```json
{
  "success": true,
  "message": "Success message here",
  "statusCode": 400
}

```
Error responses follow this format:
```json
{
  "success": false,
  "message": "Error message here",
  "errors": []
}
```

## Security Features
- Password hashing
- JWT authentication
- CORS protection
- Request validation
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.