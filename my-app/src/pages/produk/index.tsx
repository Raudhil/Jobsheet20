import TampilanProduk from '../views/products'
import useSWR from 'swr'
import fetcher from '../utils/swr/fetcher'

const TampilanProdukPage = () => {
  const { data, error, isLoading } = useSWR('/api/produk', fetcher)

  return (
    <div>
      <h1 data-testid="title">Product Page</h1>
      <TampilanProduk
        products={isLoading ? [] : data?.data || []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export default TampilanProdukPage
