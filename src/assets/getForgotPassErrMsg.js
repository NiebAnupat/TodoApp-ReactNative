exports.getForgotPassErrMsg = (errorCode) => {
	switch (errorCode) {
		case 'Email is required':
			return 'กรุณากรอกอีเมลล์';
		case 'auth/user-not-found':
			return 'ไม่พบผู้ใช้งาน';
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
		case 'auth/too-many-requests':
			return 'คุณทำรายการเกินจำนวนที่กำหนด';
		case 'auth/operation-not-allowed':
			return 'ไม่อนุญาตให้ทำรายการนี้';
		case 'auth/invalid-action-code':
			return 'รหัสไม่ถูกต้อง';
		case 'auth/expired-action-code':
			return 'รหัสหมดอายุ';
		case 'auth/invalid-continue-uri':
			return 'URL ไม่ถูกต้อง';
		case 'auth/invalid-email-verified':
			return 'อีเมลล์ไม่ถูกต้อง';
		case 'auth/invalid-oob-code':
			return 'รหัสไม่ถูกต้อง';
		case 'auth/invalid-password':
			return 'รหัสผ่านไม่ถูกต้อง';
		case 'auth/invalid-provider-id':
			return 'รหัสผู้ให้บริการไม่ถูกต้อง';
		case 'auth/invalid-session-cookie-duration':
			return 'ระยะเวลาไม่ถูกต้อง';
		case 'auth/missing-android-pkg-name':
			return 'ไม่พบชื่อแพคเกจ';
		case 'auth/missing-continue-uri':
			return 'ไม่พบ URL';
		case 'auth/missing-ios-bundle-id':
			return 'ไม่พบชื่อแพคเกจ';
		case 'auth/missing-oob-code':
			return 'ไม่พบรหัส';
		case 'auth/missing-continue-uri':
			return 'ไม่พบ URL';
		case 'auth/missing-continue-uri':
			return 'ไม่พบ URL';

		default:
			return 'เกิดข้อผิดพลาด';
	}
};
