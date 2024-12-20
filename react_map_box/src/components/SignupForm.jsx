import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 데이터:", formData);
    alert("회원가입이 완료되었습니다!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        name="username"
        placeholder="이름"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="phonenumber"
        name="phonenumber"
        placeholder="핸드폰번호"
        value={formData.phonenumber}
        onChange={handleChange}
        requiredg
      />
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" style={{ padding: "10px", background: "#4CAF50", color: "white", border: "none" }}>
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
