exports.getErrAuthMsg = errorCode => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'ไม่พบผู้ใช้งาน';
    case 'auth/wrong-password':
      return 'รหัสผ่านไม่ถูกต้อง';
    case 'auth/invalid-email':
      return 'อีเมลล์ไม่ถูกต้อง';
    case 'auth/user-disabled':
      return 'ผู้ใช้งานถูกระงับ';
    case 'auth/user-token-expired':
      return 'หมดเวลาใช้งาน';
    case 'auth/user-token-invalid':
      return 'หมดเวลาใช้งาน';
    case 'auth/user-token-not-initialized':
      return 'หมดเวลาใช้งาน';
    case 'auth/user-token-revoked':
      return 'หมดเวลาใช้งาน';
    default:
      return 'ไม่สามารถเข้าสู่ระบบได้';
  }
};
