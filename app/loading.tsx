export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/SVG */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-red-600/20 rounded-full animate-ping" />
            <div className="absolute inset-4 border-4 border-red-600/40 rounded-full animate-pulse" />
            <div className="absolute inset-8 border-4 border-red-600 rounded-full animate-spin" />
            <div className="absolute inset-12 bg-red-600 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Loading Content
          </h2>
          <p className="text-gray-600">
            Please wait while we prepare your experience
          </p>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-linear-to-r from-red-600 to-red-400 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-red-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}