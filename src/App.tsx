import React, { useState } from 'react';
import type { NavTab, Donor, ApprovalRecord, TaskItem, TimelineItem, EmailMessage, EmailAttachment } from '@/types/crm';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { SideRail } from '@/components/layout/SideRail';
import { DashboardPage } from '@/pages/DashboardPage';
import { DonorsPage } from '@/pages/DonorsPage';
import { DonorDetailPage } from '@/pages/DonorDetailPage';
import { ApprovalsPage } from '@/pages/ApprovalsPage';
import { TasksPage } from '@/pages/TasksPage';
import { LogInteractionModal } from '@/components/modals/LogInteractionModal';
import { NewTaskModal } from '@/components/modals/NewTaskModal';
import { EmailDrawer } from '@/components/modals/EmailDrawer';
import { 
  INITIAL_DONORS, 
  INITIAL_APPROVALS, 
  INITIAL_TASKS, 
  INITIAL_TIMELINE, 
  INITIAL_EMAILS, 
  INITIAL_EMAIL_ATTACHMENTS 
} from '@/data/mockData';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('Dashboard');
  const [selectedDonorId, setSelectedDonorId] = useState<string>('foodcorp-sa');
  const [isDetailView, setIsDetailView] = useState(false);

  // Core Data States
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
  const [approvals, setApprovals] = useState<ApprovalRecord[]>(INITIAL_APPROVALS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [timeline, setTimeline] = useState<TimelineItem[]>(INITIAL_TIMELINE);
  const [emails, setEmails] = useState<EmailMessage[]>(INITIAL_EMAILS);
  const [attachments] = useState<EmailAttachment[]>(INITIAL_EMAIL_ATTACHMENTS);

  // Layout & Modal States
  const [railOpen, setRailOpen] = useState(true);
  const [emailDrawerOpen, setEmailDrawerOpen] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [logModalTargetDonor, setLogModalTargetDonor] = useState<string>('FoodCorp SA');
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const selectedDonor = donors.find((d) => d.id === selectedDonorId) || donors[0];
  const pendingApprovalsCount = approvals.filter((a) => a.state === 'Pending').length;

  // Handlers
  const handleNavigateToDonor = (id: string) => {
    setSelectedDonorId(id);
    setIsDetailView(true);
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

  return (
    <div className="h-screen flex flex-col bg-[var(--page)] text-[var(--ink)] overflow-hidden">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'Donors' && isDetailView) {
            // Keep detail view if clicking Donors tab while on detail
          } else {
            setIsDetailView(false);
          }
        }}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Main Body */}
      <div className="flex-1 flex min-h-0">
        <SideRail isOpen={railOpen} onToggle={() => setRailOpen(!railOpen)} />

        {/* Dynamic Route View */}
        {activeTab === 'Dashboard' && (
          <DashboardPage
            onNewDonorClick={() => setNewTaskModalOpen(true)}
            onNavigateToDonor={handleNavigateToDonor}
          />
        )}

        {activeTab === 'Donors' && !isDetailView && (
          <DonorsPage
            donors={donors}
            onNewDonorClick={() => setNewTaskModalOpen(true)}
            onSelectDonor={(id) => {
              setSelectedDonorId(id);
              setIsDetailView(true);
            }}
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

        {(activeTab === 'Reports' || activeTab === 'Users') && (
          <main className="flex-1 min-w-0 overflow-y-auto p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--icon-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--muted2)] mb-4 text-xl font-extrabold">
              {activeTab[0]}
            </div>
            <h2 className="text-xl font-extrabold text-[var(--ink)] mb-2">
              {activeTab} Module
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-sm font-medium">
              This module is included in the full CRM suite. Navigate to Dashboard, Donors, Tasks, or Approvals to explore live demo screens.
            </p>
          </main>
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
