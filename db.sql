-- Membuat tabel User
CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL
);

-- Menambahkan data ke tabel User
INSERT INTO `user` (`username`, `password`) VALUES
('admin', 'admin1_rs');


-- Membuat tabel Pasien
CREATE TABLE `pasien` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(255) NOT NULL,
  `telp` VARCHAR(255) NOT NULL,
  `alamat` VARCHAR(255) NOT NULL,
  `jenisKelamin` VARCHAR(255) NOT NULL,
  `ruang` VARCHAR(255) NOT NULL,
  `penyakit` VARCHAR(255) NOT NULL
);

-- Menambahkan data ke tabel Pasien
INSERT INTO `pasien` (`nama`, `telp`, `alamat`, `jenisKelamin`, `ruang`, `penyakit`) VALUES
('John Doe', '081234567890', 'Jalan Mawar No. 1', 'Laki-laki', 'Ruang A', 'Flu'),
('Jane Doe', '081234567891', 'Jalan Melati No. 2', 'Perempuan', 'Ruang B', 'Demam'),
('Jim Beam', '081234567892', 'Jalan Anggrek No. 3', 'Laki-laki', 'Ruang C', 'Diabetes');

-- Membuat tabel Complaint
CREATE TABLE `komplain` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `aduan` VARCHAR(255) NOT NULL,
  `pasienId` INT,
  FOREIGN KEY (`pasienId`) REFERENCES `Pasien`(`id`) ON DELETE CASCADE
);

-- Menambahkan data ke tabel Complaint
INSERT INTO `komplain` (`aduan`, `pasienId`) VALUES
('Makanan terlalu asin', 1),
('Nasinya masih keras', 2);
