import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  MoreHorizontal, 
  Edit3, 
  ArrowLeftRight, 
  UserX, 
  RotateCcw, 
  X, 
  RefreshCw, 
  AlertTriangle,
  Check 
} from 'lucide-react';
import type { UserAccount, UserRole } from '@/types/crm';

const PALETTE = ["#3B4A40", "#3F5D46", "#5B4B8A", "#8A5A2B", "#2E5A78", "#7A3B4E", "#4A5B2E", "#6B4A2E"];

const ROLE_STYLES: Record<UserRole, { bg: string; fg: string; darkBg?: string; darkFg?: string; border?: string }> = {
  Marketing: { bg: 'bg-[#E8EEF5]', fg: 'text-[#3D5A78]' },
  Procurement: { bg: 'bg-[#E2F0EF]', fg: 'text-[#2E6B68]' },
  Admin: { bg: 'bg-[#ECE7F5]', fg: 'text-[#5B4B8A]' },
  SuperAdmin: { bg: 'bg-[#16160F]', fg: 'text-[#FADF01]', border: 'ring-1.5 ring-[#FADF01]' }
};

function getInitials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

function generateTempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!#%";
  let p = "";
  for (let i = 0; i < 12; i++) {
    p += chars[Math.floor(Math.random() * chars.length)];
  }
  return p;
}

interface UsersPageProps {
  users: UserAccount[];
  onAddUser: (user: UserAccount) => void;
  onUpdateUserRole: (id: string, role: UserRole) => void;
  onToggleUserActive: (id: string) => void;
}

