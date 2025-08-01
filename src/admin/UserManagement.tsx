import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiCheck, FiX, FiRefreshCw, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from "framer-motion";
interface User {
  _id: string;
  email: string;
  ip_address?: string;
  role: string;
  status: string;
  isDeleted?: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);



  // Fetch user list
  const getUserList = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API}admin/getUserList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      
      const res = await response.json();
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        toast.error(res.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

    // Check authentication
    useEffect(() => {
      if (!token) {
        alert('Please login to access this page');
        navigate('/');
      } else {
        getUserList();
      }
    }, [ getUserList, token, navigate]);
  // Handle role update
  const handleEdit = (userId: string) => {
    setEditingUserId(userId);
    const userToEdit = users.find(user => user._id === userId);
    if (userToEdit) {
      setEditedUser({ 
        email: userToEdit.email,
        role: userToEdit.role
      });
    }
    };

  const saveRoleChange = async (userId: string) => {
    setIsActionLoading(userId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}admin/updateUserRole/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            role: editedUser.role
          }),
        }
      );

      const res = await response.json();
      if (res.success) {
        toast.success('Role updated successfully');
        setEditingUserId(null);
        getUserList();
      } else {
        toast.error(res.message || 'Failed to update role');
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error('Failed to update role');
    } finally {
      setIsActionLoading(null);
    }
  };

  // Handle status toggle
  const toggleActive = async (userId: string) => {
    setIsActionLoading(`status-${userId}`);
    try {
      const user = users.find(u => u._id === userId);
      const newStatus = user?.status === 'active' ? 'inactive' : 'active';

      const response = await fetch(
        `${import.meta.env.VITE_API}admin/updateUserStatus/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            status: newStatus
          }),
        }
      );

      const res = await response.json();
      if (res.success) {
        toast.success(`User marked as ${newStatus}`);
        getUserList();
      } else {
        toast.error(res.message || 'Failed to update status');
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error('Failed to update status');
    } finally {
      setIsActionLoading(null);
    }
  };

  // Handle delete/restore
  const toggleDelete = async (userId: string) => {
    setIsActionLoading(`delete-${userId}`);
    const user = users.find(u => u._id === userId);
    const action = user?.isDeleted ? 'restore' : 'delete'; // Move action declaration here
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}admin/${action}User/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      const res = await response.json();
      if (res.success) {
        toast.success(`User ${action === 'delete' ? 'deleted' : 'restored'} successfully`);
        getUserList();
      } else {
        toast.error(res.message || `Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`Error ${user?.isDeleted ? 'restoring' : 'deleting'} user:`, error);
      toast.error(`Failed to ${action} user`);
    } finally {
      setIsActionLoading(null);
    }
  };

  // Handle role change in edit mode
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedUser({ ...editedUser, role: e.target.value });
  };


  const refreshUserList = () => {
    // Your logic to fetch updated user list
    getUserList();
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          // onClick={() => navigate('/admin/users/add')}
        onClick={() => setIsOpen(true)}

        >
          Add New User
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FiRefreshCw className="animate-spin text-4xl text-indigo-600" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className={user.isDeleted ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user._id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingUserId === user._id ? (
                      <input
                        type="email"
                        value={editedUser.email || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.ip_address || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user._id ? (
                      <select
                        value={editedUser.role || ''}
                        onChange={handleRoleChange}
                        className="border rounded px-2 py-1"
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    ) : (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleActive(user._id)}
                      disabled={isActionLoading === `status-${user._id}`}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        ${isActionLoading === `status-${user._id}` ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {isActionLoading === `status-${user._id}` ? (
                        <FiRefreshCw className="animate-spin" />
                      ) : (
                        user.status === 'active' ? 'Active' : 'Inactive'
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingUserId === user._id ? (
                      <>
                        <button
                          onClick={() => saveRoleChange(user._id)}
                          disabled={isActionLoading === user._id}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          {isActionLoading === user._id ? (
                            <FiRefreshCw className="animate-spin" />
                          ) : (
                            <FiCheck />
                          )}
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FiX />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(user._id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => toggleDelete(user._id)}
                          disabled={isActionLoading === `delete-${user._id}`}
                          className="text-red-600 hover:text-red-900"
                        >
                          {isActionLoading === `delete-${user._id}` ? (
                            <FiRefreshCw className="animate-spin" />
                          ) : (
                            <FiTrash2 />
                          )}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} refreshUsers={refreshUserList}
      />
    </div>
  );
};

export default UserManagement;











interface SpringModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshUsers: () => void;
}

const SpringModal: React.FC<SpringModalProps> = ({ isOpen, setIsOpen, refreshUsers }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
    status: 'active'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${import.meta.env.VITE_API}admin/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to create user');

      toast.success('User created successfully!');
      setFormData({
        email: '',
        password: '',
        role: 'user',
        status: 'active'
      });
      refreshUsers();
      setIsOpen(false);
    } catch (error) {
      console.error('Create user error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>

            <div className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                  <FiUser className="text-indigo-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Create New User</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="user@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center min-w-[100px]"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Create User'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

