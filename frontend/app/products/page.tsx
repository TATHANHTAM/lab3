'use client';

import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from '@/lib/api';

type Product = { id: number; name: string; price: number };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>('/api/products');
      setProducts(response.data);
    } catch {
      toast.error('Không thể kết nối server!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void fetchProducts(); }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await api.post('/api/products', { name, price });
      setName('');
      setPrice('');
      toast.success('Thêm sản phẩm thành công!');
      await fetchProducts();
    } catch (error) {
      const message = axios.isAxiosError<{ error: string }>(error)
        ? error.response?.data?.error : undefined;
      toast.error(message || 'Không thể kết nối server!');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn chắc chắn muốn xoá?')) return;
    try {
      await api.delete(`/api/products/${id}`);
      setProducts((previous) => previous.filter((product) => product.id !== id));
      toast.success('Đã xoá sản phẩm');
    } catch {
      toast.error('Xoá thất bại, thử lại!');
      await fetchProducts();
    }
  };

  return (
    <main>
      <h1>Quản lý sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tên sản phẩm</label>
        <input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Tên SP" required />
        <label htmlFor="price">Giá (đ)</label>
        <input id="price" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Giá" type="number" min="1" required />
        <button type="submit" disabled={saving}>{saving ? 'Đang lưu...' : 'Thêm sản phẩm'}</button>
      </form>
      <h2>Danh sách sản phẩm</h2>
      {loading ? <p>Đang tải...</p> : products.length === 0 ? <p>Chưa có sản phẩm.</p> : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <span>{product.name} — {product.price.toLocaleString('vi-VN')}đ</span>
              <button className="delete" type="button" onClick={() => void handleDelete(product.id)}>Xoá</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
