import React from 'react';

export default function ErrorBox({ error }) {
  return (
    <div
      role="alert"
      className="mt-8 p-4 bg-red-100 dark:bg-red-900 border border-red-500 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg shadow"
    >
      <p className="font-semibold">Error: {error}</p>
    </div>
  );
}