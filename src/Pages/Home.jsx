import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CORRECT_PIN = import.meta.env.VITE_ADMIN_PIN;

const HomePage = () => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [showPin, setShowPin] = useState(false); // quản lý modal PIN
  const inputsRef = useRef([]);
  const nav = useNavigate();

  // Xử lý thay đổi PIN
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < pin.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const pinCode = pin.join("");

    if (pinCode === CORRECT_PIN) {
      nav("/admin/dashboard", { replace: true });
    } else {
      setError("Sai mã PIN");
      setPin(["", "", "", "", "", ""]);
      inputsRef.current[0].focus();
    }
  };

  // Chọn role
  const handleRoleClick = (role) => {
    if (role === "POS") {
      nav("/pos");
    } else if (role === "ADMIN") {
      setShowPin(true);
    }
  };

  return (
    <div className="home">
      <div className="home-container">
        {!showPin ? (
          <div className="role-selection">
            <h1 className="title">Chào mừng đến Tiệm Tạp Hoá</h1>
            <p>Vui lòng chọn chế độ làm việc:</p>

            <div className="roles">
              <div className="role-card pos" onClick={() => handleRoleClick("POS")}>
                <h2>🛒 POS</h2>
                <p>Bán hàng, quét mã, tạo hóa đơn</p>
              </div>

              <div className="role-card admin" onClick={() => handleRoleClick("ADMIN")}>
                <h2>🔐 Admin</h2>
                <p>Quản lý sản phẩm, kho, doanh thu</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="home-box">
            <h1 className="title">Nhập mã PIN</h1>

            <form onSubmit={handlePinSubmit}>
              <div className="pin-inputs">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="pin-box"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {error && <p className="error-text">{error}</p>}

              <button
                className="btn-login cursor"
                type="submit"
                disabled={pin.some((d) => d === "")}
              >
                Vào hệ thống
              </button>

              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowPin(false)}
              >
                Huỷ
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
