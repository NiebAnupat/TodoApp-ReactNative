exports.getSignUpErrMsg = (errCode) => {
	switch (errCode) {
		case 'auth/email-already-in-use':
			return 'อีเมลล์นี้มีผู้ใช้งานแล้ว';
		case 'auth/invalid-email':
			return 'อีเมลล์ไม่ถูกต้อง';
		case 'auth/operation-not-allowed':
			return 'ไม่สามารถสมัครสมาชิกได้';
		case 'auth/weak-password':
			return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
		case 'auth/invalid-credential':
			return 'ข้อมูลไม่ถูกต้อง';
		case 'auth/invalid-verification-code':
			return 'รหัสยืนยันไม่ถูกต้อง';
		case 'auth/invalid-verification-id':
			return 'รหัสยืนยันไม่ถูกต้อง';
		case 'auth/missing-verification-code':
			return 'รหัสยืนยันไม่ถูกต้อง';
		case 'auth/missing-verification-id':
			return 'รหัสยืนยันไม่ถูกต้อง';
		case 'auth/phone-number-already-exists':
			return 'เบอร์โทรศัพท์นี้มีผู้ใช้งานแล้ว';
		case 'auth/invalid-phone-number':
			return 'เบอร์โทรศัพท์ไม่ถูกต้อง';
		case 'auth/quota-exceeded':
			return 'เกินจำนวนครั้งที่กำหนด';
		case 'auth/captcha-check-failed':
			return 'ยืนยันตัวตนไม่ผ่าน';
		case 'auth/credential-already-in-use':
			return 'ข้อมูลนี้มีผู้ใช้งานแล้ว';
		case 'auth/invalid-credential':
			return 'ข้อมูลไม่ถูกต้อง';
		case 'password not match':
			return 'รหัสผ่านไม่ตรงกัน';
		case 'All field is required':
			return 'กรุณากรอกข้อมูลให้ครบ';
		default:
			return 'ไม่สามารถสมัครสมาชิกได้';
	}
};
