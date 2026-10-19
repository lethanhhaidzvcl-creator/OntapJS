// Dữ liệu ban đầu
let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400,
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920,
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520,
  },
];

// 1. Hiển thị danh sách đơn đặt vé
function displayBookings(bookings) {
  // Kiểm tra nếu danh sách trống
  if (!bookings || bookings.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }

  let totalRevenue = 0;
  // Logic để xử lý khi mảng có phần tử
  bookings.forEach((element, index) => {
    // Cộng dồn giá tiền
    totalRevenue += element.totalAmount;

    console.log(
      `${index + 1}. ${element.bookingCode} - ${element.customerName} - ${element.movieTitle}
        SL: ${element.ticketCount}| Giá: ${element.pricePerTicket} | Tổng TT: ${element.totalAmount}
      `,
    );
  });

  // Tính tổng số lượng vé và doanh thu
  console.log(
    `Tổng vé: ${bookings.length} đơn đặt vé - Doanh thu: ${totalRevenue}`,
  );
}

// Hàm format tên
function formatName(name) {
  if (!name) {
    return "";
  }

  //   Loại bỏ khoảng trắng ở đầu và cuối
  let trimed = name.trim();

  //  Biến đổi chuỗi thành mảng và truy cập vào từng phần tử trong mảng và biến đổi ký tự đầu thành in hoa
  let words = trimed.split(" ");

  //   Dùng map() để biến đổi
  let capitalizeWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  //   Biến đổi mảng thành chuỗi
  return capitalizeWords.join(" ");
}

// Kiểm tra xem mã đã tồn tại chưa
function findBookingIndex(bookingCode) {
  if (!bookingCode) {
    return -1;
  }

  //   Biến đổi mã thành in hoa
  let targetBookingCode = bookingCode.trim().toUpperCase();

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode === targetBookingCode) {
      return i;
    }
  }

  return -1;
}

// Hàm kiểm tra mã đặt đặt vé
function validateBookingCode(bookingCode) {
  if (bookingCode === null) {
    return "Hủy thao tác";
  }

  if (bookingCode === "") {
    return "Lỗi: chưa nhập mã đặt vé";
  }

  //   Biến đổi mã thành in hoa
  let upperCode = bookingCode.trim().toUpperCase();

  if (upperCode.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }

  if (!upperCode.startsWith("CIN-")) {
    return "Lỗi: Mã không hợp lệ";
  }

  if (findBookingIndex(upperCode) !== -1) {
    return "Lỗi: Mã đã tồn tại";
  }

  return "";
}

