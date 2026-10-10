# Lab 3: NextJS + Express

Chỉ thực hiện phần bắt buộc: GET, POST, DELETE sản phẩm, CORS, Axios và toast.

## Chạy bài lab

Terminal 1:

```powershell
cd E:\LAB3\fullstack-shop\backend
npm.cmd install
npm.cmd start
```

Terminal 2:

```powershell
cd E:\LAB3\fullstack-shop\frontend
npm.cmd install
npm.cmd run dev
```

Mở http://localhost:3000/products. Backend chạy tại http://localhost:5000.

## Kiểm tra theo đề

- Thêm sản phẩm: dữ liệu xuất hiện trong danh sách, có toast thành công.
- Xóa: hủy xác nhận thì giữ nguyên; đồng ý thì sản phẩm biến mất không cần F5, có toast.
- Dừng backend rồi thao tác để kiểm tra toast lỗi; chạy lại backend sau khi kiểm tra.
- CORS (trang 3 PDF): tạm bỏ `app.use(cors(...))` trong server.js, khởi động lại backend, mở Console trình duyệt và tải lại trang để chụp lỗi. Khôi phục middleware CORS và khởi động lại backend sau khi chụp.
- Kiểm tra Network: GET 200, POST 201, DELETE 200; DELETE ID không tồn tại trả 404.

Dữ liệu lưu trong RAM theo đề, trở về hai sản phẩm mẫu khi backend khởi động lại. Chưa thực hiện phần bonus.
