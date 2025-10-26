// Upload page for updating fitness data
// TODO: Add form validation improvements
// TODO: Add image compression before upload
// TODO: Add progress indicators for form submission

import React from 'react';
import UploadForm from '../components/UploadForm';

export default function UploadPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Upload Info</h1>
        <p className="text-neutral-600 mt-1">
          Update your progress and track your fitness journey
        </p>
      </div>

      {/* Upload Form */}
      <UploadForm />
    </div>
  );
}
