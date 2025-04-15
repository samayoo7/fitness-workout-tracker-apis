# fitness-workout-tracker-apis

## Workout Plans
- POST /workout-plans - Create a workout plan
- GET /workout-plans - List all workout plans for a user
- GET /workout-plans/:id - Get specific workout plan details
- PUT /workout-plans/:id - Update a workout plan
- DELETE /workout-plans/:id - Delete a workout plan
- PATCH /workout-plans/:id/status - Toggle plan active status

## Workout Schedule
- POST /schedules - Schedule a workout
- GET /schedules - List all scheduled workouts
- GET /schedules/:id - Get specific schedule details
- PUT /schedules/:id - Update a schedule
- DELETE /schedules/:id - Delete a schedule
- PATCH /schedules/:id/complete - Mark schedule as completed

## Workout Logs
- POST /logs - Create a workout log
- GET /logs - List all workout logs
- GET /logs/:id - Get specific log details
- PUT /logs/:id - Update a log
- DELETE /logs/:id - Delete a log
- POST /logs/:id/exercises - Add exercises to log
- PUT /logs/:id/exercises/:exerciseId - Update logged exercise

## Analytics/Stats
- GET /stats/workout-frequency - Get workout frequency
- GET /stats/exercise-progress - Track progress for exercises
- GET /stats/completion-rate - Get workout completion rate
- GET /stats/popular-exercises - Get most used exercises