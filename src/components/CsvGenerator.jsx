import React, { useState } from 'react';

const CsvGenerator = () => {
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [filePath, setFilePath] = useState('');
    const [error, setError] = useState('');

    const sendRequest = async () => {
        setLoading(true);
        setError('');
        setFilePath('');

        try {
            const response = await fetch("https://flask-csv-generator-backend.vercel.app/csv_generator", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: userInput })
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.text();
            setFilePath(data);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        const csvText = filePath;
        const blob = new Blob([csvText], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        a.click();

        URL.revokeObjectURL(url);
      };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">CSV Generator</h1>
                
                <textarea
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type in your request"
                    className="w-full border px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={sendRequest}
                    disabled={loading || userInput.trim() === ''}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? 'Generating...' : 'Send'}
                </button>

                {loading && (
                    <div className="flex justify-center mt-4">
                        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {filePath && !loading && (
                    <div className="mt-4 text-center">
                        <button
                            className="text-blue-600 hover:underline"
                            onClick={handleDownload}>
                            Download File
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mt-4 text-center text-red-600">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CsvGenerator;