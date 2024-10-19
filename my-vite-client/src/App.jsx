import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      const res = await fetch('/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        throw new Error('Failed to generate content');
      }
      const data = await res.text();
      setResponse(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setResponse('');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="App min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 duration-300">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">AI Text Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-200 hover:shadow-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              'Generate Text'
            )}
          </button>
        </form>
        {response && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-green-800">Generated Text:</h2>
            <p className="mt-2 text-gray-700">{response}</p>
          </div>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default App;
