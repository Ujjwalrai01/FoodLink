// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { CheckCircle, XCircle, Clock, TrendingUp, AlertCircle, FileText } from 'lucide-react';
// import Navbar from '../../components/Navbar';
// import AnalyticsCard from '../../components/AnalyticsCard';
// import { setPendingVerifications, setStats } from '../../features/verifySlice';
// import { showToast } from '../../components/NotificationToast';

// function VerifierDashboard() {
//   const { pendingVerifications, stats } = useSelector(state => state.verify);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setStats({
//       pending: 8,
//       approved: 45,
//       rejected: 3,
//       thisWeek: 14,
//     }));

//     dispatch(setPendingVerifications([
//       {
//         id: '1',
//         type: 'ngo',
//         name: 'Help India Foundation',
//         email: 'contact@helpindia.org',
//         documents: ['GST Certificate', 'Registration'],
//         submittedAt: '2 hours ago',
//         priority: 'high'
//       },
//       {
//         id: '2',
//         type: 'business',
//         name: 'Fresh Bites Restaurant',
//         email: 'owner@freshbites.com',
//         documents: ['FSSAI License', 'Business Reg'],
//         submittedAt: '5 hours ago',
//         priority: 'medium'
//       },
//       {
//         id: '3',
//         type: 'ngo',
//         name: 'Community Care Trust',
//         email: 'info@commcare.org',
//         documents: ['Trust Deed', '12A Certificate'],
//         submittedAt: '1 day ago',
//         priority: 'low'
//       },
//     ]));
//   }, [dispatch]);

//   const handleApprove = (id, name) => {
//     showToast(`${name} has been approved successfully!`, 'success');
//     // dispatch(approveVerification(id));
//   };

//   const handleReject = (id, name) => {
//     showToast(`${name} has been rejected.`, 'error');
//     // dispatch(rejectVerification(id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Verifier Dashboard
//           </h1>
//           <p className="text-gray-600">Review and approve organization verifications</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <AnalyticsCard
//             title="Pending Reviews"
//             value={stats.pending}
//             icon={Clock}
//             color="accent"
//             subtitle="Awaiting verification"
//           />
//           <AnalyticsCard
//             title="Approved"
//             value={stats.approved}
//             icon={CheckCircle}
//             color="primary"
//             subtitle="Total approved"
//           />
//           <AnalyticsCard
//             title="Rejected"
//             value={stats.rejected}
//             icon={XCircle}
//             color="red"
//             subtitle="Total rejected"
//           />
//           <AnalyticsCard
//             title="This Week"
//             value={stats.thisWeek}
//             icon={TrendingUp}
//             color="secondary"
//             subtitle="Verifications completed"
//           />
//         </div>

//         {/* Pending Verifications List */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Pending Verifications</h2>
//           <div className="space-y-4">
//             {pendingVerifications.map(verification => (
//               <div key={verification.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-3 mb-2">
//                       <h3 className="text-xl font-bold text-gray-900">{verification.name}</h3>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         verification.type === 'ngo' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
//                       }`}>
//                         {verification.type.toUpperCase()}
//                       </span>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         verification.priority === 'high' ? 'bg-red-100 text-red-800' :
//                         verification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
//                         'bg-gray-100 text-gray-800'
//                       }`}>
//                         {verification.priority.toUpperCase()} PRIORITY
//                       </span>
//                     </div>
//                     <p className="text-gray-600 mb-2">{verification.email}</p>
//                     <p className="text-sm text-gray-500">Submitted {verification.submittedAt}</p>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <h4 className="text-sm font-semibold text-gray-700 mb-2">Documents Submitted:</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {verification.documents.map((doc, index) => (
//                       <span key={index} className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg text-sm">
//                         <FileText className="w-4 h-4 text-gray-600" />
//                         <span>{doc}</span>
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={() => handleApprove(verification.id, verification.name)}
//                     className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
//                   >
//                     <CheckCircle className="w-5 h-5" />
//                     <span>Approve</span>
//                   </button>
//                   <button
//                     onClick={() => handleReject(verification.id, verification.name)}
//                     className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center space-x-2"
//                   >
//                     <XCircle className="w-5 h-5" />
//                     <span>Reject</span>
//                   </button>
//                   <button className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
//                     <AlertCircle className="w-5 h-5" />
//                     <span>Flag</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {pendingVerifications.length === 0 && (
//             <div className="bg-white rounded-2xl shadow-md p-12 text-center">
//               <p className="text-gray-600">No pending verifications at the moment.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VerifierDashboard;



