import React, { useState, useEffect } from 'react';
import { Star, StarHalf } from 'lucide-react';

interface FeedbackItem {
  id: number;
  rating: number;
  comment: string;
  timestamp: string;
}

interface FeedbackStats {
  averageRating: number;
  totalFeedback: number;
}

const AdminDashboard = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<FeedbackStats>({
    averageRating: 0,
    totalFeedback: 0,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('https://studyapp-backend-w1jm.onrender.com/admin/feedback');
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      const data = await response.json() as FeedbackItem[];
      setFeedback(data);
      
      // Calculate statistics
      const average = data.reduce((acc: number, curr: FeedbackItem) => acc + curr.rating, 0) / data.length;
      setStats({
        averageRating: Number(average.toFixed(1)),
        totalFeedback: data.length,
      });
      
      setLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <Star
            key={i}
            className="inline w-4 h-4 text-yellow-400"
            fill="currentColor"
          />
        );
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(
          <StarHalf
            key={i}
            className="inline w-4 h-4 text-yellow-400"
            fill="currentColor"
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="inline w-4 h-4 text-gray-300"
          />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Feedback Dashboard
            </h2>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Average Rating
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stats.averageRating}
                <span className="ml-2">{renderStars(stats.averageRating)}</span>
              </dd>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Feedback
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stats.totalFeedback}
              </dd>
            </div>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {feedback.map((item: FeedbackItem) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderStars(item.rating)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.comment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;