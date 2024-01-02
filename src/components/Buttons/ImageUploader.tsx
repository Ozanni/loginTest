import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      // Chuyển đổi tệp hình ảnh thành chuỗi base64 để hiển thị trong ứng dụng
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {/* Nút Tải Ảnh */}
      <label style={{ cursor: 'pointer', display: 'inline-block', border: '1px solid #ccc', borderRadius: '5px' }}>
        Upload
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} style={{ display: 'none' }} />
      </label>
      {/* Hiển thị Ảnh đã Chọn */}
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          {/* Nút Xóa Ảnh */}
          <button onClick={handleImageRemove}>Xóa Ảnh</button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
