const LS_KEY = 'velour_products';

const defaultProducts = [
  {
    ma: 'SP001', ten: 'Áo thun oversize linen',
    danhMuc: 'thoi-trang', gia: 220000, soLuong: 85,
    nhan: 'MOI',
    anh: 'img/ao_thun.jpg'
  },
  {
    ma: 'SP002', ten: 'Quần linen wide-leg',
    danhMuc: 'thoi-trang', gia: 480000, soLuong: 60,
    nhan: 'HOT',
    anh: 'img/quan.jpg'
  },
  {
    ma: 'SP003', ten: 'Giày mule da bò',
    danhMuc: 'giay-dep', gia: 950000, soLuong: 30,
    nhan: '',
    anh: 'img/cao_got.jpg'
  },
  {
    ma: 'SP004', ten: 'Túi tote washed canvas',
    danhMuc: 'tui-xach', gia: 185000, soLuong: 120,
    nhan: 'MOI',
    anh: 'img/tui_tote.jpg'
  },
  {
    ma: 'SP005', ten: 'Mũ bucket vải ripstop',
    danhMuc: 'phu-kien', gia: 120000, soLuong: 200,
    nhan: '',
    anh: 'img/mu.jpg'
  },
  {
    ma: 'SP006', ten: 'Vòng tay đan thủ công',
    danhMuc: 'phu-kien', gia: 95000, soLuong: 8,
    nhan: '',
    anh: 'img/vong_tay.jpg'
  },
  {
    ma: 'SP007', ten: 'Giày sneaker suede xanh',
    danhMuc: 'giay-dep', gia: 1250000, soLuong: 45,
    nhan: 'HOT',
    anh: 'img/giay.jpg'
  },
  {
    ma: 'SP008', ten: 'Áo khoác denim vintage',
    danhMuc: 'thoi-trang', gia: 680000, soLuong: 22,
    nhan: '',
    anh: 'img/ao_khoac.jpg'
  },
  {
    ma: 'SP009', ten: 'Túi đeo chéo da thật',
    danhMuc: 'tui-xach', gia: 1450000, soLuong: 15,
    nhan: 'HOT',
    anh: 'img/tui_deo_cheo.jpg'
  },
  {
    ma: 'SP010', ten: 'Kính mắt gọng tròn',
    danhMuc: 'phu-kien', gia: 340000, soLuong: 0,
    nhan: '',
    anh: 'img/kinh_mat.jpg'
  }
];

