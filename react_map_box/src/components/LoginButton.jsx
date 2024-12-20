import React, { useEffect } from "react";

const LoginButton = () => {
    useEffect(() => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("82b7b63771f3a941992c275525c649df"); 
        console.log("Kakao SDK initialized");
      }
    }, []);

    const handleLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: "http://localhost:5173/login",
        });
    };

//   const handleLogin = () => {
//     if (window.Kakao && window.Kakao.Auth) {
//       window.Kakao.Auth.login({
//         success: (authObj) => {
//           console.log("카카오 로그인 성공:", authObj);
//           alert("카카오 로그인에 성공했습니다!");
//         },
//         fail: (err) => {
//           console.error("카카오 로그인 실패:", err);
//           alert("카카오 로그인에 실패했습니다.");
//         },
//       });
//     }
//   };

  return (
    <button
      onClick={handleLogin}
      style={{
        backgroundColor: "#FEE500",
        border: "none",
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      카카오로 로그인
    </button>
  );
};

export default LoginButton;
