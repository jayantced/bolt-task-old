'use client'
// pages/index.tsx

import { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/api';
import UserCard from '../components/UserCard';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export default function IndexPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const userData = await fetchUsers();
                setUsers(userData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const loadMoreUsers = async () => {
        try {
            setLoading(true);
            const userData = await fetchUsers();
            setUsers(prevUsers => [...prevUsers, ...userData.data]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching more users:', error);
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            loadMoreUsers();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg">
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
}
