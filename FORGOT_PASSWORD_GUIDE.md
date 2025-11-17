# Forgot Password Feature - Complete Guide

## 🎯 Overview

The forgot password feature allows users to reset their password using a 6-digit verification code sent to their email via Supabase.

---

## 📋 How It Works

### User Flow:
1. **Forgot Password Screen** → User enters their email
2. **Supabase sends 6-digit OTP** → Code sent to user's email
3. **Verify Code Screen** → User enters the 6-digit code
4. **Reset Password Screen** → User sets a new password
5. **Login Screen** → User logs in with new password

---

## 🔧 Implementation Details

### Files Created:

1. **screens/Auth/ForgotPasswordScreen.js**
   - User enters their email address
   - Validates email format
   - Sends OTP code via Supabase
   - Navigates to verification screen

2. **screens/Auth/VerifyCodeScreen.js**
   - 6 input fields for the 6-digit code
   - Auto-focus next input on digit entry
   - 60-second countdown timer
   - Resend code functionality
   - Verifies OTP with Supabase

3. **screens/Auth/ResetPasswordScreen.js**
   - User enters new password
   - Confirms password match
   - Updates password in Supabase
   - Redirects to login screen

### Files Modified:

1. **screens/Auth/LoginScreen.js**
   - Added onPress handler to "Forgot Password" button
   - Links to ForgotPasswordScreen

2. **navigation/ManualNavigator.js**
   - Added imports for new screens
   - Added screenParams state for passing data between screens
   - Updated navigateTo function to accept params
   - Added rendering logic for new screens
   - Updated navbar visibility logic

---

## 🚀 How to Use

### For Users:

1. **On Login Screen:**
   - Click "نسيت كلمة المرور؟" (Forgot Password?)

2. **Enter Email:**
   - Type your registered email address
   - Click "إرسال رمز التحقق" (Send Verification Code)

3. **Check Your Email:**
   - Open your email inbox
   - Find the email from Supabase
   - Copy the 6-digit code

4. **Enter Verification Code:**
   - Type the 6-digit code in the input fields
   - Code auto-advances to next field
   - Click "تحقق من الرمز" (Verify Code)

5. **Set New Password:**
   - Enter your new password (min 8 characters)
   - Confirm the password
   - Click "تغيير كلمة المرور" (Change Password)

6. **Login:**
   - Use your new password to log in

---

## ⚙️ Supabase Configuration

### Email Templates (Optional Customization):

1. Go to Supabase Dashboard
2. Navigate to **Authentication** → **Email Templates**
3. Select **Reset Password** template
4. Customize the Arabic template:

```html
<h2>إعادة تعيين كلمة المرور</h2>
<p>لقد طلبت إعادة تعيين كلمة المرور الخاصة بك.</p>
<p>رمز التحقق الخاص بك هو:</p>
<h1>{{ .Token }}</h1>
<p>هذا الرمز صالح لمدة 60 دقيقة.</p>
<p>إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني.</p>
```

### Email Settings:

1. Go to **Authentication** → **Settings**
2. Under **Email Auth**:
   - ✅ Enable email confirmations (for production)
   - ⚙️ Set OTP expiry time (default: 60 minutes)
   - ⚙️ Configure email rate limits

---

## 🎨 Features

### ForgotPasswordScreen:
- ✅ Email validation
- ✅ Loading state during API call
- ✅ Error handling with Arabic messages
- ✅ Info box explaining the process
- ✅ Back button to login screen

### VerifyCodeScreen:
- ✅ 6 separate input fields for code
- ✅ Auto-focus next field on input
- ✅ Backspace navigation between fields
- ✅ 60-second countdown timer
- ✅ Resend code functionality
- ✅ Visual feedback (green border on filled inputs)
- ✅ OTP verification with Supabase

### ResetPasswordScreen:
- ✅ Password validation (min 8 characters)
- ✅ Password confirmation matching
- ✅ Secure password input
- ✅ Loading state during update
- ✅ Success message and redirect to login

---

## 🔒 Security Features

1. **OTP Expiry:**
   - Codes expire after 60 minutes (configurable in Supabase)
   - Users must request a new code if expired

2. **Rate Limiting:**
   - Supabase automatically rate limits password reset requests
   - Prevents spam and abuse

3. **Email Verification:**
   - Only registered email addresses can receive codes
   - Unregistered emails get appropriate error message

