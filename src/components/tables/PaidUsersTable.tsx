// src/components/tables/PaidUsersTable.tsx
'use client';

import React from 'react';

// In a real app, you would define this type in a central types file
interface PaidUser {
  id: number;
  name: string;
  email: string;
  plan: 'Monthly' | 'Yearly' | 'Lifetime';
  joinDate: string;
  status: 'Active' | 'Canceled';
  avatar: string;
}

// Mock data for paid users
const paidUsers: PaidUser[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', plan: 'Yearly', joinDate: '2023-01-15', status: 'Active', avatar: 'https://placehold.co/40x40/34d399/ffffff?text=A' },
  { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', plan: 'Monthly', joinDate: '2023-03-22', status: 'Active', avatar: 'https://placehold.co/40x40/f87171/ffffff?text=B' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', plan: 'Monthly', joinDate: '2023-05-10', status: 'Canceled', avatar: 'https://placehold.co/40x40/60a5fa/ffffff?text=C' },
  { id: 4, name: 'Diana Miller', email: 'diana.m@example.com', plan: 'Yearly', joinDate: '2022-11-30', status: 'Active', avatar: 'https://placehold.co/40x40/facc15/ffffff?text=D' },
  { id: 5, name: 'Ethan Davis', email: 'ethan.d@example.com', plan: 'Lifetime', joinDate: '2021-08-01', status: 'Active', avatar: 'https://placehold.co/40x40/c084fc/ffffff?text=E' },
];

const StatusBadge: React.FC<{ status: 'Active' | 'Canceled' }> = ({ status }) => (
  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
    status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
  }`}>
    {status}
  </span>
);

export const PaidUsersTable: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Paid Subscribers</h3>
      <div className="overflow-x-auto">
        {/* On smaller than md screens, we use a block layout (cards) */}
        <div className="md:hidden">
            {paidUsers.map(user => (
                <div key={user.id} className="bg-gray-700 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-bold text-white">{user.name}</p>
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                        </div>
                        <StatusBadge status={user.status} />
                    </div>
                    <div className="mt-4 flex justify-between text-sm">
                        <div>
                            <p className="text-gray-400">Plan</p>
                            <p className="font-semibold text-white">{user.plan}</p>
                        </div>
                         <div>
                            <p className="text-gray-400">Joined</p>
                            <p className="font-semibold text-white">{user.joinDate}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* On md screens and up, we use a table layout */}
        <table className="min-w-full text-sm text-left text-gray-300 hidden md:table">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
            <tr>
              <th scope="col" className="px-6 py-3">User</th>
              <th scope="col" className="px-6 py-3">Subscription Plan</th>
              <th scope="col" className="px-6 py-3">Join Date</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {paidUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-6 py-4 font-medium text-white">
                  <div className="flex items-center space-x-3">
                    <img className="w-10 h-10 rounded-full" src={user.avatar} alt={`${user.name} avatar`} />
                    <div>
                      <div>{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{user.plan}</td>
                <td className="px-6 py-4">{user.joinDate}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

