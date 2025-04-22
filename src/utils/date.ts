export const getDateRange = (period: 'thisMonth' | 'lastMonth' | 'lastWeek', now: Date = new Date()): { startDate: Date, endDate: Date } => {
	let startDate: Date;
	let endDate: Date;

	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth(); // 0-indexed
	const currentDate = now.getDate();
	const currentDayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

	now.setUTCHours(0, 0, 0, 0); // Normalize time part to start of day UTC for consistency

	switch (period) {
		case 'thisMonth':
			startDate = new Date(Date.UTC(currentYear, currentMonth, 1));
			endDate = new Date(Date.UTC(currentYear, currentMonth + 1, 1));
			break;
		case 'lastMonth':
			const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
			const yearOfLastMonth = currentMonth === 0 ? currentYear - 1 : currentYear;
			startDate = new Date(Date.UTC(yearOfLastMonth, lastMonth, 1));
			endDate = new Date(Date.UTC(currentYear, currentMonth, 1)); // End is start of current month
			break;
		case 'lastWeek':
			// Assuming week starts on Sunday (day 0)
			const diffToLastSunday = currentDate - currentDayOfWeek - 7; // Go back to previous Sunday
			startDate = new Date(now); // Use a copy
			startDate.setUTCDate(diffToLastSunday);

			const diffToThisSunday = currentDate - currentDayOfWeek; // Go back to current Sunday
			endDate = new Date(now); // Use a copy
			endDate.setUTCDate(diffToThisSunday);

			break;
		default:
			throw new Error(`Unsupported period: ${period}`);
	}

	return { startDate, endDate };
}