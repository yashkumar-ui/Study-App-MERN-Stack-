const resetPasswordTemplate = (url) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
                text-decoration: underline;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://yash-studyapp.vercel.app/"><img class="logo"
					src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
			<div class="message">Reset Password Link </div>
			<div class="body">
				<p>Dear User,</p>
				<p>For change the password .please click on the following Link
					(One-Time Reset Password Link) for reset the password of your account:</p>
                <a href = ${url} >
                   <h2 class = "highlight" >Click Here 👈 </h2>
                </a>
				<p>This Link is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once you complete the reset password , you will use new password to access our platform and its features.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:yashiosdev2@gmail.com">yashiosdev2@gmail.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = resetPasswordTemplate;