// 2. Thêm đơn đặt vé mới
function handleCreateBooking() {
  //  Validate dữ liệu đầu vào
  let bookingCode = prompt("Nhập mã đặt vé:");

  // Bấm Cancel thì hủy thao tác
  if (bookingCode === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  // Chuẩn hóa mã đặt vé
  bookingCode = bookingCode.trim().toUpperCase();

  // Kiểm tra mã đặt vé
  let error = validateBookingCode(bookingCode);

  if (error !== "") {
    console.log(error);
    return;
  }

  // Nhập tên khách hàng
  let customerName = prompt("Nhập tên khách hàng:");

  if (customerName === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  customerName = formatName(customerName);

  if (customerName === "") {
    console.log("Tên khách hàng không được để trống");
    return;
  }

  // Nhập tên phim
  let movieTitle = prompt("Nhập tên phim:");

  if (movieTitle === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  movieTitle = formatName(movieTitle);

  if (movieTitle === "") {
    console.log("Tên phim không được để trống");
    return;
  }

  // Nhập số vé
  let ticketCount = prompt("Nhập số vé:");

  if (ticketCount === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  ticketCount = ticketCount.trim();

  if (ticketCount === "" || !/^\d+$/.test(ticketCount) || Number(ticketCount) <= 0) {
    console.log("Số vé phải là số nguyên lớn hơn 0");
    return;
  }

  ticketCount = Number(ticketCount);

  // Nhập giá mỗi vé
  let pricePerTicket = prompt("Nhập giá mỗi vé:");

  if (pricePerTicket === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  pricePerTicket = pricePerTicket.trim();

  if (
    pricePerTicket === "" ||
    !/^\d+$/.test(pricePerTicket) ||
    Number(pricePerTicket) <= 0
  ) {
    console.log("Giá vé phải là số nguyên lớn hơn 0");
    return;
  }

  pricePerTicket = Number(pricePerTicket);

  // Tính tiền
  let baseCost = ticketCount * pricePerTicket;
  let discount = ticketCount >= 4 ? Math.round(baseCost * 0.1) : 0;
  let serviceFee = Math.round((baseCost - discount) * 0.08);
  let totalAmount = baseCost - discount + serviceFee;

  // Tạo đơn đặt vé mới
  let newBooking = {
    bookingCode: bookingCode,
    customerName: customerName,
    movieTitle: movieTitle,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: totalAmount,
  };

  // Thêm đơn vào cuối mảng
  bookings.push(newBooking);

  // In hóa đơn
  console.log("Thêm đơn đặt vé thành công");
  console.log("Mã đặt vé:", bookingCode);
  console.log("Tên khách hàng:", customerName);
  console.log("Tên phim:", movieTitle);
  console.log("Số vé:", ticketCount);
  console.log("Giá mỗi vé:", pricePerTicket);
  console.log("Chi phí cơ sở:", baseCost);
  console.log("Giảm giá:", discount);
  console.log("Phí dịch vụ:", serviceFee);
  console.log("Tổng thanh toán:", totalAmount);
}
// 3. Cập nhật đơn đặt vé
function handleUpdateBooking() {
  let bookingCode = prompt("Nhập mã đặt vé cần cập nhật:");

  if (bookingCode === null) {
    console.log("Đã hủy thao tác cập nhật");
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();

  let index = findBookingIndex(bookingCode);

  if (index === -1) {
    console.log("Không tìm thấy đơn đặt vé");
    return;
  }

  let customerName = prompt("Nhập tên khách hàng mới:");

  if (customerName === null) {
    console.log("Đã hủy thao tác cập nhật");
    return;
  }

    customerName = formatName(customerName);

  if (customerName === "") {
    console.log("Tên khách hàng không được để trống");
    return;
  }

  let movieTitle = prompt("Nhập tên phim mới:");

  if (movieTitle === null) {
    console.log("Đã hủy thao tác cập nhật");
    return;
  }

  movieTitle = formatName(movieTitle);

  if (movieTitle === "") {
    console.log("Tên phim không được để trống");
    return;
  }

  let ticketCount = prompt("Nhập số vé mới:");

  if (ticketCount === null) {
    console.log("Đã hủy thao tác cập nhật");
    return;
  }

  ticketCount = ticketCount.trim();

  if (
    ticketCount === "" ||
    !/^\d+$/.test(ticketCount) ||
    Number(ticketCount) <= 0
  ) {
    console.log("Số vé phải là số nguyên lớn hơn 0");
    return;
  }

  ticketCount = Number(ticketCount);

  let pricePerTicket = prompt("Nhập giá mỗi vé mới:");

  if (pricePerTicket === null) {
    console.log("Đã hủy thao tác cập nhật");
    return;
  }

  pricePerTicket = pricePerTicket.trim();

  if (
    pricePerTicket === "" ||
    !/^\d+$/.test(pricePerTicket) ||
    Number(pricePerTicket) <= 0
  ) {
    console.log("Giá vé phải là số nguyên lớn hơn 0");
    return;
  }

  pricePerTicket = Number(pricePerTicket);

  let baseCost = ticketCount * pricePerTicket;
  let discount = ticketCount >= 4 ? Math.round(baseCost * 0.1) : 0;
  let serviceFee = Math.round((baseCost - discount) * 0.08);
  let totalAmount = baseCost - discount + serviceFee;

  bookings[index].customerName = customerName;
  bookings[index].movieTitle = movieTitle;
  bookings[index].ticketCount = ticketCount;
  bookings[index].pricePerTicket = pricePerTicket;
  bookings[index].totalAmount = totalAmount;

  console.log("Cập nhật đơn đặt vé thành công");
  console.log("Mã đặt vé:", bookings[index].bookingCode);
  console.log("Tên khách hàng:", customerName);
  console.log("Tên phim:", movieTitle);
  console.log("Số vé:", ticketCount);
  console.log("Giá mỗi vé:", pricePerTicket);
  console.log("Tổng thanh toán:", totalAmount);
}

// 4. Xóa đơn đặt vé
function handleDeleteBooking() {
  let bookingCode = prompt("Nhập mã đặt vé cần xóa:");

  if (bookingCode === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();

  let index = findBookingIndex(bookingCode);

  if (index === -1) {
    console.log(`Không tìm thấy đơn đặt vé có mã ${bookingCode}`);
    return;
  }

  let confirmDelete = prompt("Bạn có chắc chắn muốn xóa đơn này? (Y/N)");

  if (
    confirmDelete === null ||
    confirmDelete.trim().toUpperCase() !== "Y"
  ) {
    console.log("Đã hủy thao tác xóa");
    console.log("Số đơn hiện tại:", bookings.length);
    return;
  }

  bookings.splice(index, 1);

  console.log("Xóa đơn đặt vé thành công");
  console.log("Số đơn còn lại:", bookings.length);
}

// 5. Tìm kiếm đơn đặt vé theo tên phim
function handleSearchBooking() {
  let movieTitle = prompt("Nhập tên phim cần tìm:");

  if (movieTitle === null) {
    console.log("Đã hủy thao tác tìm kiếm");
    return;
  }

  movieTitle = movieTitle.trim().toLowerCase();

  if (movieTitle === "") {
    console.log("Tên phim không được để trống");
    return;
  }

  let result = bookings.filter((element) =>
    element.movieTitle.toLowerCase().includes(movieTitle)
  );

  if (result.length === 0) {
    console.log("Không tìm thấy đơn đặt vé phù hợp");
    return;
  }

  console.log("Danh sách đơn đặt vé tìm thấy:");

  displayBookings(result);
}

// Hàm chạy chương trình
function main() {
  let choice;
  do {
    //  Dấu + sẽ có tác dụng ép kiểu dữ liệu thành number
    choice = +prompt(`
        ===================================
        HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
        ===================================
        1. Hiển thị danh sách đơn đặt vé
        2. Thêm đơn đặt vé mới
        3. Cập nhật đơn đặt vé
        4. Xóa đơn đặt vé
        5. Tìm kiếm đơn đặt vé theo tên phim
        0. Thoát chương trình
        ====================================
        Vui lòng nhập lựa chọn của bạn (0 - 5):
    `);

    switch (choice) {
      case 1:
        // 1. Hiển thị danh sách đơn đặt vé
        displayBookings(bookings);

        break;
      case 2:
        // 2. Thêm đơn đặt vé mới
        handleCreateBooking();

        break;
      case 3:
        // 3. Cập nhật đơn đặt vé"
        handleUpdateBooking();

        break;
      case 4:
        // 4. Xóa đơn đặt vé
        handleDeleteBooking();

        break;
      case 5:
        // 5. Tìm kiếm đơn đặt vé theo tên phim"
        handleSearchBooking();

        break;
      case 0:
        alert("Thoát chương trình");
        break;

      default:
        alert("Lựa chọn không hợp lệ. Vui lòng thử lại.");
        break;
    }
  } while (choice !== 0);
}

main();