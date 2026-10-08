export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-2">TeamSheet</h1>
                <p className="text-gray-500 mb-8">Football session management</p>

                <div className="flex flex-col gap-3 w-64 mx-auto">
                    <a 
                        href="/login"
                        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                    >
                        Login
                    </a>
                    <a 
                        href="/register"
                        className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
                    >
                        Register
                    </a>
                </div>
            </div>
        </div>
    );
}