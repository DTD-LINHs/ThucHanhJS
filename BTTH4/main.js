// Khai báo mảng chứa danh sách link ảnh
var images = [
    "https://picsum.photos/id/10/600/350",
    "https://picsum.photos/id/11/600/350",
    "https://picsum.photos/id/12/600/350",
    "https://picsum.photos/id/13/600/350"
];

// Biến lưu trữ vị trí ảnh đang hiển thị hiện tại
var currentIndex = 0;

// Lấy các phần tử DOM
var sliderImg = document.getElementById('slider-img');
var btnPrev = document.getElementById('btn-prev');
var btnNext = document.getElementById('btn-next');
var dotsContainer = document.getElementById('dots-container');

// Hàm hiển thị ảnh và cập nhật chấm tròn dựa vào currentIndex
function updateSlider() {
    // Thay đổi thuộc tính src của thẻ img
    sliderImg.setAttribute('src', images[currentIndex]);
    
    // Cập nhật lại trạng thái active của các chấm tròn
    var dots = document.getElementsByClassName('dot');
    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    dots[currentIndex].classList.add('active');
}

// Tạo các dấu chấm tròn tự động dựa vào số lượng ảnh trong mảng
function createDots() {
    for (var i = 0; i < images.length; i++) {
        var dot = document.createElement('span');
        dot.classList.add('dot');
        
        // Click vào chấm nào thì nhảy đến ảnh đó
        dot.addEventListener('click', (function(index) {
            return function() {
                currentIndex = index;
                updateSlider();
            }
        })(i));
        
        dotsContainer.appendChild(dot);
    }
}

// Xử lý sự kiện khi bấm nút "Sau"
btnNext.addEventListener('click', function() {
    currentIndex++;
    // Nếu vượt quá ảnh cuối cùng thì quay về ảnh đầu tiên
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateSlider();
});

// Xử lý sự kiện khi bấm nút "Trước"
btnPrev.addEventListener('click', function() {
    currentIndex--;
    // Nếu lùi quá ảnh đầu tiên thì nhảy đến ảnh cuối cùng
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    updateSlider();
});

// Chế độ tự động chuyển ảnh sau mỗi 3 giây
// Hàm setInterval sẽ tự động kích hoạt hành động bấm nút Next sau 3000ms
setInterval(function() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateSlider();
}, 3000);

// Khởi chạy ứng dụng lần đầu
createDots();
updateSlider();