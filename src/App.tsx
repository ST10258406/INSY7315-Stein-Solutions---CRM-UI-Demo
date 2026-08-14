import React, { useState } from 'react';
import type { NavTab, Donor, ApprovalRecord, TaskItem, TimelineItem, EmailMessage, EmailAttachment, UserAccount, UserRole } from '@/types/crm';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { SideRail } from '@/components/layout/SideRail';
import { DashboardPage } from '@/pages/DashboardPage';
import { DonorsPage } from '@/pages/DonorsPage';
import { DonorDetailPage } from '@/pages/DonorDetailPage';
import { ApprovalsPage } from '@/pages/ApprovalsPage';
import { TasksPage } from '@/pages/TasksPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { UsersPage } from '@/pages/UsersPage';
import { NewDonorPage } from '@/pages/NewDonorPage';
import { PublicOnboardingPage } from '@/pages/PublicOnboardingPage';
import { LogInteractionModal } from '@/components/modals/LogInteractionModal';
import { NewTaskModal } from '@/components/modals/NewTaskModal';
import { EmailDrawer } from '@/components/modals/EmailDrawer';
import { 
  INITIAL_DONORS, 
  INITIAL_APPROVALS, 
  INITIAL_TASKS, 
  INITIAL_TIMELINE, 
  INITIAL_EMAILS, 
  INITIAL_EMAIL_ATTACHMENTS,
  INITIAL_USERS
} from '@/data/mockData';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('Dashboard');
  const [selectedDonorId, setSelectedDonorId] = useState<string>('foodcorp-sa');
  const [isDetailView, setIsDetailView] = useState(false);
  const [viewMode, setViewMode] = useState<'crm' | 'new-donor' | 'public-onboarding'>('crm');

  // Core Data States
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
  const [approvals, setApprovals] = useState<ApprovalRecord[]>(INITIAL_APPROVALS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [timeline, setTimeline] = useState<TimelineItem[]>(INITIAL_TIMELINE);
  const [emails, setEmails] = useState<EmailMessage[]>(INITIAL_EMAILS);
  const [attachments] = useState<EmailAttachment[]>(INITIAL_EMAIL_ATTACHMENTS);
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);

  const handleAddUser = (newUser: UserAccount) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleUpdateUserRole = (id: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  const handleToggleUserActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  // Layout & Modal States
  const [railOpen, setRailOpen] = useState(true);
  const [emailDrawerOpen, setEmailDrawerOpen] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [logModalTargetDonor, setLogModalTargetDonor] = useState<string>('FoodCorp SA');
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const handleOpenNewDonor = () => {
    setViewMode('new-donor');
  };

  const handleSaveDonorFromPage = (donorData: Partial<Donor>) => {
    const created: Donor = {
      id: donorData.id || `donor_${Date.now()}`,
      name: donorData.name || 'New Donor Organisation',
      tradingName: donorData.tradingName || donorData.name,
      type: donorData.type || 'Manufacturer',
      status: donorData.status || 'Pending Review',
      manager: donorData.manager || 'Nomsa Khumalo',
      regions: donorData.regions || ['JHB'],
      donationTypes: donorData.donationTypes || ['Dry Goods'],
      frequency: donorData.frequency || 'Weekly',
      lastInteraction: 'Just created',
      lastInteractionType: 'note',
      followUpDate: '28 Aug 2026',
      overdue: false,
      ...donorData,
    } as Donor;

    const newApproval: ApprovalRecord = {
      id: `s_${Date.now()}`,
      name: created.name,
      type: created.type,
      regions: created.regions.join(' · '),
      source: 'Manual Capture',
      requester: 'Keegan Roux',
      submittedAgo: 'just now',
      state: 'Pending',
    };

    setDonors((prev) => [created, ...prev]);
    setApprovals((prev) => [newApproval, ...prev]);
    setViewMode('crm');
    setActiveTab('Donors');
  };

  const selectedDonor = donors.find((d) => d.id === selectedDonorId) || donors[0];
  const pendingApprovalsCount = approvals.filter((a) => a.state === 'Pending').length;

  // Handlers
  const handleNavigateToDonor = (id: string) => {
    setSelectedDonorId(id);
    setIsDetailView(true);
    setViewMode('crm');
    setActiveTab('Donors');
  };

  const handleApproveSubmission = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, state: 'Approved', approvedBy: 'Keegan Roux', decidedWhen: 'just now' }
          : a
      )
    );
  };

  const handleRejectSubmission = (id: string, reason: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, state: 'Rejected', approvedBy: 'Keegan Roux', decidedWhen: 'just now', rejectionReason: reason }
          : a
      )
    );
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const isDoneNow = !t.done;
          return {
            ...t,
            done: isDoneNow,
            doneOn: isDoneNow ? 'just now' : undefined,
            doneBy: isDoneNow ? 'Keegan Roux' : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleCreateTask = (newTaskData: {
    donor: string;
    title: string;
    desc: string;
    assignedTo: string;
    due: string;
  }) => {
    const newTask: TaskItem = {
      id: `t_${Date.now()}`,
      title: newTaskData.title,
      desc: newTaskData.desc,
      donor: newTaskData.donor,
      due: newTaskData.due,
      overdue: false,
      by: newTaskData.assignedTo,
      done: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleSaveInteraction = (type: string, subject: string, body: string) => {
    const newTimelineItem: TimelineItem = {
      id: `tm_${Date.now()}`,
      type: type as TimelineItem['type'],
      subject,
      body,
      author: 'Keegan Roux',
      ago: 'just now',
    };
    setTimeline((prev) => [newTimelineItem, ...prev]);
  };

  const handleSendEmail = (subject: string, body: string) => {
    const newEmail: EmailMessage = {
      id: Date.now(),
      sender: 'Keegan Roux',
      initials: 'KR',
      avatarBg: '#2E5A78',
      age: 'just now',
      subject,
      body,
    };
    setEmails((prev) => [...prev, newEmail]);
  };

  // If viewing standalone Public Onboarding Form
  if (viewMode === 'public-onboarding') {
    return (
      <PublicOnboardingPage
        onClose={() => setViewMode('crm')}
        onSubmitSuccess={() => {
          // Add public application to approvals
          const publicApproval: ApprovalRecord = {
            id: `s_${Date.now()}`,
            name: 'Fresh Fields Wholesale',
            type: 'Manufacturer',
            regions: 'CPT · EC',
            source: 'Public Form',
            requester: null,
            submittedAgo: 'just now',
            state: 'Pending',
          };
          setApprovals((prev) => [publicApproval, ...prev]);
        }}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--page)] text-[var(--ink)] overflow-hidden">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setViewMode('crm');
          if (tab === 'Donors' && isDetailView) {
            // Keep detail view
          } else {
            setIsDetailView(false);
          }
        }}
        pendingApprovalsCount={pendingApprovalsCount}
        onOpenPublicForm={() => setViewMode('public-onboarding')}
      />

      {/* Main Body */}
      <div className="flex-1 flex min-h-0">
        <SideRail isOpen={railOpen} onToggle={() => setRailOpen(!railOpen)} />

        {/* Dynamic Route View */}
        {viewMode === 'new-donor' ? (
          <NewDonorPage
            onBack={() => setViewMode('crm')}
            onSave={handleSaveDonorFromPage}
          />
        ) : (
          <>
            {activeTab === 'Dashboard' && (
              <DashboardPage
                onNewDonorClick={handleOpenNewDonor}
                onNavigateToDonor={handleNavigateToDonor}
              />
            )}

            {activeTab === 'Donors' && !isDetailView && (
              <DonorsPage
                donors={donors}
                onNewDonorClick={handleOpenNewDonor}
                onPreviewOnboardingClick={() => setViewMode('public-onboarding')}
                onSelectDonor={(id) => {
                  setSelectedDonorId(id);
                  setIsDetailView(true);
                }}
                onEditDonorClick={() => setViewMode('new-donor')}
                onLogInteractionClick={(name) => {
                  setLogModalTargetDonor(name);
                  setLogModalOpen(true);
                }}
              />
            )}

            {activeTab === 'Donors' && isDetailView && (
              <DonorDetailPage
                donor={selectedDonor}
                timeline={timeline}
                tasks={tasks.filter((t) => t.donor === selectedDonor.name || t.donor === 'FoodCorp SA')}
                onBack={() => setIsDetailView(false)}
                onOpenEmailDrawer={() => setEmailDrawerOpen(true)}
                onOpenLogModal={() => setLogModalOpen(true)}
                onToggleTask={handleToggleTask}
              />
            )}

            {activeTab === 'Approvals' && (
              <ApprovalsPage
                approvals={approvals}
                onApprove={handleApproveSubmission}
                onReject={handleRejectSubmission}
                onNavigateToDonor={handleNavigateToDonor}
              />
            )}

            {activeTab === 'Tasks' && (
              <TasksPage
                tasks={tasks}
                donors={donors}
                onToggleTask={handleToggleTask}
                onCreateTask={handleCreateTask}
                onNavigateToDonor={handleNavigateToDonor}
              />
            )}

            {activeTab === 'Reports' && <ReportsPage />}

            {activeTab === 'Users' && (
              <UsersPage
                users={users}
                onAddUser={handleAddUser}
                onUpdateUserRole={handleUpdateUserRole}
                onToggleUserActive={handleToggleUserActive}
              />
            )}
          </>
        )}
      </div>

      {/* Global Drawers & Modals */}
      <EmailDrawer
        isOpen={emailDrawerOpen}
        donorName={selectedDonor.name}
        contactName={selectedDonor.primaryContact?.name || 'Dineo Molefe'}
        contactEmail={selectedDonor.primaryContact?.email || 'dineo.molefe@foodcorpsa.co.za'}
        emails={emails}
        attachments={attachments}
        onClose={() => setEmailDrawerOpen(false)}
        onSendEmail={handleSendEmail}
      />

      <LogInteractionModal
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
        onSave={handleSaveInteraction}
      />

      <NewTaskModal
        isOpen={newTaskModalOpen}
        donors={donors}
        onClose={() => setNewTaskModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
