import { useRouter } from "next/router";

const HalamanKategori = () => {
  const { query } = useRouter();
  const slug = query.slug as string[] | undefined;

  return (
    <div>
      <h1>Halaman Kategori</h1>
      <p>Kategori: {slug ? slug.join(" / ") : "Semua Kategori"}</p>
      
      <h2>Parameter URL:</h2>
      {slug && slug.length > 0 ? (
        <ul>
          {slug.map((item, index) => (
            <li key={index}>
              Parameter {index + 1}: {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada parameter</p>
      )}
    </div>
  );
};

export default HalamanKategori;