export const UsersPage: React.FC<UsersPageProps> = ({
  users,
  onAddUser,
  onUpdateUserRole,
  onToggleUserActive
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Deactivated'>('All');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  
  // Dropdown & Modal states
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [rowMenuOpenId, setRowMenuOpenId] = useState<string | null>(null);
  
  // Modals
  const [modalType, setModalType] = useState<'new' | 'role' | 'deactivate' | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  
  // New User Form State
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('Marketing');
  const [tempPassword, setTempPassword] = useState(generateTempPassword());

  // Role Edit Form State
  const [editRole, setEditRole] = useState<UserRole>('Marketing');

  // Close menus
  const closeAllMenus = () => {
    setRoleMenuOpen(false);
    setRowMenuOpenId(null);
  };

  // Filtering
  const filteredUsers = users.filter((u) => {
    const matchesQuery = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' ? u.active : !u.active);
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesQuery && matchesStatus && matchesRole;
  });

  const handleOpenNewUser = () => {
    closeAllMenus();
    setNewFirstName('');
    setNewLastName('');
    setNewEmail('');
    setNewRole('Marketing');
    setTempPassword(generateTempPassword());
    setModalType('new');
  };

  const handleCreateUser = () => {
    if (!newFirstName.trim() || !newLastName.trim() || !newEmail.trim()) return;
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: `${newFirstName.trim()} ${newLastName.trim()}`,
      email: newEmail.trim(),
      role: newRole,
      active: true,
      created: 'Just now'
    };
    onAddUser(newUser);
    setModalType(null);
  };

  const handleOpenChangeRole = (user: UserAccount) => {
    closeAllMenus();
    setSelectedUser(user);
    setEditRole(user.role);
    setModalType('role');
  };

  const handleSaveRoleChange = () => {
    if (selectedUser) {
      onUpdateUserRole(selectedUser.id, editRole);
    }
    setModalType(null);
    setSelectedUser(null);
  };

  const handleOpenDeactivate = (user: UserAccount) => {
    closeAllMenus();
    if (user.self && user.active) return; // Prevent deactivating self
    if (!user.active) {
      // Direct reactivate
      onToggleUserActive(user.id);
    } else {
      setSelectedUser(user);
      setModalType('deactivate');
    }
  };

  const handleConfirmDeactivate = () => {
    if (selectedUser) {
      onToggleUserActive(selectedUser.id);
    }
    setModalType(null);
    setSelectedUser(null);
  };

  return (
    <main 
      className="flex-1 min-w-0 overflow-y-auto p-6 md:p-8"
      onClick={closeAllMenus}
    >
      {/* Header */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-1.5">Users</h1>
          <p className="text-sm font-medium text-[var(--muted)]">Manage internal staff accounts and permissions.</p>
        </div>
        <div className="ml-auto">
          <button
            onClick={handleOpenNewUser}
            className="flex items-center gap-2 h-11 px-5 rounded-full bg-[#FADF01] hover:bg-[#EDD400] text-sm font-bold text-[#16160F] shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#16160F] stroke-[2.2]" />
            <span>New User</span>
          </button>
        </div>
      </div>

      {/* Main Section Card */}
      <section className="bg-[var(--soft)] border border-[var(--border)] rounded-2xl p-5">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px] max-w-[360px]">
            <Search className="w-4 h-4 text-[var(--muted2)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="h-10 w-full pl-9 pr-3.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--ink)] placeholder:text-[#B4B4AA] outline-none focus:border-[var(--ink)] transition-colors"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-1 p-1 bg-[var(--card)] border border-[var(--border)] rounded-full">
            {(['All', 'Active', 'Deactivated'] as const).map((tab) => {
              const active = statusFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`h-8 px-4 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    active 
                      ? 'bg-[var(--pill-active-bg)] text-[var(--pill-active-fg)]' 
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Role Filter */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setRoleMenuOpen(!roleMenuOpen); setRowMenuOpenId(null); }}
              className="flex items-center gap-2 h-10 px-4 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs font-semibold text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            >
              <span>Role: {roleFilter}</span>
              <ChevronDown className="w-3 h-3 text-[var(--icon)]" />
            </button>
            {roleMenuOpen && (
              <div 
                className="absolute top-11 right-0 z-30 min-w-[170px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-1.5 flex flex-col gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {['All', 'Marketing', 'Procurement', 'Admin', 'SuperAdmin'].map((r) => (
                  <button
                    key={r}
                    onClick={() => { setRoleFilter(r); setRoleMenuOpen(false); }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-left ${
                      roleFilter === r ? 'bg-[var(--hover)] text-[var(--ink)]' : 'text-[var(--ink)] hover:bg-[var(--hover)]'
                    }`}
                  >
                    <span>{r}</span>
                    {roleFilter === r && <Check className="w-3.5 h-3.5 text-[var(--ink)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="ml-auto text-xs font-semibold text-[var(--muted2)]">
            {filteredUsers.length} of {users.length} users
          </span>
        </div>

        {/* Users Table */}
        <div className="bg-[var(--card)] rounded-xl p-2 px-4 shadow-sm overflow-x-auto">
          <table className="w-full border-collapse min-w-[820px]">
            <thead>
              <tr>
                <th className="text-left py-3.5 pr-2 text-xs font-semibold text-[var(--muted2)]">Name</th>
                <th className="text-left py-3.5 pr-2 text-xs font-semibold text-[var(--muted2)]">Email</th>
                <th className="text-left py-3.5 pr-2 text-xs font-semibold text-[var(--muted2)]">Role</th>
                <th className="text-left py-3.5 pr-2 text-xs font-semibold text-[var(--muted2)]">Status</th>
                <th className="text-left py-3.5 pr-2 text-xs font-semibold text-[var(--muted2)]">Created</th>
                <th className="text-right py-3.5 pl-2 text-xs font-semibold text-[var(--muted2)]"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, idx) => {
                const isDimmed = !u.active;
                const isSelfDisabled = u.self && u.active;
                const roleStyle = ROLE_STYLES[u.role] || ROLE_STYLES.Marketing;
                
                return (
                  <tr key={u.id} className={`border-t border-[var(--hair)] transition-opacity ${isDimmed ? 'opacity-50' : 'opacity-100'}`}>
                    {/* Name column */}
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="shrink-0 w-8.5 h-8.5 rounded-full overflow-hidden text-xs font-bold text-white flex items-center justify-center"
                          style={{ background: PALETTE[idx % PALETTE.length] }}
                        >
                          {u.self ? (
                            <img src="assets/avatar-keegan.jpg" alt={u.name} className="w-full h-full object-cover" />
                          ) : (
                            getInitials(u.name)
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[var(--ink)] whitespace-nowrap">{u.name}</span>
                          {u.self && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--icon-bg)] text-[var(--muted)] whitespace-nowrap">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email column */}
                    <td className="py-3 pr-2 text-xs font-medium text-[var(--muted)] whitespace-nowrap">{u.email}</td>

                    {/* Role column */}
                    <td className="py-3 pr-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[11.5px] font-bold whitespace-nowrap ${roleStyle.bg} ${roleStyle.fg} ${roleStyle.border || ''}`}>
                        {u.role}
                      </span>
                    </td>

                    {/* Status column */}
                    <td className="py-3 pr-2">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <span className={`w-1.75 h-1.75 rounded-full ${u.active ? 'bg-[#2E9E56]' : 'bg-[var(--muted2)]'}`} />
                        <span className={`text-xs font-bold ${u.active ? 'text-[#1E6E3C]' : 'text-[var(--muted2)]'}`}>
                          {u.active ? 'Active' : 'Deactivated'}
                        </span>
                      </span>
                    </td>

                    {/* Created column */}
                    <td className="py-3 pr-2 text-xs font-medium text-[var(--muted)] whitespace-nowrap">{u.created}</td>

                    {/* Actions Menu */}
                    <td className="py-3 pl-2 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={(e) => { e.stopPropagation(); setRowMenuOpenId(rowMenuOpenId === u.id ? null : u.id); setRoleMenuOpen(false); }}
                          title="Actions"
                          className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] inline-flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-[var(--icon)]" />
                        </button>

                        {rowMenuOpenId === u.id && (
                          <div 
                            className="absolute top-9 right-0 z-40 min-w-[176px] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-1.5 flex flex-col text-left"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => setRowMenuOpenId(null)}
                              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-[var(--icon)]" />
                              <span>Edit Details</span>
                            </button>
                            <button
                              onClick={() => handleOpenChangeRole(u)}
                              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold rounded-lg text-[var(--ink)] hover:bg-[var(--hover)] transition-colors cursor-pointer text-left"
                            >
                              <ArrowLeftRight className="w-3.5 h-3.5 text-[var(--icon)]" />
                              <span>Change Role</span>
                            </button>

                            <div className="h-px bg-[var(--hair)] my-1" />

                            <button
                              onClick={() => handleOpenDeactivate(u)}
                              disabled={Boolean(isSelfDisabled)}
                              title={isSelfDisabled ? 'You cannot deactivate your own account' : ''}
                              className={`flex items-center gap-2.5 w-full px-3 py-2 text-xs font-semibold rounded-lg transition-colors text-left ${
                                isSelfDisabled 
                                  ? 'text-[var(--muted2)] cursor-not-allowed' 
                                  : u.active 
                                    ? 'text-[#D4373A] hover:bg-[#FBE9E9] cursor-pointer' 
                                    : 'text-[#1E8A4C] hover:bg-[#E5F4E9] cursor-pointer'
                              }`}
                            >
                              {u.active ? (
                                <UserX className="w-3.5 h-3.5" />
                              ) : (
                                <RotateCcw className="w-3.5 h-3.5 text-[#1E8A4C]" />
                              )}
                              <span>{u.active ? 'Deactivate' : 'Reactivate'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal: New User */}
      {modalType === 'new' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/45 backdrop-blur-xs animate-in fade-in"
            onClick={() => setModalType(null)}
          />
          <div className="relative z-10 w-[480px] max-w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-6.5 animate-in zoom-in-95">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-lg font-extrabold text-[var(--ink)] tracking-tight">New User</h2>
              <button 
                onClick={() => setModalType(null)}
                className="w-7 h-7 rounded-full hover:bg-[var(--hover)] flex items-center justify-center text-[var(--icon)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-medium text-[var(--muted)] mb-5">Create an internal staff account.</p>

            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">First Name <span className="text-[#D4373A]">*</span></span>
                <input 
                  type="text" 
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  placeholder="First name"
                  className="h-10 px-3.5 rounded-lg border-1.5 border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)]"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-[var(--ink)]">Last Name <span className="text-[#D4373A]">*</span></span>
                <input 
                  type="text" 
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  placeholder="Last name"
                  className="h-10 px-3.5 rounded-lg border-1.5 border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)]"
                />
              </label>

              <label className="flex flex-col gap-1.5 col-span-2">
                <span className="text-xs font-bold text-[var(--ink)]">Email <span className="text-[#D4373A]">*</span></span>
                <input 
                  type="text" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@saharvest.org"
                  className="h-10 px-3.5 rounded-lg border-1.5 border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none focus:border-[var(--ink)]"
                />
              </label>

              <label className="flex flex-col gap-1.5 col-span-2">
                <span className="text-xs font-bold text-[var(--ink)]">Role <span className="text-[#D4373A]">*</span></span>
                <select 
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="h-10 px-3 rounded-lg border-1.5 border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none cursor-pointer"
                >
                  <option value="Marketing">Marketing</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                </select>
              </label>

              <div className="flex flex-col gap-1.5 col-span-2">
                <span className="text-xs font-bold text-[var(--ink)]">Temporary Password</span>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 px-3.5 rounded-lg border-1.5 border-dashed border-[var(--border)] bg-[var(--icon-bg)] flex items-center text-xs font-bold tracking-widest font-mono text-[var(--ink)]">
                    {tempPassword}
                  </div>
                  <button 
                    onClick={() => setTempPassword(generateTempPassword())}
                    className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] text-xs font-bold text-[var(--ink)] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[var(--icon)]" />
                    <span>Regenerate</span>
                  </button>
                </div>
                <span className="text-[11px] font-medium text-[var(--muted)]">User will be required to change this on first login</span>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 mt-5">
              <button 
                onClick={() => setModalType(null)}
                className="h-10 px-5 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] text-xs font-semibold text-[var(--ink)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateUser}
                className="h-10 px-5.5 rounded-full bg-[#FADF01] hover:bg-[#EDD400] text-xs font-bold text-[#16160F] shadow-sm transition-colors cursor-pointer"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Change Role */}
      {modalType === 'role' && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/45 backdrop-blur-xs animate-in fade-in"
            onClick={() => { setModalType(null); setSelectedUser(null); }}
          />
          <div className="relative z-10 w-[440px] max-w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-6.5 animate-in zoom-in-95">
            <h2 className="text-lg font-extrabold text-[var(--ink)] tracking-tight mb-1">Change Role</h2>
            <p className="text-xs font-medium text-[var(--muted)] mb-4">Update permissions for {selectedUser.name}.</p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-[var(--muted)]">Current role:</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold ${ROLE_STYLES[selectedUser.role]?.bg} ${ROLE_STYLES[selectedUser.role]?.fg}`}>
                {selectedUser.role}
              </span>
            </div>

            <label className="flex flex-col gap-1.5 mb-4">
              <span className="text-xs font-bold text-[var(--ink)]">New role</span>
              <select 
                value={editRole}
                onChange={(e) => setEditRole(e.target.value as UserRole)}
                className="h-10 px-3 rounded-lg border-1.5 border-[var(--border)] bg-[var(--input)] text-xs text-[var(--ink)] outline-none cursor-pointer"
              >
                <option value="Marketing">Marketing</option>
                <option value="Procurement">Procurement</option>
                <option value="Admin">Admin</option>
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
            </label>

            {/* SuperAdmin warning box */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FDF3DA] border border-[#EFD9A0] mb-5">
              <AlertTriangle className="w-4 h-4 text-[#8A6100] shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-[#8A6100] leading-snug">
                This action requires SuperAdmin permission
              </span>
            </div>

            <div className="flex justify-end gap-2.5">
              <button 
                onClick={() => { setModalType(null); setSelectedUser(null); }}
                className="h-10 px-5 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] text-xs font-semibold text-[var(--ink)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveRoleChange}
                className="h-10 px-5.5 rounded-full bg-[#FADF01] hover:bg-[#EDD400] text-xs font-bold text-[#16160F] shadow-sm transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Deactivate */}
      {modalType === 'deactivate' && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/45 backdrop-blur-xs animate-in fade-in"
            onClick={() => { setModalType(null); setSelectedUser(null); }}
          />
          <div className="relative z-10 w-[420px] max-w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-6.5 animate-in zoom-in-95">
            <h2 className="text-lg font-extrabold text-[var(--ink)] tracking-tight mb-2.5">
              Deactivate {selectedUser.name}?
            </h2>
            <p className="text-xs font-medium text-[var(--muted)] leading-relaxed mb-5">
              They will no longer be able to log in, but their history and assigned records will be preserved.
            </p>

            <div className="flex justify-end gap-2.5">
              <button 
                onClick={() => { setModalType(null); setSelectedUser(null); }}
                className="h-10 px-5 rounded-full border border-[var(--border)] bg-[var(--card)] hover:border-[var(--ink)] text-xs font-semibold text-[var(--ink)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDeactivate}
                className="h-10 px-5.5 rounded-full bg-[#D4373A] hover:bg-[#BC2F32] text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
