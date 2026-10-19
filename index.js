
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
  if (!bookings || bookings.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }

  let totalRevenue = 0;

  bookings.forEach((element, index) => {
    totalRevenue += element.totalAmount;

    console.log(
      `${index + 1}. ${element.bookingCode} - ${element.customerName} - ${element.movieTitle}
      SL: ${element.ticketCount} | Giá: ${element.pricePerTicket} | Tổng TT: ${element.totalAmount}`
    );
  });

  console.log(`Tổng số đơn đặt vé: ${bookings.length}`);
  console.log(`Doanh thu: ${totalRevenue}`);
}

// 2. Chuẩn hóa tên
function formatName(name) {
  if (!name) {
    return "";
  }

  let words = name.trim().split(/\s+/);

  let capitalizeWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizeWords.join(" ");
}

// 3. Tìm vị trí đơn đặt vé theo mã
function findBookingIndex(bookingCode) {
  if (!bookingCode) {
    return -1;
  }

  let targetBookingCode = bookingCode.trim().toUpperCase();

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode === targetBookingCode) {
      return i;
    }
  }

  return -1;
}

// 4. Kiểm tra mã đặt vé
function validateBookingCode(bookingCode) {
  if (bookingCode === null) {
    return "Hủy thao tác";
  }

  let upperCode = bookingCode.trim().toUpperCase();

  if (upperCode === "") {
    return "Lỗi: Chưa nhập mã đặt vé";
  }

  if (!upperCode.startsWith("CIN-") || upperCode.length !== 7) {
    return "Lỗi: Mã phải có dạng CIN-001";
  }

  let codeNumber = upperCode.slice(4);

  if (
    isNaN(Number(codeNumber)) ||
    !Number.isInteger(Number(codeNumber)) ||
    Number(codeNumber) <= 0
  ) {
    return "Lỗi: Ba ký tự sau CIN- phải là số";
  }

  if (findBookingIndex(upperCode) !== -1) {
    return "Lỗi: Mã đã tồn tại";
  }

  return "";
}

// 5. Thêm đơn đặt vé mới
function handleCreateBooking() {
  let bookingCode = prompt("Nhập mã đặt vé:");

  if (bookingCode === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  bookingCode = bookingCode.trim().toUpperCase();

  let error = validateBookingCode(bookingCode);

  if (error !== "") {
    console.log(error);
    return;
  }

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

  let ticketCount = prompt("Nhập số vé:");

  if (ticketCount === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  ticketCount = ticketCount.trim();

  if (
    ticketCount === "" ||
    isNaN(Number(ticketCount)) ||
    Number(ticketCount) <= 0 ||
    !Number.isInteger(Number(ticketCount))
  ) {
    console.log("Số vé phải là số nguyên lớn hơn 0");
    return;
  }

  ticketCount = Number(ticketCount);

  let pricePerTicket = prompt("Nhập giá mỗi vé:");

  if (pricePerTicket === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  pricePerTicket = pricePerTicket.trim();

  if (
    pricePerTicket === "" ||
    isNaN(Number(pricePerTicket)) ||
    Number(pricePerTicket) <= 0 ||
    !Number.isInteger(Number(pricePerTicket))
  ) {
    console.log("Giá vé phải là số nguyên lớn hơn 0");
    return;
  }

  pricePerTicket = Number(pricePerTicket);

  let baseCost = ticketCount * pricePerTicket;
  let discount = ticketCount >= 4 ? Math.round(baseCost * 0.1) : 0;
  let serviceFee = Math.round((baseCost - discount) * 0.08);
  let totalAmount = baseCost - discount + serviceFee;

  let newBooking = {
    bookingCode: bookingCode,
    customerName: customerName,
    movieTitle: movieTitle,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: totalAmount,
  };

  bookings.push(newBooking);

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

// 6. Cập nhật đơn đặt vé
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
    isNaN(Number(ticketCount)) ||
    Number(ticketCount) <= 0 ||
    !Number.isInteger(Number(ticketCount))
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
    isNaN(Number(pricePerTicket)) ||
    Number(pricePerTicket) <= 0 ||
    !Number.isInteger(Number(pricePerTicket))
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
  console.log("Chi phí cơ sở:", baseCost);
  console.log("Giảm giá:", discount);
  console.log("Phí dịch vụ:", serviceFee);
  console.log("Tổng thanh toán:", totalAmount);
}

// 7. Xóa đơn đặt vé
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

// 8. Tìm kiếm đơn đặt vé theo tên phim
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

// 9. Hàm chạy chương trình
function main() {
  let choice;

  do {
    let input = prompt(`
===================================
HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
===================================
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm đơn đặt vé theo tên phim
0. Thoát chương trình
===================================
Vui lòng nhập lựa chọn của bạn (0 - 5):
    `);

    if (input === null) {
      alert("Thoát chương trình");
      break;
    }

    if (input.trim() === "") {
      alert("Vui lòng nhập lựa chọn");
      continue;
    }

    choice = Number(input);

    switch (choice) {
      case 1:
        displayBookings(bookings);
        break;

      case 2:
        handleCreateBooking();
        break;

      case 3:
        handleUpdateBooking();
        break;

      case 4:
        handleDeleteBooking();
        break;

      case 5:
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
