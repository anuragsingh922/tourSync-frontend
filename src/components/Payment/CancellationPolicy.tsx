import React from "react";

const CancellationPolicy: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Cancellation Policy
      </h2>
      <p className="text-gray-600 text-lg mb-6 text-center">
        We value transparency. Here’s how refunds are processed for
        cancellations:
      </p>
      <div className="space-y-4">
        <div className="flex items-start">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold mr-4">
            1
          </span>
          <p className="text-gray-700 text-base">
            <strong>Full refund:</strong> If cancelled{" "}
            <span className="font-medium">15+ days</span> prior to the trip
            date.
          </p>
        </div>
        <div className="flex items-start">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm font-semibold mr-4">
            2
          </span>
          <p className="text-gray-700 text-base">
            <strong>50% refund:</strong> If cancelled{" "}
            <span className="font-medium">7-14 days</span> prior to the trip
            date.
          </p>
        </div>
        <div className="flex items-start">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-semibold mr-4">
            3
          </span>
          <p className="text-gray-700 text-base">
            <strong>No refund:</strong> If cancelled less than{" "}
            <span className="font-medium">7 days</span> prior to the trip date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