import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CheckCircle, XCircle, Clock, TrendingUp, AlertCircle, FileText } from 'lucide-react'
import Navbar from '../../components/Navbar'
import AnalyticsCard from '../../components/AnalyticsCard'
import { setPendingVerifications, setStats } from '../../features/verifySlice'
import { showToast } from '../../components/NotificationToast'

function VerifierDashboard() {
  const { user } = useSelector((state) => state.auth)
  const { pendingVerifications, stats } = useSelector((state) => state.verify)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setStats({
      pending: 8,
      approved: 45,
      rejected: 3,
      thisWeek: 14,
    }))

    dispatch(setPendingVerifications([
      {
        id: '1',
        type: 'ngo',
        name: 'Help India Foundation',
        email: 'contact@helpindia.org',
        documents: ['GST Certificate', 'Registration'],
        submittedAt: '2 hours ago',
        priority: 'high'
      },
      {
        id: '2',
        type: 'business',
        name: 'Fresh Bites Restaurant',
        email: 'owner@freshbites.com',
        documents: ['FSSAI License', 'Business Reg'],
        submittedAt: '5 hours ago',
        priority: 'medium'
      },
      {
        id: '3',
        type: 'ngo',
        name: 'Community Care Trust',
        email: 'info@commcare.org',
        documents: ['Trust Deed', '12A Certificate'],
        submittedAt: '1 day ago',
        priority: 'low'
      },
    ]))
  }, [dispatch])

  const handleApprove = (id, name) => {
    showToast(`${name} has been approved successfully!`, 'success')
    // dispatch(approveVerification(id))
  }

  const handleReject = (id, name) => {
    showToast(`${name} has been rejected.`, 'error')
    // dispatch(rejectVerification(id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verifier Dashboard
          </h1>
          <p className="text-gray-600">Review and approve organization verifications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            title="Pending Reviews"
            value={stats.pending}
            icon={Clock}
            color="accent"
            subtitle="Awaiting verification"
          />
          <AnalyticsCard
            title="Approved"
            value={stats.approved}
            icon={CheckCircle}
            color="primary"
            subtitle="Total approved"
          />
          <AnalyticsCard
            title="Rejected"
            value={stats.rejected}
            icon={XCircle}
            color="red"
            subtitle="Total rejected"
          />
          <AnalyticsCard
            title="This Week"
            value={stats.thisWeek}
            icon={TrendingUp}
            color="secondary"
            subtitle="Verifications completed"
          />
        </div>

        {/* Pending Verifications */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pending Verifications</h2>
          <div className="space-y-4">
            {pendingVerifications.map((verification) => (
              <div key={verification.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{verification.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        verification.type === 'ngo' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {verification.type.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        verification.priority === 'high' ? 'bg-red-100 text-red-800' :
                        verification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {verification.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{verification.email}</p>
                    <p className="text-sm text-gray-500">Submitted {verification.submittedAt}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Documents Submitted:</h4>
                  <div className="flex flex-wrap gap-2">
                    {verification.documents.map((doc, index) => (
                      <span key={index} className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg text-sm">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span>{doc}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleApprove(verification.id, verification.name)}
                    className="flex-1 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(verification.id, verification.name)}
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Reject</span>
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Flag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {pendingVerifications.length === 0 && (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
              <p className="text-gray-600">No pending verifications at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifierDashboard
