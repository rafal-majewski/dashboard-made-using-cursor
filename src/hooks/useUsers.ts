import { useState, useEffect } from 'react';
import { getUsers } from '@/services/users';
import { User } from '@/types/user';

export function useUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async (): Promise<void> => {
			try {
				const data = await getUsers();
				setUsers(data);
			} catch (err) {
				setError('Failed to load users');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	return { users, loading, error };
}
