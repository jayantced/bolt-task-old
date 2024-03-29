// components/UserCard.tsx

import Image from 'next/image'; // Import Image component from Next.js

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="p-4 rounded-lg shadow-lg bg-fuchsia-500">
            <div className="user-image">
                {/* Provide width and height properties to the Image component */}
                <Image
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    width={100}
                    height={100}
                    className="rounded-full"
                />
            </div>
            <div className="user-details mt-4">
                <p className="text-lg font-semibold">{user.first_name} {user.last_name}</p>
                <p className="text-gray-600">{user.email}</p>
            </div>
        </div>
    );
};

export default UserCard;
