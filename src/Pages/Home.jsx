import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [pin, setPin] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const inputsRef = useRef([]);
    const nav = useNavigate();

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < 6) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const pinCode = pin.join("");

        if (pinCode === "121204") {
            nav("/admin/dashboard", { replace: true });
        } else {
            setError("Sai mã PIN");
            setPin(["", "", "", "", "", ""]);
            inputsRef.current[0].focus();
        }
    };

    return (
        <div className="home">
            <div className="home-container">
                <div className="home-box">
                    <h1 className="title">Nhập mã PIN</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="pin-inputs">
                            {pin.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    type="password"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) =>
                                        handleChange(e.target.value, index)
                                    }
                                    onKeyDown={(e) =>
                                        handleKeyDown(e, index)
                                    }
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
