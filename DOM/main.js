// MỤC 1: CÁC HÀM GỌI PHẦN TỬ DOM (SELECTORS)

// 1.1 Gọi bằng ID
var mainTitle = document.getElementById('main-title');
var myBox = document.getElementById('my-box');
var btnChange = document.getElementById('btn-change');
var btnToggle = document.getElementById('btn-toggle');

// 1.2 Gọi bằng Class Name
var paragraphs = document.getElementsByClassName('text-desc');

// 1.3 Gọi bằng Tên thẻ HTML
var allButtons = document.getElementsByTagName('button');

// Kiểm tra thử trên Tab Console (F12)
console.log("--- Kiểm tra các phần tử đã lấy ---");
console.log("Tiêu đề chính:", mainTitle);
console.log("Mảng các đoạn văn:", paragraphs);
console.log("Mảng tất cả nút bấm:", allButtons);



// MỤC 2: THAY ĐỔI NỘI DUNG, THUỘC TÍNH VÀ CSS

// 2.1 Thay đổi nội dung chữ của đoạn văn đầu tiên
paragraphs[0].textContent = "Đoạn văn này đã bị JS can thiệp và đổi nội dung!";

// 2.2 Thay đổi CSS trực tiếp qua thuộc tính .style
myBox.style.border = "3px dashed #f1c40f";


// MỤC 3: SỰ KIỆN TRONG JAVASCRIPT (EVENTS)

// SK1: Click chuột vào nút "Đổi nội dung & CSS"
btnChange.addEventListener('click', function() {
    // Thay đổi chữ tiêu đề
    mainTitle.innerHTML = "Zent Coding School - JS Module 03 🎉";
    
    // Thay đổi thuộc tính class bằng setAttribute (Mục thay đổi thuộc tính trong sách)
    mainTitle.setAttribute('class', 'highlight-title');
    
    // Thay đổi CSS và chữ của Hộp
    myBox.style.backgroundColor = '#ecc71'; // Đổi sang màu xanh lá
    myBox.textContent = "Đã thay đổi thành công!";
});


// SK2: Click chuột vào nút "Ẩn / Hiện Hộp"
btnToggle.addEventListener('click', function() {
    // classList.toggle sẽ tự động thêm class 'hidden' nếu chưa có, hoặc xóa đi nếu đã có
    myBox.classList.toggle('hidden');
});


// SK3: Di chuột vào Hộp
myBox.addEventListener('mouseenter', function() {
    myBox.style.backgroundColor = '#9b59b6'; // Đổi sang màu tím
    myBox.textContent = "Ơ kìa, chuột vào kìa!";
});


// SK4: Di chuột ra khỏi Hộp
myBox.addEventListener('mouseleave', function() {
    myBox.style.backgroundColor = '#34495e'; // Trở lại màu xám ban đầu
    myBox.textContent = "Chuột ra mất rồi!";
});


// SK5: Gõ bàn phím trên toàn màn hình
window.addEventListener('keydown', function(event) {
    // In ra phím mà bạn vừa ấn trên bàn phím xuống ô Console F12
    console.log("Hành động: Bạn vừa nhấn phím [" + event.key + "]");
});


// MỤC 4: LÀM VIỆC VỚI ĐỐI TƯỢNG FORM

// 4.1 Lấy đối tượng Form và các ô Input
var myForm = document.getElementById('my-form');
var inputUser = document.getElementById('username');
var selectGender = document.getElementById('gender');
var errorUser = document.getElementById('error-user');
var formResult = document.getElementById('form-result');

// 4.2 Lắng nghe sự kiện "submit" của Form
myForm.addEventListener('submit', function(event) {
    
    // Hàm chặn không cho form load lại trang (F5)
    event.preventDefault(); 
    
    // 4.3 Lấy giá trị (Value) của các ô nhập liệu bằng thuộc tính .value
    var tenNguoiDung = inputUser.value.trim();   // .trim() để xóa khoảng trắng thừa
    var gioitinh = selectGender.value;
    
    console.log("--- Dữ liệu Form thu được ---");
    console.log("Username:", tenNguoiDung);
    console.log("Giới tính:", gioitinh);
    
    // 4.4 Validate cơ bản theo yêu cầu trong sách
    if (tenNguoiDung === "") {
        // Nếu trống thì hiện thông báo lỗi
        errorUser.style.display = "block";
        inputUser.style.borderColor = "red";
        formResult.textContent = "";
    } else {
        // Nếu hợp lệ thì ẩn lỗi và hiển thị kết quả thành công lên màn hình
        errorUser.style.display = "none";
        inputUser.style.borderColor = "#ccc";
        
        formResult.innerHTML = `🎉 Đăng ký thành công!<br>Xin chào: ${tenNguoiDung} (${gioitinh})`;
    }
});