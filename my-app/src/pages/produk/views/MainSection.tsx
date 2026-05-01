import { useRouter } from "next/router";

const MainSection = () => {
  const { push } = useRouter();

  const handleLogout = () => {
    // Hapus data login dari localStorage
    localStorage.removeItem("isLogin");
    // Redirect ke halaman login
    push("/auth/login");
  };

  return (
    <div className="py-10 px-5 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-5 text-gray-800">
          Selamat Datang di Halaman Produk!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Jelajahi koleksi produk terbaik kami
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="border border-gray-300 rounded-lg p-5 text-center bg-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-40 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Produk {item}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Nama Produk {item}</h3>
            <p className="text-gray-600 mb-4">Rp 100.000</p>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200">
              Lihat Detail
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleLogout}
          className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-semibold text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MainSection;