4. **Secure Password Update:**
   - Password must meet minimum requirements
   - New password cannot be same as old password
   - Password is hashed before storage

---

## 🧪 Testing the Feature

### Test Case 1: Successful Password Reset

1. Go to Login Screen
2. Click "نسيت كلمة المرور؟"
3. Enter a registered email
4. Check email for 6-digit code
5. Enter the code
6. Set a new password
7. Login with new password

**Expected Result:** ✅ Password reset successful, can login with new password

### Test Case 2: Invalid Email

1. Go to Forgot Password Screen
2. Enter an unregistered email
3. Click send code

**Expected Result:** ❌ Error message "البريد الإلكتروني غير مسجل"

### Test Case 3: Wrong Verification Code

1. Request password reset
2. Enter incorrect 6-digit code
3. Click verify

**Expected Result:** ❌ Error message "رمز التحقق غير صحيح"

### Test Case 4: Expired Code

1. Request password reset
2. Wait for code to expire (60 minutes)
3. Try to use the code

**Expected Result:** ❌ Error message about expired code, option to resend

### Test Case 5: Resend Code

1. Request password reset
2. Wait for 60-second timer to finish
3. Click "إعادة إرسال الرمز"

**Expected Result:** ✅ New code sent, timer resets to 60 seconds

---

## 🐛 Troubleshooting

### Problem: Email not received

**Solutions:**
1. Check spam/junk folder
2. Verify email address is correct
3. Check Supabase email settings
4. Verify SMTP configuration in Supabase

### Problem: Code not working

**Solutions:**
1. Ensure code is entered correctly (6 digits)
2. Check if code has expired
3. Request a new code
4. Verify Supabase OTP settings

### Problem: Password update fails

**Solutions:**
1. Ensure password meets requirements (min 8 characters)
2. Verify passwords match
3. Check Supabase connection
4. Review browser console for errors

---

## 📱 UI/UX Features

### Arabic RTL Support:
- ✅ All text in Arabic
- ✅ Right-to-left layout
- ✅ Arabic error messages
- ✅ Arabic success messages

### Visual Design:
- ✅ Consistent green gradient theme
- ✅ Icon-based visual hierarchy
- ✅ Clear call-to-action buttons
- ✅ Loading states for all actions
- ✅ Info boxes for user guidance

### User Experience:
- ✅ Auto-focus on first input
- ✅ Auto-advance between code inputs
- ✅ Countdown timer for resend
- ✅ Clear error messages
- ✅ Success confirmations
- ✅ Easy navigation between screens

---

## 🔄 Flow Diagram

```
Login Screen
    ↓ (Click "نسيت كلمة المرور؟")
Forgot Password Screen
    ↓ (Enter email → Send code)
Verify Code Screen
    ↓ (Enter 6-digit code → Verify)
Reset Password Screen
    ↓ (Enter new password → Update)
Login Screen
    ↓ (Login with new password)
Home Screen
```

---

## 📝 Code Examples

### Navigating to Forgot Password:
```javascript
navigateTo('forgotPassword')
```

### Passing Email to Verify Screen:
```javascript
navigateTo('verifyCode', { email: 'user@example.com' })
```

### Sending OTP Code:
```javascript
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://your-app-url.com/reset-password',
});
```

### Verifying OTP:
```javascript
const { data, error } = await supabase.auth.verifyOtp({
  email: email,
  token: verificationCode,
  type: 'recovery',
});
```

### Updating Password:
```javascript
const { error } = await supabase.auth.updateUser({
  password: newPassword,
});
```

---

## ✅ Checklist

Before deploying:
- [ ] Test complete flow with real email
- [ ] Verify email templates in Supabase
- [ ] Test error scenarios
- [ ] Test on different devices
- [ ] Verify Arabic text displays correctly
- [ ] Test resend code functionality
- [ ] Verify password requirements
- [ ] Test expired code scenario
- [ ] Check loading states work
- [ ] Verify navigation flow

---

## 🎉 Summary

The forgot password feature is now fully implemented with:
- ✅ Email-based password reset
- ✅ 6-digit OTP verification
- ✅ Secure password update
- ✅ Complete Arabic UI
- ✅ Error handling
- ✅ User-friendly flow
- ✅ Supabase integration

Users can now easily reset their passwords if forgotten!