// Helpers localStorage
function getProducts() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function saveProducts(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function initStorage() {
  if (!getProducts()) saveProducts(defaultProducts);
}

// State
let currentCat = 'all';
let searchQuery = '';
let editingMa   = null;   // null = thêm mới, string = sửa

// Render
const catLabel = {
  'thoi-trang': 'Thời trang',
  'giay-dep'  : 'Giày dép',
  'tui-xach'  : 'Túi xách',
  'phu-kien'  : 'Phụ kiện'
};

function formatPrice(n) {
  return n.toLocaleString('vi-VN') + ' ₫';
}

function stockLabel(sl) {
  if (sl === 0) return '<span class="card-stock out">Hết hàng</span>';
  if (sl <= 10) return `<span class="card-stock low">Còn ${sl}</span>`;
  return `<span class="card-stock">Còn ${sl}</span>`;
}

function renderCard(p, index) {
  const badge = p.nhan
    ? `<span class="badge badge-${p.nhan}">${p.nhan === 'MOI' ? 'MỚI' : p.nhan}</span>`
    : '';

  const imgContent = p.anh
    ? `<img src="${p.anh}" alt="${p.ten}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const placeholder = `<div class="img-placeholder" style="${p.anh ? 'display:none' : ''}">👕</div>`;

  return `
    <div class="card" style="animation-delay:${index * 0.04}s" data-ma="${p.ma}">
      <div class="card-img-wrap">
        ${imgContent}${placeholder}
        ${badge}
        <button class="card-wish" title="Yêu thích">♡</button>
      </div>
      <div class="card-body">
        <div class="card-cat">${catLabel[p.danhMuc] || p.danhMuc}</div>
        <div class="card-name">${p.ten}</div>
        <div class="card-code">#${p.ma}</div>
        <div class="card-footer">
          <span class="card-price">${formatPrice(p.gia)}</span>
          ${stockLabel(p.soLuong)}
        </div>
        <div class="card-actions">
          <button class="btn-edit" data-ma="${p.ma}">✏ Sửa</button>
          <button class="btn-delete" data-ma="${p.ma}">🗑 Xóa</button>
        </div>
      </div>
    </div>`;
}

function renderGrid() {
  const grid  = document.getElementById('productGrid');
  const empty = document.getElementById('emptyState');
  let list = getProducts();

  if (currentCat !== 'all') {
    list = list.filter(p => p.danhMuc === currentCat);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.ten.toLowerCase().includes(q) ||
      p.ma.toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    grid.innerHTML = list.map((p, i) => renderCard(p, i)).join('');
  }

  // Event delegation cho nút Sửa / Xóa / Tim
  grid.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.ma));
  });
  grid.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteProduct(btn.dataset.ma));
  });
  grid.querySelectorAll('.card-wish').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    });
  });
}


// Modal
const overlay   = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const fMa       = document.getElementById('fMa');
const fTen      = document.getElementById('fTen');
const fDanhMuc  = document.getElementById('fDanhMuc');
const fGia      = document.getElementById('fGia');
const fSoLuong  = document.getElementById('fSoLuong');
const fAnh      = document.getElementById('fAnh');
const fNhan     = document.getElementById('fNhan');

function openModal(ma = null) {
  editingMa = ma;

  if (ma) {
    // Sửa
    const p = getProducts().find(x => x.ma === ma);
    if (!p) return;
    modalTitle.textContent = 'Sửa sản phẩm';
    fMa.value = p.ma; fMa.disabled = true;
    fTen.value = p.ten;
    fDanhMuc.value = p.danhMuc;
    fGia.value = p.gia;
    fSoLuong.value = p.soLuong;
    fAnh.value = p.anh || '';
    fNhan.value = p.nhan || '';
  } else {
    // Thêm mới
    modalTitle.textContent = 'Thêm sản phẩm';
    fMa.value = ''; fMa.disabled = false;
    fTen.value = ''; fDanhMuc.value = 'thoi-trang';
    fGia.value = ''; fSoLuong.value = '';
    fAnh.value = ''; fNhan.value = '';
  }

  overlay.classList.add('open');
}

function closeModal() {
  overlay.classList.remove('open');
  editingMa = null;
}


// CRUD
function saveProduct() {
  const ma       = fMa.value.trim();
  const ten      = fTen.value.trim();
  const danhMuc  = fDanhMuc.value;
  const gia      = parseInt(fGia.value);
  const soLuong  = parseInt(fSoLuong.value);
  const anh      = fAnh.value.trim();
  const nhan     = fNhan.value;

  // Validation
  if (!ma)               return alert('Vui lòng nhập mã sản phẩm.');
  if (!ten)              return alert('Vui lòng nhập tên sản phẩm.');
  if (isNaN(gia) || gia < 0)      return alert('Đơn giá không hợp lệ.');
  if (isNaN(soLuong) || soLuong < 0) return alert('Số lượng không hợp lệ.');

  let list = getProducts();

  if (editingMa) {
    // Cập nhật
    list = list.map(p => p.ma === editingMa
      ? { ...p, ten, danhMuc, gia, soLuong, anh, nhan }
      : p
    );
    showToast('✅ Đã cập nhật sản phẩm!');
  } else {
    // Kiểm tra trùng mã
    if (list.some(p => p.ma === ma)) return alert(`Mã "${ma}" đã tồn tại.`);
    list.push({ ma, ten, danhMuc, gia, soLuong, anh, nhan });
    showToast('✅ Đã thêm sản phẩm mới!');
  }

  saveProducts(list);
  closeModal();
  renderGrid();
}

function deleteProduct(ma) {
  if (!confirm(`Xóa sản phẩm #${ma}?`)) return;
  const list = getProducts().filter(p => p.ma !== ma);
  saveProducts(list);
  showToast('🗑 Đã xóa sản phẩm.');
  renderGrid();
}

// Toast
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// Filter&Search
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    renderGrid();
  });
});

document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  renderGrid();
});

// Modal events
document.getElementById('btnOpenModal').addEventListener('click', () => openModal());
document.getElementById('btnCloseModal').addEventListener('click', closeModal);
document.getElementById('btnCancel').addEventListener('click', closeModal);
document.getElementById('btnSave').addEventListener('click', saveProduct);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

// Đóng modal bằng Esc
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Init
initStorage();
renderGrid();
